import TodoItem from "./TodoItem";
import TasksSum from "./TasksSum";
import AddTask from "./AddTask";

import { useFetch } from "../hooks/useFetch";

import { useEffect } from "react";

import { useSelector } from "react-redux";

export default function TodoList() {
  let items = useSelector((state: any) => state.tasks);

  // ponizej testy

  const loadedItems = useFetch("http://localhost:8080/getTasks");

  if (loadedItems !== null) {
    items = loadedItems;
  }

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
