import TodoForm from "./TodoForm";

const TodoPage = () => {
  
  return (
    <>
      <TodoForm />

      {/* banner */}
      <div className="mt-5 p-4 text-center text-purple-600 font-semibold border-2 border-pink-200 rounded-lg bg-purple-50">
        ✨ 첫 할 일을 추가해보세요!
      </div>

      {/* filter */}
      <ul className="flex justify-between mt-6 gap-2">
        <li className="flex-1">
          <button className="w-full py-2 rounded-lg border bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
            전체
          </button>
        </li>
        <li className="flex-1">
          <button className="w-full py-2 rounded-lg border border-gray-200 bg-white">
            진행
          </button>
        </li>
        <li className="flex-1">
          <button className="w-full py-2 rounded-lg border border-gray-200 bg-white">
            완료
          </button>
        </li>
      </ul>

      {/* todo list */}
      <ul className="mt-5 space-y-3">
        {/* 기본 상태 */}
        <li className="flex items-center justify-between border-2 border-purple-200 rounded-lg px-4 py-3 bg-white">
          
          <div className="flex items-center gap-3 flex-1">
            <input type="checkbox" className="w-5 h-5 accent-purple-500" />
            <span className="flex-1">할 일 예시입니다</span>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200">
              수정
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-500 hover:bg-red-200">
              삭제
            </button>
          </div>
        </li>

        {/* 완료 상태 */}
        <li className="flex items-center justify-between border-2 border-purple-200 rounded-lg px-4 py-3 bg-white">
          
          <div className="flex items-center gap-3 flex-1">
            <input type="checkbox" className="w-5 h-5 accent-purple-500" />
            <span className="flex-1 line-through text-purple-300">
              완료된 할 일 예시
            </span>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200">
              수정
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-500 hover:bg-red-200">
              삭제
            </button>
          </div>
        </li>
      </ul>

      {/* submit button */}
      <div className="text-center mt-6">
        <button className="px-6 py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90">
          분석하기
        </button>
      </div>
    </>
  );
};

export default TodoPage;