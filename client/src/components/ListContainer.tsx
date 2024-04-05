import axios from "axios";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { init } from "../store/module/todo";

export function ListContainer() {
  async function getTodoAll() {
    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
    // console.log(res.data); //
    if (res.data) dispatch(init(res.data));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getTodoAll();
  }, []);

  return (
    <div className="ListContainer">
      <TodoList />
      <DoneList />
    </div>
  );
}
