import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder,
      className = "",
      ...props
    },
    ref // forwardRef: ref를 props처럼 전달해줌
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          px-4 py-2
          text-sm
          border border-purple-200
          rounded-lg
          bg-white
          outline-none
          transition
          focus:border-pink-400
          focus:ring-2 focus:ring-pink-200
          ${className}
        `}
        {...props}
      />
    );
  }
);

export default Input;