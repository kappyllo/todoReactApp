import { useDispatch } from "react-redux";
import { useRef } from "react";
import { taskActions } from "../store";

export default function AddTask() {
  const dispatch = useDispatch();

  const newItemRef = useRef<HTMLInputElement>(null);

  function handleAddItem() {
    if (
      newItemRef.current !== null &&
      newItemRef.current.value.trim().length > 0
    ) {
      dispatch(taskActions.addItem(newItemRef.current?.value));
      newItemRef.current.value = "";
    }
  }

  function handleEnterClick(e: any) {
    if (
      e.charCode === 13 &&
      newItemRef.current !== null &&
      newItemRef.current.value.trim().length > 0
    ) {
      dispatch(taskActions.addItem(newItemRef.current?.value));
      newItemRef.current.value = "";
    }
  }

  return (
    <div className="flex mt-4">
      <input
        ref={newItemRef}
        className=" mr-8 bg-slate-200 rounded"
        type="text"
        onKeyPress={handleEnterClick}
      />
      <button
        onClick={handleAddItem}
        className="text-yellow-50 bg-slate-500 p-2 rounded"
      >
        Add New Task!
      </button>
    </div>
  );
}
