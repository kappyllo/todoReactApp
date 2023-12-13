import TodoItem from "./TodoItem";
import TasksSum from "./TasksSum";
import AddTask from "./AddTask";

import { useFetch } from "../hooks/useFetch";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { taskActions } from "../store";

export default function TodoList() {
  const dispatch = useDispatch();
  let items = useSelector((state: any) => state.tasks);

  // ponizej testy

  const loadedItems = useFetch("http://localhost:8080/getTasks");

  useEffect(() => {
    if (loadedItems !== null) {
      // items = loadedItems;
      dispatch(taskActions.loadFetchedItems(loadedItems));
      console.log(loadedItems);
    }
  }, [loadedItems]);

  // powyzej testy

  return (
    <>
      <ul>
        {items.map((item: any) => (
          <TodoItem id={item.id} key={item.id} done={item.isDone}>
            {item.name}
          </TodoItem>
        ))}
      </ul>
      <AddTask />
      <TasksSum items={items} />
    </>
  );
}
