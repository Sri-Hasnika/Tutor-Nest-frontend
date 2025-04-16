import { Link } from "react-router-dom"
import Button from "../components/common/Button"
import CourseList from "../components/courses/CourseList"

const Home = () => {
  // Mock featured courses data
  const featuredCourses = [
    {
      id: 1,
      title: "Mathematics Fundamentals",
      description: "Master essential math concepts from algebra to calculus with personalized guidance.",
      instructor: "Dr. Sarah Johnson",
      category: "Mathematics",
      image: "https://via.placeholder.com/300x169",
      rating: 4.9,
      price: 49.99,
    },
    {
      id: 2,
      title: "English Literature & Composition",
      description: "Develop critical reading and writing skills through classic and contemporary texts.",
      instructor: "Prof. Emily Rodriguez",
      category: "English",
      image: "https://via.placeholder.com/300x169",
      rating: 4.8,
      price: 39.99,
    },
    {
      id: 3,
      title: "Computer Science Principles",
      description: "Learn programming fundamentals and problem-solving techniques for beginners.",
      instructor: "Dr. Robert Lee",
      category: "Computer Science",
      image: "https://via.placeholder.com/300x169",
      rating: 4.7,
      price: 59.99,
    },
  ]

  // Mock top tutors data
  const topTutors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      specialization: "Calculus, Algebra, Statistics",
      rating: 4.9,
      reviews: 128,
      price: 45,
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Physics",
      specialization: "Mechanics, Electromagnetism, Quantum Physics",
      rating: 4.8,
      reviews: 96,
      price: 50,
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Ms. Emily Rodriguez",
      subject: "English Literature",
      specialization: "Essay Writing, Literary Analysis, Creative Writing",
      rating: 4.9,
      reviews: 112,
      price: 40,
      avatar: "https://via.placeholder.com/100",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-light to-primary py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn With The Best Tutors</h1>
              <p className="text-xl mb-8 text-white text-opacity-90">
                Connect with expert tutors, schedule personalized sessions, and achieve your academic goals with our
                comprehensive tutoring platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button variant="secondary" size="large">
                    Get Started
                  </Button>
                </Link>
                <Link to="/tutors">
                  <Button
                    variant="outline"
                    size="large"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Find a Tutor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Students learning with a tutor"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect with tutors and start learning in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find a Tutor</h3>
              <p className="text-gray-600">
                Search for tutors based on subject, availability, and location to find the perfect match for your
                learning needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule a Session</h3>
              <p className="text-gray-600">
                Book a demo class or regular session at a time that works for you using our intuitive scheduling system.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-600">
                Connect with your tutor, access learning materials, and track your progress as you achieve your academic
                goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CourseList
            courses={featuredCourses}
            title="Featured Courses"
            description="Explore our most popular courses taught by expert tutors."
            viewAllLink="/courses"
          />
        </div>
      </section>

      {/* Top Tutors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Tutors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet some of our highly rated tutors ready to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topTutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-center">
                  <img
                    src={tutor.avatar || "/placeholder.svg"}
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{tutor.name}</h3>
                  <p className="text-primary font-medium mb-2">{tutor.subject} Specialist</p>
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-gray-600">
                      {tutor.rating} ({tutor.reviews} reviews)
                    </span>
                  </div>
                  <Link to={`/tutors/${tutor.id}`}>
                    <Button variant="outline" fullWidth>
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/tutors">
              <Button variant="outline">Browse All Tutors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 text-white text-opacity-90">
                Join thousands of students who are achieving their academic goals with EduConnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button variant="secondary" size="large">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="large"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">5,000+</div>
                <div className="text-white text-opacity-90">Active Students</div>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white text-opacity-90">Expert Tutors</div>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">1,000+</div>
                <div className="text-white text-opacity-90">Courses</div>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-white text-opacity-90">Sessions Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
