"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tutee {
  _id: string;
  firstName: string;
  lastName: string;
  moblieNumber: number;
  email: string;
  gender: string;
  studying: string;
  course: string;
  pincode: number;
  locality: string;
  city: string;
  state: string;
}

interface DemoClass {
  _id: string;
  tuteeId: Tutee;
  tutorId: string;
  subject: string;
  message: string;
  status: string;
  meetLink: string;
  finalDate?: string;
  createdAt: string;
}

const DemoClasses: React.FC = () => {
  const [demoClasses, setDemoClasses] = useState<DemoClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedLinks, setUpdatedLinks] = useState<{ [key: string]: string }>({});
  const [updatedFinalDates, setUpdatedFinalDates] = useState<{ [key: string]: string }>({});

  const [tutorId, setTutorId] = useState<any>("");

  useEffect(() => {
    const tId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    setTutorId(tId);
  }, []);

  useEffect(() => {
    if(!tutorId) return;
    // fetchTutorId();
    const fetchDemoClasses = async () => {
      try {
        console.log(tutorId)
        const response = await fetch(`http://localhost:8000/tutor-api/demo-class/${tutorId}`);
        const data = await response.json();
        console.log(data);
        setDemoClasses(data.payload);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch demo classes.");
        setLoading(false);
      }
    };

    fetchDemoClasses();
  }, [tutorId]);

  const handleInputChange = (id: string, value: string) => {
    setUpdatedLinks(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (id: string, value: string) => {
    setUpdatedFinalDates(prev => ({ ...prev, [id]: value }));
  };

  const handleUploadLink = async (classItem: DemoClass) => {
    const meetLink = updatedLinks[classItem._id];
    const finalDate = updatedFinalDates[classItem._id];

    if (!meetLink) return alert("Please enter a valid Meet link");
    if (!finalDate) return alert("Please select a valid final date and time");

    try {
      await axios.put(
        `http://localhost:8000/tutor-api/demo-class/${classItem.tutorId}/${classItem._id}`,
        { meetLink, finalDate },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Meet link and final date uploaded successfully");
      setDemoClasses(prev =>
        prev.map(item =>
          item._id === classItem._id ? { ...item, meetLink, finalDate } : item
        )
      );
    } catch (err) {
      alert("Failed to upload Meet link and final date");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {demoClasses.map((demo) => (
        <div key={demo._id} className="bg-white shadow-lg rounded-xl p-5 space-y-3">
          <h2 className="text-xl font-semibold">{demo.tuteeId.firstName} {demo.tuteeId.lastName}</h2>
          <p><strong>Course:</strong> {demo.tuteeId.course}</p>
          <p><strong>Class:</strong> {demo.tuteeId.studying}</p>
          <p><strong>Message:</strong> {demo.message}</p>
          <p><strong>Status:</strong> <span className="capitalize">{demo.status}</span></p>
          <input
            type="text"
            placeholder="Enter Meet Link"
            className="w-full px-3 py-2 border rounded-md"
            value={updatedLinks[demo._id] ?? demo.meetLink ?? ""}
            onChange={(e) => handleInputChange(demo._id, e.target.value)}
          />
          <input
            type="datetime-local"
            className="w-full px-3 py-2 border rounded-md"
            value={updatedFinalDates[demo._id] ?? (demo.finalDate ? demo.finalDate.substring(0, 16) : "")}
            onChange={(e) => handleDateChange(demo._id, e.target.value)}
          />
          <button
            onClick={() => handleUploadLink(demo)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Link & Date
          </button>
        </div>
      ))}
    </div>
  );
};

export default DemoClasses;
