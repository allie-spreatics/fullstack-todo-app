import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../types/interface";
import { del } from "../store/module/todo";
import axios from "axios";

export default function DoneList() {
  const doneList = useSelector((state: ReduxState) => state.todo.list).filter(
    (el) => el.done === true
  );

  const dispatch = useDispatch();

  /* TodoList 컴포넌트와 똑같은 함수 사용,
     함수 반복이 싫다면?
    - /src/utils/todo.ts에 공통 함수 선언해서 사용해도 ok
   */
  const deleteTodo = async (todoId: number) => {
    // 프론트 변경
    dispatch(del(todoId));

    // params로 todoId 정보를 보내준다.
    // DB 변경을 위한 axios 요청
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
  };
  return (
    <section className="DoneList">
      <h2>완료한 일</h2>
      {doneList.length === 0 ? (
        <p>다한게 없어요..</p>
      ) : (
        <ul>
          {/* <li>
            <span>다한일</span>
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </li> */}
          {doneList.map((el) => (
            <li key={el.id}>
              <span>{el.text}</span>
              <span onClick={() => deleteTodo(el.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
