"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';

interface Tutee {
  _id: string;
  firstName: string;
  lastName: string;
}

const NewSessionPlanPage: React.FC = () => {
  const router = useRouter();
  const [tuteeId, setTuteeId] = useState<string>('');
  const [tutees, setTutees] = useState<Tutee[]>([]);
  const [topics, setTopics] = useState<string>('');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(1);
  const [timings, setTimings] = useState<string>('');
  const [durationWeeks, setDurationWeeks] = useState<number>(1);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('');

const [tutorId, setTutorId] = useState<string>('');

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser._id) {
      setTutorId(parsedUser._id);
    }
  }
}, []);

useEffect(() => {
  const fetchTutees = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/tutor-api/${tutorId}/tutees`);
      console.log("Tutees response:", response.data.payload);
      setTutees(response.data.payload);
      if (response.data.payload.length > 0) {
        setTuteeId(response.data.payload[0]._id);
      }
    } catch (err) {
      setError('Failed to load tutees.');
    }
  };

  if (tutorId) {
    fetchTutees();
  }
}, [tutorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const topicsArray = topics.split(',').map(topic => topic.trim());
    const timingsArray = timings.split(',').map(time => time.trim());

    try {
      await axios.post('http://localhost:8000/sessionPlan-api/create', {
        tutorId,
        tuteeId,
        course,
        studentClass,
        topics: topicsArray,
        schedule: {
          daysPerWeek,
          timings: timingsArray,
        },
        durationWeeks,
        additionalNotes,
      });
      
      setLoading(false);
      router.push('/tutor/sessionPlans');
    } catch (err) {
      setError('Failed to create session plan.');
      setLoading(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="New Session Plan" text="Create a new session plan for a tutee" />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tuteeId" className="block font-semibold mb-1">Select Tutee</label>
            <select
              id="tuteeId"
              value={tuteeId}
              onChange={(e) => setTuteeId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              {tutees.map((tutee) => (
                <option key={tutee._id} value={tutee._id}>
                  {tutee.firstName} {tutee.lastName}
                </option>
              ))}
            </select>
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
            <label htmlFor="class" className="block font-semibold mb-1">Class</label>
            <input
              type="text"
              id="class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

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
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? 'Creating...' : 'Create Session Plan'}
          </button>
        </form>
      </div>
    </DashboardShell>
  );
};

export default NewSessionPlanPage;
