"use client"
import PropTypes from "prop-types"
import Card, { CardBody, CardFooter } from "../common/Card"
import Button from "../common/Button"

const CourseCard = ({ course, variant = "default", showActions = true, onClick }) => {
  const { id, title, description, instructor, category, image, progress, enrolled, rating, price } = course

  const renderProgressBar = () => {
    if (progress !== undefined && enrolled) {
      return (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )
    }
    return null
  }

  const renderRating = () => {
    if (rating) {
      return (
        <div className="flex items-center mt-1">
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="ml-1 text-sm text-gray-600">{rating}</span>
        </div>
      )
    }
    return null
  }

  const renderPrice = () => {
    if (price !== undefined && !enrolled) {
      return <div className="mt-1 font-medium text-gray-900">{price === 0 ? "Free" : `$${price.toFixed(2)}`}</div>
    }
    return null
  }

  const renderActions = () => {
    if (!showActions) return null

    if (enrolled) {
      return (
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="small" className="flex-1">
            Materials
          </Button>
          <Button variant="primary" size="small" className="flex-1">
            Continue
          </Button>
        </div>
      )
    }

    return (
      <div className="mt-4">
        <Button variant="primary" size="small" fullWidth>
          Enroll Now
        </Button>
      </div>
    )
  }

  return (
    <Card variant={variant} hover clickable={!!onClick} onClick={onClick} className="h-full flex flex-col">
      <div className="relative pb-[56.25%]">
        <img
          src={image || "https://via.placeholder.com/300x169"}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
        />
        {category && (
          <span className="absolute top-2 left-2 bg-primary bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      <CardBody className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>

        {instructor && <p className="text-sm text-gray-600 mb-2">by {instructor}</p>}

        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{description}</p>

        {renderProgressBar()}
        {renderRating()}
        {renderPrice()}
      </CardBody>

      {showActions && <CardFooter>{renderActions()}</CardFooter>}
    </Card>
  )
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    instructor: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    progress: PropTypes.number,
    enrolled: PropTypes.bool,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
  }).isRequired,
  variant: PropTypes.string,
  showActions: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CourseCard
