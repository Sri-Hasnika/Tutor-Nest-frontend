import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  DollarSign, 
  MapPin, 
  Award, 
  BookOpen, 
  FileText, 
  Info 
} from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Tutor Profile</h1>
          <div className="flex items-center p-4 bg-red-50 rounded-md border-l-4 border-red-500">
            <p className="text-red-700 font-medium">Error loading tutor data: {(error as Error).message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Tutor Profile</h1>
          <div className="flex items-center p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700">No tutor data found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header section with profile info */}
        <div className="bg-black text-white p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {tutor.profileImage ? (
              <img
                src={`/${tutor.profileImage}`}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center text-white border-4 border-white shadow-lg">
                <User size={64} />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">
                {tutor.firstName} {tutor.lastName}
              </h1>
              <div className="mt-2 flex items-center justify-center md:justify-start">
                <Award className="mr-2 h-5 w-5" />
                <p className="text-gray-200 text-lg">{tutor.qualification}</p>
              </div>
              <div className="mt-2 flex items-center justify-center md:justify-start">
                <MapPin className="mr-2 h-5 w-5" />
                <p className="text-gray-200">
                  {tutor.locality}, {tutor.city}, {tutor.state} - {tutor.pincode}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
                <div className="bg-white text-black px-4 py-2 rounded-md font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {tutor.experience} years experience
                </div>
                <div className="bg-white text-black px-4 py-2 rounded-md font-medium flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  ${tutor.hourlyPrice}/hour
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center border-b border-gray-200 pb-2">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="text-gray-500 mr-3 h-4 w-4" />
                    <p>{tutor.mobileNo}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-gray-500 mr-3 h-4 w-4" />
                    <p className="break-all">{tutor.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center border-b border-gray-200 pb-2">
                  <User className="mr-2 h-5 w-5" />
                  Personal Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="text-gray-500 mr-3 h-4 w-4" />
                    <p><span className="font-medium">Age:</span> {tutor.age}</p>
                  </div>
                  <div className="flex items-center">
                    <User className="text-gray-500 mr-3 h-4 w-4" />
                    <p><span className="font-medium">Gender:</span> {tutor.gender}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-gray-500 mr-3 h-4 w-4" />
                    <p><span className="font-medium">Preferred Time:</span> {tutor.preferredTime}</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-gray-500 mr-3 h-4 w-4" />
                    <p><span className="font-medium">Location:</span> {tutor.tutorLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center border-b border-gray-200 pb-2">
                  <Info className="mr-2 h-5 w-5" />
                  About Me
                </h2>
                <p className="text-gray-700 whitespace-pre-line">{tutor.AboutMe}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold mb-4 flex items-center border-b border-gray-200 pb-2">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Courses
                  </h2>
                  <ul className="space-y-2">
                    {tutor.courseToTeach?.map((course) => (
                      <li key={course} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold mb-4 flex items-center border-b border-gray-200 pb-2">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Subjects
                  </h2>
                  <ul className="space-y-2">
                    {tutor.subjectsToTeach?.map((subject) => (
                      <li key={subject} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center border-b border-gray-200 pb-2">
                  <FileText className="mr-2 h-5 w-5" />
                  Resume
                </h2>
                <p className="text-gray-700 whitespace-pre-line">{tutor.resume}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with action button */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-center">
          <a
            href={`/dashboard/book-demo-class/${tutor._id}`}
            className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Book a Demo Class
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorPage;