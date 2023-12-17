import SaveButton from "./components/SaveButton";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <main className="flex flex-col mt-20 items-center w-screen h-screen">
        <TodoList />
        <SaveButton />
      </main>
    </>
  );
}

export default App;
