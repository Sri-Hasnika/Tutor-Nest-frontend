"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { Save, AlertCircle, Clock, BookOpen, Calendar, FileText, BookMarked, School, Tag } from 'lucide-react';

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
        const response = await axios.get(`http://localhost:8000/sessionPlan-api/${id}`);
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
        await axios.put(`http://localhost:8000/sessionPlan-api/${id}`, {
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

  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Session Plan" text={`Edit session plan for tutee ID: ${sessionPlan.tuteeId}`} />
      
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
          <div className="border-b border-gray-100 p-5 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800">Update Session Plan Details</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Academic Information Section */}
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-4 flex items-center text-gray-700">
                  <BookMarked className="h-5 w-5 mr-2 text-blue-600" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="studying" className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <School className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="studying"
                        value={studying}
                        onChange={(e) => setStudying(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Topics Field */}
              <div className="md:col-span-2">
                <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">
                  Topics (comma separated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="topics"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              
              {/* Schedule Section */}
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-4 flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Schedule Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700 mb-1">
                      Days Per Week
                    </label>
                    <input
                      type="number"
                      id="daysPerWeek"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      min={1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="durationWeeks" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (weeks)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="durationWeeks"
                        value={durationWeeks}
                        onChange={(e) => setDurationWeeks(Number(e.target.value))}
                        min={1}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="timings" className="block text-sm font-medium text-gray-700 mb-1">
                      Timings (comma separated, e.g. "10:00 AM - 11:00 AM")
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="timings"
                        value={timings}
                        onChange={(e) => setTimings(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status & Notes Section */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <textarea
                      id="additionalNotes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {updateError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-red-700">{updateError}</p>
              </div>
            )}
            
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.push('/tutor/sessionPlans')}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Session Plan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
};

export default EditSessionPlanPage;