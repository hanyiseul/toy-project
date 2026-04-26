import Input from "../../components/Input";

const TodoForm = () => {
  
  return (
    <>
      <div className="flex gap-2">
        <Input
          className={"flex-1"}
          placeholder={"할 일을 입력하세요"} />
        <button className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90">
          + 추가
        </button>
      </div>
    </>
  );
};

export default TodoForm;