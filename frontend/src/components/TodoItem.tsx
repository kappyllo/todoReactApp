import { useState } from "react";
import doneIcon from "/done-icon.svg";
import notDoneYetIcon from "/not-done-yet.svg";

import { taskActions } from "../store";
import { useDispatch } from "react-redux";

interface Props {
  done: boolean;
  children: any;
  id: number;
}

export default function TodoItemFC({ children, done, id }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  function handleHoverIn() {
    setIsHovered(true);
  }

  function handleHoverOut() {
    setIsHovered(false);
  }

  function handleDeleteItem() {
    dispatch(taskActions.removeItem(id));
  }

  function toggleTask() {
    dispatch(taskActions.toggleDone(id));
  }

  let classes = done ? undefined : "text-slate-400";

  const icon = done ? doneIcon : notDoneYetIcon;

  return (
    <div className="flex justify-between gap-16">
      <div onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
        <li className={done ? "text-3xl line-through" : "text-3xl"}>
          {children}
        </li>
        <button
          onClick={handleDeleteItem}
          className={`text-slate-400 ${!isHovered ? "invisible" : undefined}`}
        >
          Delete
        </button>
      </div>
      <button className="ml-20 mb-5" onClick={toggleTask}>
        <img className={classes} src={icon} alt="" />
      </button>
    </div>
  );
}
