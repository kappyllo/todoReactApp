import { useSelector } from "react-redux";
import { useState } from "react";

export default function SaveButton() {
  const data = useSelector((state: any) => state.tasks);

  const [classes, setClasses] = useState(
    "text-yellow-50 bg-slate-500 p-2 px-4 rounded mt-20"
  );

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:8080/save", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setClasses("text-yellow-50 bg-green-500 p-2 px-4 rounded mt-20");
      }
    } catch (err) {
      setClasses("text-yellow-50 bg-red-500 p-2 px-4 rounded mt-20");
      console.error("error", err);
    }
  }

  return (
    <button onClick={fetchData} className={classes}>
      Save
    </button>
  );
}
