import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { ReduxState } from "../types/interface";

export default function DoneList() {
  const doneList = useSelector((state: ReduxState) => state.todo.list).filter(
    (el) => el.done === true
  );
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
              <span>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
