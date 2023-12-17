import { useEffect, useState } from "react";

export function useSave(url: string, data: object) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, {
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
        setResponse(resJson);
      } catch (err) {
        console.error("error", err);
      }
    }

    fetchData();
  }, [data]);
  return response;
}
