import { useEffect, useState } from "react";
import Input from "@/components/Input";

const TodoFilter = ({ filter, setFilter }) => {
  const data = ["all", "active", "completed"]

  return (
    <ul className="flex justify-between mt-6 gap-2">
      {data.map((item, index) => (
        <li className="flex-1" key={index}>
        <button className={`w-full py-2 rounded-lg border 
          ${filter === item
            ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
            : "border-gray-200 bg-white"
          }`}
          onClick={() => setFilter(item)}>
          {item === "all" ? "전체" : item === "active" ? "진행" : "완료"}
        </button>
      </li>
      ))}
{/*       
      <li className="flex-1">
        <button className="w-full py-2 rounded-lg border border-gray-200 bg-white">
          진행
        </button>
      </li>
      <li className="flex-1">
        <button className="w-full py-2 rounded-lg border border-gray-200 bg-white">
          완료
        </button>
      </li> */}
    </ul>
  );
};

export default TodoFilter;