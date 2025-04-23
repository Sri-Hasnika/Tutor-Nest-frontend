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
  createdAt: string;
}

const DemoClasses: React.FC = () => {
  const [demoClasses, setDemoClasses] = useState<DemoClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedLinks, setUpdatedLinks] = useState<{ [key: string]: string }>({});

  const tutorId = localStorage.getItem("tId");

  useEffect(() => {
    const fetchDemoClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tutor-api/demo-class/${tutorId}`);
        setDemoClasses(response.data.payload);
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

  const handleUploadLink = async (classItem: DemoClass) => {
    const meetLink = updatedLinks[classItem._id];
    if (!meetLink) return alert("Please enter a valid Meet link");

    try {
      await axios.put(
        `http://localhost:8000/tutor-api/demo-class/${classItem.tutorId}/${classItem._id}`,
        { meetLink },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Meet link uploaded successfully");
      setDemoClasses(prev =>
        prev.map(item =>
          item._id === classItem._id ? { ...item, meetLink } : item
        )
      );
    } catch (err) {
      alert("Failed to upload Meet link");
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
          <button
            onClick={() => handleUploadLink(demo)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Link
          </button>
        </div>
      ))}
    </div>
  );
};

export default DemoClasses;
