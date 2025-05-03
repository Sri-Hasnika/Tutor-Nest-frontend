"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { useRouter } from 'next/navigation';
import { Clock, BookOpen, Calendar, FileText, User, AlertCircle } from 'lucide-react';

interface Tutor {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Tutee {
  _id: string;
  firstName: string;
  lastName: string;
  course: string;
  studying: string;
}

interface Schedule {
  daysPerWeek: number;
  timings: string[];
  durationWeeks: number;
  additionalNotes: string;
  [key: string]: any;
}

interface SessionPlan {
  _id: string;
  tutorId: Tutor;
  tuteeId: Tutee;
  course: string;
  studentClass: string;
  topics: string[];
  schedule: Schedule;
  durationWeeks: number;
  additionalNotes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";
  
  if (status.toLowerCase() === "active") {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
  } else if (status.toLowerCase() === "pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-700";
  } else if (status.toLowerCase() === "completed") {
    bgColor = "bg-blue-100";
    textColor = "text-blue-700";
  } else if (status.toLowerCase() === "cancelled") {
    bgColor = "bg-red-100";
    textColor = "text-red-700";
  }
  
  return (
    <span className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {status}
    </span>
  );
};

const SessionPlansPage: React.FC = () => {
  const [sessionPlans, setSessionPlans] = useState<SessionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tutorId, setTutorId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const tId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    setTutorId(tId);
  }, []);

  useEffect(() => {
    if (!tutorId) return;

    const fetchSessionPlans = async () => {
      try {
        const response = await axios.get(`https://tutor-nest-backend.onrender.com/sessionPlan-api?tutorId=${tutorId}`);
        setSessionPlans(response.data.payload);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch session plans.");
        setLoading(false);
      }
    };

    fetchSessionPlans();
  }, [tutorId]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell>
        <div className="p-6 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-500 max-w-md">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Session Plans" text="Manage your session plans with tutees" />
      
      <div className="px-6 pb-4 flex justify-end">
        <button
          onClick={() => router.push('/tutor/sessionPlans/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="text-lg">+</span>
          <span>New Session Plan</span>
        </button>
      </div>
      
      {sessionPlans.length === 0 ? (
        <div className="p-8 flex flex-col items-center justify-center bg-gray-50 rounded-lg mx-6 text-gray-500">
          <FileText className="h-12 w-12 mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-1">No session plans found</h3>
          <p className="text-sm">Create a new session plan to get started</p>
        </div>
      ) : (
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessionPlans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 border border-gray-100"
              onClick={() => router.push(`/tutor/sessionPlans/${plan._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(`/tutor/sessionPlans/${plan._id}`);
                }
              }}
            >
              <div className="border-b border-gray-100 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-700 h-10 w-10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-medium">
                    {plan.tuteeId.firstName} {plan.tuteeId.lastName}
                  </h2>
                </div>
                <StatusBadge status={plan.status} />
              </div>
              
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Course</p>
                      <p className="text-sm font-medium">{plan.tuteeId.course}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Class</p>
                      <p className="text-sm font-medium">{plan.tuteeId.studying}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Topics</p>
                    <p className="text-sm">
                      {plan.topics.join(", ")}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Schedule</p>
                      <p className="text-sm font-medium">{plan.schedule.daysPerWeek} sessions/week</p>
                      <div className="mt-1 space-y-1">
                        {plan.schedule.timings.map((time, index) => (
                          <div key={index} className="bg-gray-50 text-xs px-2 py-1 rounded inline-block mr-2 mb-1">
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                      <p className="text-sm font-medium">{plan.durationWeeks} weeks</p>
                    </div>
                  </div>
                </div>
                
                {plan.additionalNotes && (
                  <div className="flex items-start space-x-2 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{plan.additionalNotes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-2 pb-3 px-4 bg-gray-50 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
};

export default SessionPlansPage;