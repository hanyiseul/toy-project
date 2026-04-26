import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/Button";

const Header = () => {
  // 전역상태관리
  const isLogin = useAuthStore((state) => state.isLogin); // 로그인 상태
  const user = useAuthStore((state) => state.user); // 유저 정보
  const logout = useAuthStore((state) => state.logout); // 로그아웃

  // 링크 이동
  const navigate = useNavigate();
  
  // 로그아웃 처리
  const handleLogout = () => {
    logout(); // 전역상태로 관리되는 로그아웃 처리
    navigate("/"); 
    console.log("store 확인:", useAuthStore.getState()); // 로그인 여부 확인
  }
  return (
    <header className="text-center mt-16">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        My To-Do List
      </h1>

      <p className="text-gray-500 mt-4 text-lg">
        {isLogin ? `${user.name}의` : "로그인 후"} 할 일을 기록하고 완료해보세요! ✨
      </p>

      <div className="mt-3 flex justify-center">
        {isLogin && (<Button
          variant="outline"
          size="sm"
          className="px-4 py-1 text-xs rounded-full border-purple-200 text-purple-500 hover:bg-purple-100"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      )}
      </div>
    </header>
  );
};

export default Header;