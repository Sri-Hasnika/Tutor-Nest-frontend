import { Link } from "react-router-dom"
import Button from "../components/common/Button"

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former professor with 15+ years of experience in education technology and curriculum development.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech entrepreneur with a passion for creating innovative learning solutions and educational platforms.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Curriculum",
      bio: "Education specialist with expertise in developing personalized learning programs for diverse student needs.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "David Wilson",
      role: "Head of Tutor Relations",
      bio: "Former academic advisor dedicated to connecting students with the perfect tutoring match for their needs.",
      image: "https://via.placeholder.com/150",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EduConnect</h1>
            <p className="text-xl mb-8 text-white text-opacity-90">
              We're on a mission to transform education through personalized tutoring and innovative learning solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="https://via.placeholder.com/600x400"
                alt="EduConnect team meeting"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                EduConnect was founded in 2018 by Dr. Sarah Johnson, a former university professor who recognized the
                need for more personalized education solutions in an increasingly digital world.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small tutoring service connecting local students with qualified tutors has grown into
                a comprehensive educational platform serving thousands of students across the country.
              </p>
              <p className="text-gray-600">
                Today, EduConnect continues to innovate in the education space, leveraging technology to create
                meaningful connections between students and tutors while providing the tools and resources needed for
                academic success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600">
              We believe in the power of personalized education to transform lives and create opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Personalized Learning</h3>
              <p className="text-gray-600 text-center">
                We believe every student deserves an education tailored to their unique needs, learning style, and
                goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Quality Connections</h3>
              <p className="text-gray-600 text-center">
                We carefully vet our tutors to ensure students connect with knowledgeable, passionate educators who
                inspire learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">
                We continuously explore new technologies and teaching methods to enhance the learning experience for
                students and tutors alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate educators and innovators behind EduConnect's mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">EduConnect by the Numbers</h2>
            <p className="text-xl text-gray-600">Our impact on education and learning outcomes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the EduConnect Community</h2>
            <p className="text-xl mb-8 text-white text-opacity-90">
              Whether you're a student looking to excel or a tutor passionate about education, there's a place for you
              at EduConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button variant="secondary" size="large">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="large"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
