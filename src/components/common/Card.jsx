"use client"
import PropTypes from "prop-types"

const Card = ({ children, className = "", variant = "default", hover = false, clickable = false, onClick }) => {
  const baseStyles = "bg-white rounded-lg overflow-hidden"

  const variantStyles = {
    default: "border border-gray-200 shadow-sm",
    elevated: "shadow-md",
    flat: "border border-gray-200",
    none: "",
  }

  const hoverStyles = hover ? "transition-transform duration-200 hover:-translate-y-1 hover:shadow-md" : ""
  const clickableStyles = clickable ? "cursor-pointer" : ""

  const cardClasses = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${hoverStyles} 
    ${clickableStyles} 
    ${className}
  `

  return (
    <div className={cardClasses} onClick={clickable ? onClick : undefined}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>
}

export const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
}

export const CardSubtitle = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
}

export const CardBody = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export const CardFooter = ({ children, className = "" }) => {
  return <div className={`p-4 border-t border-gray-200 ${className}`}>{children}</div>
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "elevated", "flat", "none"]),
  hover: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Card
