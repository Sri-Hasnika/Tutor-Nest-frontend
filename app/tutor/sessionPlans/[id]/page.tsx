"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { Edit } from 'lucide-react';
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
        const response = await axios.get(`http://localhost:8000/sessionPlan-api/${id}`);
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

  if (loading) return <div className="p-6 text-center">Loading session plan...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!sessionPlan) return <div className="p-6 text-center">Session plan not found.</div>;

  return (
    <DashboardShell>
      <DashboardHeader heading="Session Plan Details" text={`Details for session plan with ${sessionPlan.tuteeId.firstName} ${sessionPlan.tuteeId.lastName}`} />
      <div className="p-6 bg-white shadow-lg rounded-xl max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold">{sessionPlan.tuteeId.firstName} {sessionPlan.tuteeId.lastName}</h2>
        <p><strong>Course:</strong> {sessionPlan.tuteeId.course}</p>
        <p><strong>Class:</strong> {sessionPlan.tuteeId.studying}</p>
        <p><strong>Topics:</strong> {sessionPlan.topics.join(", ")}</p>
        <p><strong>Schedule:</strong> {sessionPlan.schedule.daysPerWeek} sessions/week</p>
        <ul>
          {sessionPlan.schedule.timings.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
        <p><strong>Duration (weeks):</strong> {sessionPlan.durationWeeks}</p>
        <p><strong>Additional Notes:</strong> {sessionPlan.additionalNotes || "None"}</p>
        <p><strong>Status:</strong> {sessionPlan.status}</p>
        <p><strong>Created At:</strong> {new Date(sessionPlan.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(sessionPlan.updatedAt).toLocaleString()}</p>
        <Button onClick={()=>{router.push(`/tutor/sessionPlans/${id}/edit`)}}>
          <Edit/>
        </Button>
      </div>
    </DashboardShell>
  );
};

export default SessionPlanDetailPage;
