import { useState } from "react";

const TodoList = ({ 
  data, 
  isLoading, 
  toggleStatus, 
  update,
  removeTodo,
  filter
}) => {
  // 상태 제어 함수
  const [editValue, setEditValue] = useState({}); // 입력값 {id, memo} : 해당 id의 memo만 수정해야하기 때문
  
  // filter에 해당하는 데이터 필터링
  const filteredData =
    filter === "all"
      ? data
      : filter === "active"
      ? data.filter((todo) => todo.is_done === 0)
      : data.filter((todo) => todo.is_done === 1);
  
  return (
    <ul className="mt-5 space-y-3">

      {isLoading && (
        <li className="flex items-center justify-between border-2 border-purple-200 rounded-lg px-4 py-3 bg-white">
          <div className="flex items-center gap-3 flex-1">
            <input type="checkbox" className="w-5 h-5 accent-purple-500" />
            <span className="flex-1">로딩중...</span>
          </div>
        </li>
      )}

      {!isLoading && data.length === 0 && (
        <li className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg px-4 py-6 bg-gray-50 text-gray-400">
          할 일이 없어요 💤
        </li>
      )}

      {!isLoading && data.length > 0 &&
        filteredData.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-2 border-purple-200 rounded-lg px-4 py-3 bg-white"
          >
            <div className="flex items-center gap-3 flex-1">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-purple-500" 
                checked={todo.is_done === 1}
                onChange={() =>
                  toggleStatus({
                    id: todo.id,
                    is_done: todo.is_done ? 0 : 1,
                  })
              }
              />
              <input 
                type="text" 
                className={`flex-1 ${
                  todo.is_done === 1 ? "line-through text-purple-300" : ""
                }`}
                onChange={(e) =>
                  setEditValue({ // 해당 아이디 값의 value만 수정
                    ...editValue,
                    [todo.id]: e.target.value,
                  })
                }
                defaultValue={todo.memo}
              />
                
            </div>

            <div className="flex gap-2">
              <button 
                className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                onClick={() =>
                  update({
                    id: todo.id,
                    memo: editValue[todo.id] ?? todo.memo, // 수정값 또는 기존값
                  })
                }
              >
                수정
              </button>
              <button 
                className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-500 hover:bg-red-200"
                onClick={() => removeTodo(todo.id)}
              >
                삭제
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default TodoList;