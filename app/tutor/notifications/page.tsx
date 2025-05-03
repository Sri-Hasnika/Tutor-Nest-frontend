"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { Clock, Calendar, Link, User, BookOpen, MessageSquare, Check, X } from 'lucide-react';

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

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Demo Class Notifications" text="Manage your demo class meet links and dates" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 w-36 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardShell>
    );
  }
  
  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Demo Class Notifications" text="Manage your demo class meet links and dates" />
        <div className="p-6 flex justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-500 max-w-md shadow-sm">
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Demo Class Notifications" text="Manage your demo class meet links and dates" />
      
      <div className="p-8">
        {demoClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Demo Classes Yet</h3>
            <p className="text-gray-500 max-w-md">You don't have any scheduled demo classes at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoClasses.map((demo) => {
              const isMeetUpdated = demo.meetLink && demo.finalDate;
              const isSameDay = isToday(demo.finalDate || "");
              
              const getStatusColor = (status: string) => {
                const statusMap: {[key: string]: string} = {
                  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
                  accepted: "bg-green-100 text-green-800 border-green-200",
                  rejected: "bg-red-100 text-red-800 border-red-200",
                  completed: "bg-blue-100 text-blue-800 border-blue-200"
                };
                return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
              };
              
              return (
                <div key={demo._id} className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">{demo.tuteeId.firstName} {demo.tuteeId.lastName}</h2>
                          <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${getStatusColor(demo.status)}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                            <span className="capitalize">{demo.status}</span>
                          </div>
                        </div>
                      </div>
                      {isMeetUpdated && isSameDay && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Today
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs text-gray-500">Course</p>
                          <p className="text-sm font-medium">{demo.tuteeId.course}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs text-gray-500">Class</p>
                          <p className="text-sm font-medium">{demo.tuteeId.studying}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Message</p>
                        <p className="text-sm">{demo.message}</p>
                      </div>
                    </div>

                    {isMeetUpdated && isSameDay && (
                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          onClick={() => handleJoinClick(demo.tuteeId._id)}
                          className="flex-1 bg-black text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-md flex items-center justify-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>Joined</span>
                        </button>
                        <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:shadow-md flex items-center justify-center space-x-1">
                          <X className="w-4 h-4" />
                          <span>Not Joined</span>
                        </button>
                      </div>
                    )}
                    
                    <div className="space-y-3 pt-1">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Link className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Meet Link"
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                          value={updatedLinks[demo._id] ?? demo.meetLink ?? ""}
                          onChange={(e) => handleInputChange(demo._id, e.target.value)}
                        />
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="datetime-local"
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                          value={updatedFinalDates[demo._id] ?? (demo.finalDate ? demo.finalDate.substring(0, 16) : "")}
                          onChange={(e) => handleDateChange(demo._id, e.target.value)}
                        />
                      </div>
                      
                      <button
                        onClick={() => handleUploadLink(demo)}
                        className="w-full bg-black text-white py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transform hover:-translate-y-0.5"
                      >
                        Upload Link & Date
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accept Tutee Modal */}
      {showAcceptPopup && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 opacity-100 animate-modal-in">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Accept Tutee</h3>
            <p className="text-gray-600">Do you want to accept this tutee?</p>
            <div className="flex mt-6 justify-end space-x-4">
              <button
                onClick={handleAcceptCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTutee}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-md"
              >
                Assign Tutee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Plan Modal */}
      {showSessionPlanPopup && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 opacity-100 animate-modal-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Session Plan Details</h3>
              <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            
            {loadingSessionPlan ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : sessionPlanError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                <p>{sessionPlanError}</p>
              </div>
            ) : sessionPlan ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionPlan.topics.map((topic: string, index: number) => (
                      <span key={index} className="bg-gray-200 text-gray-800 px-2.5 py-1 rounded-md text-xs transition-all duration-300 hover:bg-gray-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Schedule</h4>
                  <p className="text-gray-700 mb-2">{sessionPlan.schedule.daysPerWeek} sessions per week</p>
                  <ul className="space-y-1 pl-4 border-l-2 border-gray-200">
                    {sessionPlan.schedule.timings.map((time: string, index: number) => (
                      <li key={index} className="text-gray-600">{time}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Duration</h4>
                    <p className="text-gray-700">{sessionPlan.durationWeeks} weeks</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Status</h4>
                    <p className="capitalize">{sessionPlan.status}</p>
                  </div>
                </div>
                
                {sessionPlan.additionalNotes && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Additional Notes</h4>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{sessionPlan.additionalNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-500">No session plan details available.</p>
              </div>
            )}
            
            <div className="flex mt-6 justify-end">
              <button
                onClick={handleSessionPlanClose}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}</style>
    </DashboardShell>
  );
};

export default DemoClasses;