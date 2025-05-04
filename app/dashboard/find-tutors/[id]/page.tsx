
import React from 'react';

interface Tutor {
  _id: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  email: string;
  age: number;
  gender: string;
  courseToTeach: string[];
  subjectsToTeach: string[];
  qualification: string;
  experience: number;
  preferredTime: string;
  hourlyPrice: number;
  tutorLocation: string;
  AboutMe: string;
  resume: string;
  pincode: number;
  locality: string;
  city: string;
  state: string;
  profileImage: string;
}

interface TutorResponse {
  message: string;
  payload: Tutor;
}

interface PageProps {
  params: {
    id: string;
  };
}

async function fetchTutor(tutorId: string): Promise<Tutor> {
  const res = await fetch(`http://localhost:8000/tutor-api/tutor/${tutorId}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tutor data');
  }
  const data: TutorResponse = await res.json();
  return data.payload;
}

const TutorPage = async ({ params }: PageProps) => {
  let tutor: Tutor | null = null;
  try {
    tutor = await fetchTutor(params.id);
  } catch (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tutor Details</h1>
        <p className="text-red-600">Error loading tutor data: {(error as Error).message}</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tutor Details</h1>
        <p>No tutor data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center space-x-6 mb-6">
        {tutor.profileImage ? (
          <img
            src={`/${tutor.profileImage}`}
            alt={`${tutor.firstName} ${tutor.lastName}`}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">
            {tutor.firstName} {tutor.lastName}
          </h1>
          <p className="text-gray-600">{tutor.qualification}</p>
          <p className="text-gray-600">
            {tutor.locality}, {tutor.city}, {tutor.state} - {tutor.pincode}
          </p>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p>
          <strong>Mobile:</strong> {tutor.mobileNo}
        </p>
        <p>
          <strong>Email:</strong> {tutor.email}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
        <p>
          <strong>Age:</strong> {tutor.age}
        </p>
        <p>
          <strong>Gender:</strong> {tutor.gender}
        </p>
        <p>
          <strong>Experience:</strong> {tutor.experience} years
        </p>
        <p>
          <strong>Preferred Time:</strong> {tutor.preferredTime}
        </p>
        <p>
          <strong>Hourly Price:</strong> ${tutor.hourlyPrice}
        </p>
        <p>
          <strong>Location:</strong> {tutor.tutorLocation}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Courses to Teach</h2>
        <ul className="list-disc list-inside">
          {tutor.courseToTeach.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Subjects to Teach</h2>
        <ul className="list-disc list-inside">
          {tutor.subjectsToTeach.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p>{tutor.AboutMe}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Resume</h2>
        <p>{tutor.resume}</p>
      </section>
    </div>
  );
};

export default TutorPage;
