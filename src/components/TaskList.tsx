import styles from './TaskList.module.css'
import trash from '../assets/trash.svg'
import { useState } from 'react';

interface Task {
  id: number;
  description: string;
  done: boolean;
}

interface TaskProps {
  id: number;
  description: string;
  done: boolean;
  handleOnDeleteClick: (id: number) => void;
  taskList: Task[];
  setTaskList: (taskList: Task[]) => void;
}

export function TaskList( { id, description, done, handleOnDeleteClick, taskList, setTaskList} : TaskProps) {
  const [isDone, setIsDone] = useState(done);

  function handleOnCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsDone(!isDone);

    const newTaskList = [...taskList];
    newTaskList.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    })
    setTaskList(newTaskList);
  }

  return (
    <form className={styles.form}>
      <label htmlFor={id.toString()} className={styles.container}>
        <input type="checkbox" name="tasks" id={id.toString()} checked={isDone} onChange={handleOnCheckboxChange}/>
        <p>{description}</p>
        <span className={styles.checkmark}></span>
      </label>
      <button onClick={() => {handleOnDeleteClick(id)}}>
        <img src={trash} alt="trash" />
      </button>
    </form>
  )
}