"use client"

import { useState } from "react"
import PropTypes from "prop-types"

const Calendar = ({
  events = [],
  onDateSelect,
  onEventClick,
  selectedDate = new Date(),
  minDate = null,
  maxDate = null,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate))
  const [activeDate, setActiveDate] = useState(new Date(selectedDate))

  // Helper functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Navigation functions
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)

    if (minDate && newMonth < new Date(minDate.getFullYear(), minDate.getMonth(), 1)) {
      return
    }

    setCurrentMonth(newMonth)
  }

  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)

    if (maxDate && newMonth > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)) {
      return
    }

    setCurrentMonth(newMonth)
  }

  // Date selection handler
  const handleDateClick = (date) => {
    setActiveDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  // Event click handler
  const handleEventClick = (event, e) => {
    e.stopPropagation()
    if (onEventClick) {
      onEventClick(event)
    }
  }

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border-t border-l"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = new Date().toDateString() === date.toDateString()
      const isSelected = activeDate.toDateString() === date.toDateString()
      const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate)

      // Find events for this day
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
      })

      days.push(
        <div
          key={day}
          className={`min-h-[6rem] p-1 border-t border-l relative ${
            isDisabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"
          } ${isSelected ? "bg-primary bg-opacity-10" : ""}`}
          onClick={() => !isDisabled && handleDateClick(date)}
        >
          <div className={`flex justify-between items-center p-1 ${isToday ? "font-bold" : ""}`}>
            <span
              className={`text-sm ${isToday ? "bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
            >
              {day}
            </span>
          </div>
          <div className="mt-1">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className={`text-xs p-1 mb-1 rounded truncate ${
                  event.type === "class"
                    ? "bg-primary text-white"
                    : event.type === "assignment"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-800"
                }`}
                onClick={(e) => handleEventClick(event, e)}
              >
                {event.time && <span className="font-medium">{event.time} </span>}
                {event.title}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    // Add empty cells for days after the last day of the month to complete the grid
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7
    for (let i = days.length; i < totalCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-12 border-t border-l"></div>)
    }

    return days
  }

  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          type="button"
          className="p-2 text-gray-600 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={prevMonth}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only">Previous month</span>
        </button>
        <h2 className="text-lg font-semibold text-gray-900">{formatMonthYear(currentMonth)}</h2>
        <button
          type="button"
          className="p-2 text-gray-600 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={nextMonth}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="sr-only">Next month</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-700 border-b">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      time: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  onDateSelect: PropTypes.func,
  onEventClick: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
}

export default Calendar
