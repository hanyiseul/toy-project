const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  ref=null,
  ...props // 넘어온 나머지 속성들을 전부 전달 (확장성 막으려면 생략하고 사용할 속성들만 명시하기)
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      className={`
        w-full
        px-4 py-3
        text-sm
        border border-gray-300
        rounded-lg
        bg-white
        outline-none
        focus:border-gray-500
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;