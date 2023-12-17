import { useSave } from "../hooks/useSave";
import { useSelector } from "react-redux";

export default function SaveButton() {
  const data = useSelector((state: any) => state.tasks);

  const response = useSave("http://localhost:8080/save", data);
  console.log(response);

  return (
    <button className="text-yellow-50 bg-slate-500 p-2 px-4 rounded mt-20">
      Save
    </button>
  );
}
