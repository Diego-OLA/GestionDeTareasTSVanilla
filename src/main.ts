import './style.css'
import {storageService} from './services/storageService.ts'
import { renderTaskList } from './components/TaskList.ts'
import type { Task } from './models/Task.ts'

 
const tasks: Task[] = storageService.getTasks()

const taskList = document.querySelector<HTMLDivElement>('#task-list')
renderTaskList(taskList!, tasks)
 


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

`


