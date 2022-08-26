import styles from './NewTaskBar.module.css'

import plus from '../assets/plus.svg'
import { FormEvent, InvalidEvent, useState } from 'react';

interface Task {
  id: number;
  description: string;
  done: boolean;
}

interface NewTaskBarProps {
  taskList: Task[];
  setTaskList: (taskList: Task[]) => void;
}

export function NewTaskBar({ taskList, setTaskList }: NewTaskBarProps) {
  const [description, setDescription] = useState('')

  function handleOnNewTask(event: FormEvent) {
    event.preventDefault()
    const newTask = {
      id: Math.random(),
      description: description,
      done: false,
    }
    setTaskList([...taskList, newTask])
    setDescription('')
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('Por favor, descreva a nova tarefa')
	}

  return (
    <form className={styles.newTaskContainer} onSubmit={handleOnNewTask}>
      <input
        name='description'
        type="text"
        placeholder="Adicione uma nova tarefa"
        className={styles.newTaskInput}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value)
          event.target.setCustomValidity('')
        }}
        onInvalid={() => handleNewTaskInvalid}
        required
      />
      <button type='submit' className={styles.newTaskButton}>
        <b>Criar</b>
        <img src={plus} alt="" />
      </button>
    </form>
  )
}