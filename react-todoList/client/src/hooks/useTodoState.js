import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodo, createTodo, status, updateTodo, deleteTodo } from "../api/todoAPI";

// todo 리액트 쿼리 관리
export const useTodoState = () => {
  const queryClient = useQueryClient(); // 리액트쿼리 캐시를 직접 제어하는 객체

  // 조회
  const { data, isLoading } = useQuery({
    queryKey: ["todos"], // 캐싱 기준
    queryFn: getTodo, // 호출 api
  });

  // 등록
  const { mutate: addTodo } = useMutation({ // 데이터 등록
    mutationFn: createTodo, // 등록 api
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 캐시 무효화 후 재조회 리렌더링
    },
  });

  // 수정
  const { mutate: update } = useMutation({ // 데이터 등록
     mutationFn: (params) => updateTodo(params.id, params.memo), // 등록 api
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 캐시 무효화 후 재조회 리렌더링
    },
  });

  // 삭제
  const { mutate: removeTodo } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 완료 상태 변경
  // 리액트쿼리 mutate는 값을 하나만 받기 때문에 객체로 받아서 전달
  const { mutate: toggleStatus } = useMutation({ // 데이터 수정
    mutationFn: (params) => status(params.id, params.is_done), // 수정 api
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 캐시 무효화 후 재조회 리렌더링
    },
  });

  return {
    todos: data?.data || [],
    isLoading,
    addTodo,
    toggleStatus,
    update,
    removeTodo,
  };
};