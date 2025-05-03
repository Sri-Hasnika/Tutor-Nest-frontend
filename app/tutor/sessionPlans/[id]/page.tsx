"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { Edit, BookOpen, Clock, Calendar, FileText, User, AlertCircle, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SessionPlan {
  _id: string;
  tutorId: string;
  tuteeId: {
    _id: string;
    firstName: string;
    lastName: string;
    course: string;
    studying: string;
  };
  topics: string[];
  schedule: {
    daysPerWeek: number;
    timings: string[];
  };
  durationWeeks: number;
  additionalNotes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";
  let Icon = CheckCircle;
  
  if (status.toLowerCase() === "active") {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
    Icon = CheckCircle;
  } else if (status.toLowerCase() === "pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-700";
    Icon = Clock;
  } else if (status.toLowerCase() === "completed") {
    bgColor = "bg-blue-100";
    textColor = "text-blue-700";
    Icon = CheckCircle;
  } else if (status.toLowerCase() === "cancelled") {
    bgColor = "bg-red-100";
    textColor = "text-red-700";
    Icon = AlertCircle;
  }
  
  return (
    <div className={`${bgColor} ${textColor} text-sm font-medium px-3 py-1 rounded-full inline-flex items-center`}>
      <Icon className="h-4 w-4 mr-1.5" />
      {status}
    </div>
  );
};

const SessionPlanDetailPage: React.FC = () => {
  const params = useParams() as { id: string };
  const { id } = params;
  const [sessionPlan, setSessionPlan] = useState<SessionPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchSessionPlan = async () => {
      try {
        console.log("Fetching session plan with id:", id);
        const response = await axios.get(`https://tutor-nest-backend.onrender.com/sessionPlan-api/${id}`);
        console.log("Response from backend:", response);
        if (response.data && response.data.payload) {
          setSessionPlan(response.data.payload);
        } else {
          setError("Session plan not found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching session plan:", err);
        setLoading(false);
      }
    };

    fetchSessionPlan();
  }, [id]);

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
  
  if (!sessionPlan) {
    return (
      <DashboardShell>
        <div className="p-6 flex items-center justify-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center text-yellow-700 max-w-md">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>Session plan not found.</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Session Plan Details" text={`Details for session plan with ${sessionPlan.tuteeId.firstName} ${sessionPlan.tuteeId.lastName}`} />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
          {/* Header section */}
          <div className="border-b border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 h-14 w-14 rounded-full flex items-center justify-center">
                <User className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-1">{sessionPlan.tuteeId.firstName} {sessionPlan.tuteeId.lastName}</h2>
                <div className="flex items-center gap-3">
                  <div className="text-gray-500 text-sm">{sessionPlan.tuteeId.course}</div>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="text-gray-500 text-sm">{sessionPlan.tuteeId.studying}</div>
                </div>
              </div>
            </div>
            <StatusBadge status={sessionPlan.status} />
          </div>
          
          {/* Main content section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-500" />
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sessionPlan.topics.map((topic, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    Duration
                  </h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="font-semibold text-gray-700">{sessionPlan.durationWeeks}</span>
                    <span className="text-gray-500">weeks</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    Creation & Updates
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="text-gray-700">{formatDate(sessionPlan.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Updated:</span>
                      <span className="text-gray-700">{formatDate(sessionPlan.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    Schedule
                  </h3>
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">Sessions per week:</span>
                      <span className="font-medium text-gray-700">{sessionPlan.schedule.daysPerWeek}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Session Timings:</h4>
                  <div className="space-y-2">
                    {sessionPlan.schedule.timings.map((time, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-md px-3 py-2 flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {sessionPlan.additionalNotes && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                      Additional Notes
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{sessionPlan.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Footer actions */}
          <div className="border-t border-gray-100 p-6 flex justify-end">
            <Button 
              onClick={() => router.push(`/tutor/sessionPlans/${id}/edit`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Session Plan
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default SessionPlanDetailPage;