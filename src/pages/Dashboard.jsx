"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/common/Button"
import Card, { CardBody, CardHeader, CardTitle } from "../components/common/Card"

const Dashboard = () => {
  const { user } = useAuth()

  // Mock data for dashboard
  const upcomingSessions = [
    {
      id: 1,
      subject: "Advanced Calculus",
      tutor: "Dr. Sarah Johnson",
      date: "Mon, Oct 12",
      time: "4:00 PM - 5:30 PM",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      subject: "English Literature",
      tutor: "Prof. Emily Rodriguez",
      date: "Wed, Oct 14",
      time: "3:00 PM - 4:00 PM",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      subject: "Physics Mechanics",
      tutor: "Dr. Michael Chen",
      date: "Fri, Oct 16",
      time: "5:00 PM - 6:30 PM",
      image: "https://via.placeholder.com/40",
    },
  ]

  const activeCourses = [
    {
      id: 1,
      title: "Mathematics Fundamentals",
      progress: 75,
      nextLesson: "Differential Equations",
      image: "https://via.placeholder.com/200x100",
    },
    {
      id: 2,
      title: "English Literature & Composition",
      progress: 50,
      nextLesson: "Shakespeare's Sonnets",
      image: "https://via.placeholder.com/200x100",
    },
    {
      id: 3,
      title: "Physics Mechanics",
      progress: 30,
      nextLesson: "Newton's Laws of Motion",
      image: "https://via.placeholder.com/200x100",
    },
    {
      id: 4,
      title: "Computer Science Principles",
      progress: 60,
      nextLesson: "Data Structures",
      image: "https://via.placeholder.com/200x100",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "Student"}!</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/schedule/book">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule a Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                <p className="text-xs text-gray-500 mt-1">Next session in 2 days</p>
              </div>
              <div className="bg-primary bg-opacity-10 p-2 rounded-full">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
                <p className="text-xs text-gray-500 mt-1">2 courses in progress</p>
              </div>
              <div className="bg-secondary bg-opacity-10 p-2 rounded-full">
                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24.5</p>
                <p className="text-xs text-gray-500 mt-1">+2.5 hours from last week</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Messages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                <p className="text-xs text-gray-500 mt-1">3 unread messages</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Upcoming Sessions</CardTitle>
            <Link to="/schedule" className="text-sm text-primary hover:text-primary-dark">
              View All
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <div className="divide-y">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="py-4 flex items-center">
                <img
                  src={session.image || "/placeholder.svg"}
                  alt={session.tutor}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">{session.subject}</h3>
                  <p className="text-sm text-gray-500">{session.tutor}</p>
                  <p className="text-sm text-gray-500">
                    {session.date}, {session.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Active Courses */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Courses</CardTitle>
            <Link to="/courses" className="text-sm text-primary hover:text-primary-dark">
              View All
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="rounded-lg shadow-md overflow-hidden">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-900">{course.title}</h3>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Next Lesson: {course.nextLesson}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Dashboard
