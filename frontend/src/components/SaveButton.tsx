import { useSelector } from "react-redux";

export default function SaveButton() {
  const data = useSelector((state: any) => state.tasks);

  let classes = "text-yellow-50 bg-slate-500 p-2 px-4 rounded mt-20";

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
    } catch (err) {
      console.error("error", err);
    }
  }

  return (
    <button onClick={fetchData} className={classes}>
      Save
    </button>
  );
}

// import { useEffect, useState } from "react";

// export function useSave(url: string, data: object) {
//   const [response, setResponse] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(url, {
//           method: "PUT",
//           body: JSON.stringify(data),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         const resJson = await res.json();
//         console.log(resJson);
//         setResponse(resJson);
//       } catch (err) {
//         console.error("error", err);
//       }
//     }

//     fetchData();
//   }, [data]);
//   return response;
// }
