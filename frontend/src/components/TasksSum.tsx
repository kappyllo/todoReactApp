interface Props {
  items: Array<any>;
}

export default function TasksSum({ items }: Props) {
  const tasksCount = items.length;
  const tasksDone = items.filter((task) => {
    return task.isDone === true;
  });

  const classes =
    tasksDone.length === tasksCount ? "text-green-950 font-bold" : undefined;

  return (
    <>
      <h2 className={"mt-5 " + classes}>
        {`${tasksDone.length < 1 ? "0" : tasksDone.length}/${tasksCount}`} tasks
        done!
      </h2>
    </>
  );
}
