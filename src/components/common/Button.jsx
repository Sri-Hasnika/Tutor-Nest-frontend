"use client"
import PropTypes from "prop-types"

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary",
    danger: "bg-danger text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-success text-white hover:bg-green-600 focus:ring-green-500",
  }

  const sizeStyles = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-6 py-3",
  }

  const widthStyles = fullWidth ? "w-full" : ""
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  const buttonClasses = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${widthStyles} 
    ${disabledStyles} 
    ${className}
  `

  return (
    <button type={type} className={buttonClasses} disabled={disabled} onClick={onClick}>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost", "danger", "success"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
}

export default Button
