import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import CourseCard from "./CourseCard"

const CourseList = ({
  courses,
  title,
  description,
  viewAllLink,
  emptyMessage = "No courses found",
  loading = false,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
  },
}) => {
  const getGridClasses = () => {
    const { sm, md, lg } = columns
    return `grid grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} gap-6`
  }

  const renderSkeleton = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))
  }

  return (
    <div className="mb-8">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
      )}

      {loading ? (
        <div className={getGridClasses()}>{renderSkeleton()}</div>
      ) : courses.length > 0 ? (
        <div className={getGridClasses()}>
          {courses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{emptyMessage}</h3>
        </div>
      )}

      {viewAllLink && courses.length > 0 && (
        <div className="mt-6 text-center">
          <Link
            to={viewAllLink}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            View all
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  viewAllLink: PropTypes.string,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool,
  columns: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
}

export default CourseList
