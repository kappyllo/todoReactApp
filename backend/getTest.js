async function getData() {
  const resposne = await fetch("http://localhost:8080/getTasks");
  const data = await resposne.json();
  console.log(data);
}

getData();
