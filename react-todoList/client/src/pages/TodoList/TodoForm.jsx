import { useState } from "react";
import Input from "@/components/Input";

const TodoForm = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    onAdd(value); // 부모에서 mutate 연결
    setValue("");
    console.log("추가 클릭", value)
  };

  return (
    <div className="flex gap-2">
      <Input
        className="flex-1"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
      >
        추가
      </button>
    </div>
  );
};

export default TodoForm;