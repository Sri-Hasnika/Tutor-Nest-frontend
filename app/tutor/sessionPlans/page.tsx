"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { useRouter } from 'next/navigation';

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

  if (loading) return <div className="p-6 text-center">Loading session plans...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;


  return (
    <DashboardShell>
      <DashboardHeader heading="Session Plans" text="Manage your session plans with tutees" />
      <div className="p-6 flex justify-end">
        <button
          onClick={() => router.push('/tutor/sessionPlans/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Session Plan
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessionPlans.length === 0 ? (
          <p>No session plans found.</p>
        ) : (
          sessionPlans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-lg rounded-xl p-5 space-y-3 hover:cursor-pointer"
              onClick={() => router.push(`/tutor/sessionPlans/${plan._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(`/tutor/sessionPlans/${plan._id}`);
                }
              }}
            >
              <h2 className="text-xl font-semibold">{plan.tuteeId.firstName} {plan.tuteeId.lastName}</h2>
              <p><strong>Course:</strong> {plan.tuteeId.course}</p>
              <p><strong>Class:</strong> {plan.tuteeId.studying}</p>
              <p><strong>Topics:</strong> {plan.topics.join(", ")}</p>
              <p><strong>Schedule:</strong> {plan.schedule.daysPerWeek} sessions/week</p>
              <ul>
                {plan.schedule.timings.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
              <p><strong>Duration (weeks):</strong> {plan.durationWeeks}</p>
              <p><strong>Additional Notes:</strong> {plan.additionalNotes || "None"}</p>
              <p><strong>Status:</strong> {plan.status}</p>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
};

export default SessionPlansPage;
