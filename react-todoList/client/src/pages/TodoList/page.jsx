
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodoState } from "@/hooks/useTodoState";

const TodoPage = () => {
  const { todos, isLoading, addTodo, toggleStatus, update, removeTodo } = useTodoState(); // 리액트 쿼리 커스텀훅 연결

  return (
    <>
      <TodoForm  onAdd={addTodo}/>

      <div className="mt-5 p-4 text-center text-purple-600 font-semibold border-2 border-pink-200 rounded-lg bg-purple-50">
        ✨ 첫 할 일을 추가해보세요!
      </div>

      <TodoList data={todos} isLoading={isLoading} toggleStatus={toggleStatus} update={update} removeTodo={removeTodo}/>
    </>
  );
};

export default TodoPage;