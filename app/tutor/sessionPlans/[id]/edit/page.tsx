"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';

interface SessionPlan {
  _id: string;
  tutorId: string;
  tuteeId: string;
  topics: string[];
  schedule: {
    daysPerWeek: number;
    timings: string[];
  };
  durationWeeks: number;
  additionalNotes: string;
  status: string;
}

const EditSessionPlanPage: React.FC = () => {
  const params = useParams() as { id: string };
  const { id } = params;
  const router = useRouter();

  const [sessionPlan, setSessionPlan] = useState<SessionPlan | null>(null);
  const [course, setCourse] = useState<string | undefined>(undefined);
  const [studying, setStudying] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [topics, setTopics] = useState<string>('');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(1);
  const [timings, setTimings] = useState<string>('');
  const [durationWeeks, setDurationWeeks] = useState<number>(1);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [status, setStatus] = useState<string>('active');
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSessionPlan = async () => {
      try {
        const response = await axios.get(`https://tutor-nest-backend.onrender.com/sessionPlan-api/${id}`);
        const plan = response.data.payload;
        setSessionPlan(plan);
        setTopics(plan.topics.join(', '));
        setDaysPerWeek(plan.schedule.daysPerWeek);
        setTimings(plan.schedule.timings.join(', '));
        setDurationWeeks(plan.durationWeeks);
        setAdditionalNotes(plan.additionalNotes);
        setStatus(plan.status);
        setCourse(plan.tuteeId.course || '');
        setStudying(plan.tuteeId.studying || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch session plan.');
        setLoading(false);
      }
    };

    fetchSessionPlan();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError(null);

    const topicsArray = topics.split(',').map(topic => topic.trim());
    const timingsArray = timings.split(',').map(time => time.trim());

    try {
        await axios.put(`https://tutor-nest-backend.onrender.com/sessionPlan-api/${id}`, {
          tutorId: sessionPlan?.tutorId,
          tuteeId: sessionPlan?.tuteeId && typeof sessionPlan.tuteeId === 'object' ? Object.assign({}, sessionPlan.tuteeId, { course, studying }) : undefined,
          topics: topicsArray,
          schedule: {
            daysPerWeek,
            timings: timingsArray,
          },
          durationWeeks,
          additionalNotes,
          status,
        });
      setUpdating(false);
      router.push('/tutor/sessionPlans');
    } catch (err) {
      setUpdateError('Failed to update session plan.');
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading session plan...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!sessionPlan) return <div className="p-6 text-center">Session plan not found.</div>;

  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Session Plan" text={`Edit session plan for tutee ID: ${sessionPlan.tuteeId}`} />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="topics" className="block font-semibold mb-1">Topics (comma separated)</label>
            <input
              type="text"
              id="topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="daysPerWeek" className="block font-semibold mb-1">Days Per Week</label>
            <input
              type="number"
              id="daysPerWeek"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              min={1}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="timings" className="block font-semibold mb-1">Timings (comma separated, e.g. "10:00 AM - 11:00 AM")</label>
            <input
              type="text"
              id="timings"
              value={timings}
              onChange={(e) => setTimings(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="durationWeeks" className="block font-semibold mb-1">Duration (weeks)</label>
            <input
              type="number"
              id="durationWeeks"
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(Number(e.target.value))}
              min={1}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="additionalNotes" className="block font-semibold mb-1">Additional Notes</label>
            <textarea
              id="additionalNotes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="course" className="block font-semibold mb-1">Course</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          </div>
          <div>
            <label htmlFor="studying" className="block font-semibold mb-1">Class</label>
          <input
            type="text"
            id="studying"
            value={studying}
            onChange={(e) => setStudying(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          </div>
          <div>
            <label htmlFor="status" className="block font-semibold mb-1">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          {updateError && <p className="text-red-600">{updateError}</p>}
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {updating ? 'Updating...' : 'Update Session Plan'}
          </button>
        </form>
      </div>
    </DashboardShell>
  );
};

export default EditSessionPlanPage;
