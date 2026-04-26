const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle = `
    w-full
    py-3
    rounded-lg
    text-sm font-semibold
    transition
  `;

  const variants = {
    primary: `
      bg-gray-900 text-white
      hover:bg-black
    `,
    danger: `
      bg-red-500 text-white
      hover:bg-red-600
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