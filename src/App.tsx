import { Header } from './components/Header'
import { NewTaskBar } from './components/NewTaskBar'

import './global.css'
import styles from './App.module.css'
import { TaskList } from './components/TaskList';
import { useEffect, useState } from 'react';

import clipboard from './assets/Clipboard.png'

interface Task {
  id: number;
  description: string;
  done: boolean;
}

export function App() {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [concludedTasks, setConcludedTasks] = useState(0)

  useEffect(() => {
    let numberOfTasksConcluded = 0
    taskList.map(({done}) => {
      if (done) {
        numberOfTasksConcluded++;
      }
    })
    setConcludedTasks(numberOfTasksConcluded)
    setNumberOfTasks(taskList.length)
  }, [])

  useEffect(() => {
    setNumberOfTasks(taskList.length)
    setConcludedTasks(taskList.filter(({done}) => done).length)
    console.log(taskList)
  }, [taskList])

  function handleOnDeleteClick(id: number) {
    const newTasks = taskList.filter(({id: taskId}) => taskId !== id)
    setTaskList(newTasks)
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <NewTaskBar
          taskList={taskList}
          setTaskList={setTaskList}
        />
        <main>
          <div className={styles.progress}>
            <b>
              Tarefas criadas
              <span>{numberOfTasks}</span>
            </b>
            <b>
              Concluídas
              <span>
                {(taskList.length > 0)
                  ? (`${concludedTasks} de ${numberOfTasks}`)
                  : 0
                }
              </span>
            </b>
          </div>
          <div className={styles.tasksContainer}>
            {
              (taskList.length > 0) ? ( 
                taskList.map(task => {
                  return (
                    <TaskList
                      key={task.id}
                      id={task.id}
                      description={task.description}
                      done={task.done}
                      handleOnDeleteClick={handleOnDeleteClick}
                      taskList={taskList}
                      setTaskList={setTaskList}
                    />
                  )
                })
              ) : (
                <div className={styles.tasksContainerEmpty}>
                  <img src={clipboard} alt="" />
                  <span>
                    <b>Você ainda não tem tarefas cadastradas</b>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                  </span>
                </div>
              )
            }
          </div>
        </main>
      </div>
    </>
  )
}