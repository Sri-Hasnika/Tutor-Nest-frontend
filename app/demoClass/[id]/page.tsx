"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookOpen, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
const DemoClassBookingPage: React.FC = () => {
  const params = useParams();
  const tutorIdFromParams = params?.id || '';

  const [tutorId, setTutorId] = useState(tutorIdFromParams);
  const [tuteeId, setTuteeId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Get tuteeId from localStorage user object
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && user._id) {
          setTuteeId(user._id);
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8000/tutee-api/demo-class/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorId,
          tuteeId,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book demo class');
      }

      const data = await response.json();
      console.log(data)
      setResponseMessage('Demo class booked successfully!');
      setSubject('');
      setMessage('');
      router.push('/dashboard/find-tutors');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <DashboardShell>
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
        <BookOpen className="mr-2 h-8 w-8" />
        Book a Demo Class
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <div className="relative">
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="What would you like to learn?"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message to Tutor
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
            placeholder="Introduce yourself and share what you hope to learn in this demo class..."
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Booking Demo Class...
            </>
          ) : (
            <>
              Book Demo Class
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>

      {responseMessage && (
        <div className="mt-6 p-4 rounded-md bg-gray-100 border-l-4 border-black">
          <p className="text-gray-900 font-medium">{responseMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="mt-6 p-4 rounded-md bg-red-50 border-l-4 border-red-500">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        After booking, you'll be redirected to the tutor listings page
      </div>
    </div>
  </DashboardShell>
  </div>
  );
};

export default DemoClassBookingPage;