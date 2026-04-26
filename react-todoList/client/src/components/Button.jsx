const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyle = `
    rounded-lg
    font-semibold
    transition
    flex items-center justify-center
  `;

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "w-full py-3 text-sm",
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
      text-white
      hover:opacity-90
    `,
    danger: `
      bg-red-100 text-red-500
      hover:bg-red-200
    `,
    edit: `
      bg-blue-100 text-blue-600
      hover:bg-blue-200
    `,
    outline: `
      border border-gray-300
      text-gray-700
      bg-white
      hover:bg-gray-100
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;