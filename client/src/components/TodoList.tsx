import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { create, del, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function TodoList() {
  const list = useSelector((state: ReduxState) => state.todo.list);
  const todoList = list.filter((li) => li.done === false);

  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const nextID = useSelector((state: ReduxState) => state.todo.nextID);

  /* createTodo: 할일 추가 */
  const createTodo = async () => {
    // 1. POST /todo
    // 2. dispatch이용해서 프론트 변경

    // input value 빈값 검사 > reducer에서 컴포넌트로 변경
    // why? 백으로 요청할 때도 빈값은 보내지 않아야 하기 때문
    if (todoRef.current && todoRef.current.value.trim() !== "" && nextID) {
      // 화면 변경을 위한 dispatch
      dispatch(create({ id: nextID, text: todoRef.current.value }));
      // DB 변경을 위한 post 요청
      axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
        text: todoRef.current.value,
      });

      // input value 비우기
      todoRef.current.value = "";
      todoRef.current.focus();
    }
  };

  /* enterCreateTodo: [enter]키 눌렀을 때 할일 추가 */
  const enterCreateTodo = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") createTodo();
  };

  /* toDone: 특정 todo의 done값 변경 */
  const changeDone = async (todoId: number) => {
    // 프론트 변경을 위한 dispatch
    dispatch(done(todoId));

    // params로 todoId정보를 보내준다.
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };

  /* deleteTodo: 특정 todo 삭제 */
  const deleteTodo = async (todoId: number) => {
    // 프론트 변경
    dispatch(del(todoId));

    // params로 todoId 정보를 보내준다.
    // DB 변경을 위한 axios 요청
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };

  /* [TODO]: 내용 수정 프론트 만들기 */
  return (
    <section className="TodoList">
      <h2>오늘의 할 일</h2>
      <div>
        <input
          type="text"
          placeholder="Todo"
          ref={todoRef}
          onKeyDown={(e) => enterCreateTodo(e)}
        />
        {/* 할일 추가 버튼 */}
        <button onClick={createTodo}>할 일 추가</button>
      </div>
      {todoList.length === 0 ? (
        <p>할일이 없어요..</p>
      ) : (
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <span>{todo.text}</span>
                {/* 할일 완료 버튼 */}
                <button
                  // dispatch 함수 > changeDone 함수 내부에서 처리
                  onClick={() => changeDone(todo.id)}
                >
                  완료
                </button>

                {/* 삭제 버튼(?) */}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="trashIcon"
                  onClick={() => deleteTodo(todo.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
