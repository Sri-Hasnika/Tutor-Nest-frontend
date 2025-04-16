"use client"
import PropTypes from "prop-types"
import Card, { CardBody, CardFooter } from "../common/Card"
import Button from "../common/Button"

const TutorCard = ({ tutor, variant = "default", showActions = true, onClick }) => {
  const { id, name, avatar, subject, specialization, rating, reviews, price, availability } = tutor

  const renderRating = () => {
    if (rating) {
      return (
        <div className="flex items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">
            {rating} ({reviews} reviews)
          </span>
        </div>
      )
    }
    return null
  }

  const renderPrice = () => {
    if (price !== undefined) {
      return <div className="mt-2 font-medium text-gray-900">${price}/hour</div>
    }
    return null
  }

  const renderAvailability = () => {
    if (availability) {
      return (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Availability:</span> {availability}
        </div>
      )
    }
    return null
  }

  const renderActions = () => {
    if (!showActions) return null

    return (
      <div className="flex space-x-2 mt-4">
        <Button variant="outline" size="small" className="flex-1">
          View Profile
        </Button>
        <Button variant="primary" size="small" className="flex-1">
          Book Session
        </Button>
      </div>
    )
  }

  return (
    <Card variant={variant} hover clickable={!!onClick} onClick={onClick} className="h-full flex flex-col">
      <CardBody className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4">
          <img
            src={avatar || "https://via.placeholder.com/96"}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>

        {subject && (
          <div className="inline-block bg-primary bg-opacity-10 text-primary text-sm font-medium px-2 py-1 rounded-full mb-2">
            {subject}
          </div>
        )}

        {specialization && <p className="text-sm text-gray-700 mb-2 line-clamp-2">{specialization}</p>}

        {renderRating()}
        {renderPrice()}
        {renderAvailability()}
      </CardBody>

      {showActions && <CardFooter>{renderActions()}</CardFooter>}
    </Card>
  )
}

TutorCard.propTypes = {
  tutor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    subject: PropTypes.string,
    specialization: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reviews: PropTypes.number,
    price: PropTypes.number,
    availability: PropTypes.string,
  }).isRequired,
  variant: PropTypes.string,
  showActions: PropTypes.bool,
  onClick: PropTypes.func,
}

export default TutorCard
