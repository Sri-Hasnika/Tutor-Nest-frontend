"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';

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
  const [showAcceptPopup, setShowAcceptPopup] = useState<boolean>(false);
  const [showSessionPlanPopup, setShowSessionPlanPopup] = useState<boolean>(false);
  const [selectedTutee, setSelectedTutee] = useState<string | null>(null);
  const [sessionPlan, setSessionPlan] = useState<any | null>(null);
  const [loadingSessionPlan, setLoadingSessionPlan] = useState<boolean>(false);
  const [sessionPlanError, setSessionPlanError] = useState<string | null>(null);

  useEffect(() => {
    const tId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    setTutorId(tId);
  }, []);

  useEffect(() => {
    if(!tutorId) return;
    const fetchDemoClasses = async () => {
      try {
        const response = await fetch(`https://tutor-nest-backend.onrender.com/tutor-api/demo-class/${tutorId}`);
        const data = await response.json();
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
        `https://tutor-nest-backend.onrender.com/tutor-api/demo-class/${classItem.tutorId}/${classItem._id}`,
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

  const handleJoinClick = (tuteeId: string) => {
    setSelectedTutee(tuteeId);
    setShowAcceptPopup(true);
  };

  const handleAcceptCancel = () => {
    setShowAcceptPopup(false);
    setSelectedTutee(null);
  };

  const handleAssignTutee = async () => {
    if (!selectedTutee || !tutorId) return;
    try {
      await axios.put(`https://tutor-nest-backend.onrender.com/tutor-api/${tutorId}/tutees/${selectedTutee}`);
      setShowAcceptPopup(false);
      fetchSessionPlan(selectedTutee);
    } catch (err) {
      alert("Failed to assign tutee.");
    }
  };

  const fetchSessionPlan = async (tuteeId: string) => {
    setLoadingSessionPlan(true);
    setSessionPlanError(null);
    try {
      const response = await fetch(`https://tutor-nest-backend.onrender.com/sessionPlan-api?tutorId=${tutorId}&tuteeId=${tuteeId}`);
      const data = await response.json();
      if (response.ok) {
        if (data.payload && data.payload.length > 0) {
          setSessionPlan(data.payload[0]);
        } else {
          setSessionPlan(null);
          setSessionPlanError("No session plan found for this tutee.");
        }
      } else {
        setSessionPlanError(data.message || "Failed to fetch session plan.");
      }
      setShowSessionPlanPopup(true);
    } catch (error) {
      setSessionPlanError("Failed to fetch session plan.");
      setShowSessionPlanPopup(true);
    } finally {
      setLoadingSessionPlan(false);
    }
  };

  const handleSessionPlanClose = () => {
    setShowSessionPlanPopup(false);
    setSelectedTutee(null);
    setSessionPlan(null);
    setSessionPlanError(null);
  };

  const isToday = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    return today.toDateString() === date.toDateString();
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <DashboardShell>
      <DashboardHeader heading="Demo Class Notifications" text="Manage your demo class meet links and dates" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {demoClasses.map((demo) => {
          const isMeetUpdated = demo.meetLink && demo.finalDate;
          const isSameDay = isToday(demo.finalDate || "");
          
          return (
            <div key={demo._id} className="bg-white shadow-lg rounded-xl p-5 space-y-3">
              <h2 className="text-xl font-semibold">{demo.tuteeId.firstName} {demo.tuteeId.lastName}</h2>
              <p><strong>Course:</strong> {demo.tuteeId.course}</p>
              <p><strong>Class:</strong> {demo.tuteeId.studying}</p>
              <p><strong>Message:</strong> {demo.message}</p>
              <p><strong>Status:</strong> <span className="capitalize">{demo.status}</span></p>

              {isMeetUpdated && isSameDay && (
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">Today</span>
                  <button
                    onClick={() => handleJoinClick(demo.tuteeId._id)}
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Joined
                  </button>
                  <button className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    Not Joined
                  </button>
                </div>
              )}

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
          );
        })}
      </div>

      {showAcceptPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Accept Tutee</h3>
            <p>Do you want to accept this tutee?</p>
            <div className="flex mt-4 justify-end space-x-4">
              <button
                onClick={handleAcceptCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTutee}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Assign Tutee
              </button>
            </div>
          </div>
        </div>
      )}

      {showSessionPlanPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Session Plan Details</h3>
            {loadingSessionPlan ? (
              <p>Loading session plan...</p>
            ) : sessionPlanError ? (
              <p className="text-red-600">{sessionPlanError}</p>
            ) : sessionPlan ? (
              <div className="space-y-2">
                <p><strong>Topics:</strong> {sessionPlan.topics.join(", ")}</p>
                <p><strong>Schedule:</strong> {sessionPlan.schedule.daysPerWeek} sessions/week</p>
                <ul>
                  {sessionPlan.schedule.timings.map((time: string, index: number) => (
                    <li key={index}>{time}</li>
                  ))}
                </ul>
                <p><strong>Duration (weeks):</strong> {sessionPlan.durationWeeks}</p>
                <p><strong>Additional Notes:</strong> {sessionPlan.additionalNotes || "None"}</p>
                <p><strong>Status:</strong> {sessionPlan.status}</p>
              </div>
            ) : (
              <p>No session plan details available.</p>
            )}
            <div className="flex mt-4 justify-end space-x-4">
              <button
                onClick={handleSessionPlanClose}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default DemoClasses;
