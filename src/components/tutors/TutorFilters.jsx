"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import Button from "../common/Button"

const TutorFilters = ({ onApplyFilters, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    subject: initialFilters.subject || "",
    priceRange: initialFilters.priceRange || [0, 100],
    rating: initialFilters.rating || "",
    availability: initialFilters.availability || [],
    location: initialFilters.location || "",
    ...initialFilters,
  })

  const subjects = [
    { value: "", label: "All Subjects" },
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "languages", label: "Languages" },
    { value: "computer-science", label: "Computer Science" },
  ]

  const ratings = [
    { value: "", label: "Any Rating" },
    { value: "4", label: "4.0 & above" },
    { value: "4.5", label: "4.5 & above" },
    { value: "5", label: "5.0 only" },
  ]

  const availabilityOptions = [
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "evenings", label: "Evenings" },
    { value: "mornings", label: "Mornings" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    const updatedAvailability = checked
      ? [...filters.availability, name]
      : filters.availability.filter((item) => item !== name)

    setFilters({ ...filters, availability: updatedAvailability })
  }

  const handlePriceRangeChange = (e) => {
    const value = Number.parseInt(e.target.value, 10)
    setFilters({ ...filters, priceRange: [0, value] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onApplyFilters(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      subject: "",
      priceRange: [0, 100],
      rating: "",
      availability: [],
      location: "",
    }
    setFilters(resetFilters)
    onApplyFilters(resetFilters)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      <div className="space-y-4">
        {/* Subject Filter */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={filters.subject}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range (up to ${filters.priceRange[1]}/hour)
          </label>
          <input
            type="range"
            id="priceRange"
            name="priceRange"
            min="10"
            max="200"
            step="5"
            value={filters.priceRange[1]}
            onChange={handlePriceRangeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$10</span>
            <span>$200+</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="space-y-2">
            {ratings.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`rating-${option.value}`}
                  name="rating"
                  type="radio"
                  value={option.value}
                  checked={filters.rating === option.value}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor={`rating-${option.value}`} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <div className="space-y-2">
            {availabilityOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  name={option.value}
                  type="checkbox"
                  checked={filters.availability.includes(option.value)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={option.value} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="City, state, or country"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button type="submit" variant="primary" fullWidth>
          Apply Filters
        </Button>
        <Button type="button" variant="outline" fullWidth onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </form>
  )
}

TutorFilters.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  initialFilters: PropTypes.object,
}

export default TutorFilters
