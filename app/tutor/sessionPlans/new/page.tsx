"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/app/dashboard/dashboard-shell';
import { DashboardHeader } from '@/app/dashboard/dashboard-header';
import { CalendarDays, BookOpen, Clock, User, FileText, Pencil } from 'lucide-react';

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
      <DashboardHeader 
        heading="New Session Plan" 
        text="Create a personalized learning schedule for your tutee" 
      />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-black p-4 text-white">
            <h2 className="text-xl font-bold flex items-center">
              <FileText className="mr-2" size={20} />
              Session Plan Details
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="tuteeId" className="flex items-center text-sm font-medium text-gray-700">
                    <User className="mr-2" size={16} />
                    Select Tutee
                  </label>
                  <select
                    id="tuteeId"
                    value={tuteeId}
                    onChange={(e) => setTuteeId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                    required
                  >
                    {tutees.map((tutee) => (
                      <option key={tutee._id} value={tutee._id}>
                        {tutee.firstName} {tutee.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="course" className="flex items-center text-sm font-medium text-gray-700">
                    <BookOpen className="mr-2" size={16} />
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                    placeholder="e.g. Mathematics, Physics"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="class" className="flex items-center text-sm font-medium text-gray-700">
                    <Pencil className="mr-2" size={16} />
                    Class/Grade
                  </label>
                  <input
                    type="text"
                    id="class"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                    placeholder="e.g. Grade 10, AP Calculus"
                    required
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="topics" className="flex items-center text-sm font-medium text-gray-700">
                    <BookOpen className="mr-2" size={16} />
                    Topics (comma separated)
                  </label>
                  <input
                    type="text"
                    id="topics"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                    placeholder="e.g. Algebra, Geometry, Calculus"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="daysPerWeek" className="flex items-center text-sm font-medium text-gray-700">
                      <CalendarDays className="mr-2" size={16} />
                      Days Per Week
                    </label>
                    <input
                      type="number"
                      id="daysPerWeek"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      min={1}
                      max={7}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="durationWeeks" className="flex items-center text-sm font-medium text-gray-700">
                      <CalendarDays className="mr-2" size={16} />
                      Duration (weeks)
                    </label>
                    <input
                      type="number"
                      id="durationWeeks"
                      value={durationWeeks}
                      onChange={(e) => setDurationWeeks(Number(e.target.value))}
                      min={1}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="timings" className="flex items-center text-sm font-medium text-gray-700">
                    <Clock className="mr-2" size={16} />
                    Timings (comma separated)
                  </label>
                  <input
                    type="text"
                    id="timings"
                    value={timings}
                    onChange={(e) => setTimings(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                    placeholder="e.g. 10:00 AM - 11:00 AM, 4:00 PM - 5:00 PM"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="additionalNotes" className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="mr-2" size={16} />
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition duration-200"
                rows={4}
                placeholder="Enter any additional information or special requirements for this session plan"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/tutor/sessionPlans')}
                className="px-6 py-3 mr-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-900 shadow-md transition duration-200 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Session Plan'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
};

export default NewSessionPlanPage;