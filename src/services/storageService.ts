import { MOCK_TASKS } from '../data/mockTasks';
import type { Task } from '../models/Task';

export const  STORAGE_KEY = 'tasks_app';

export const storageService = {
 
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      
      if (!data) {
        this.saveTasks(MOCK_TASKS);
        return MOCK_TASKS;
      }

      return JSON.parse(data) as Task[];
    } catch (error) {
      console.error('Error al leer de LocalStorage:', error);
      return MOCK_TASKS;
    }
  },
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar en LocalStorage:', error);
    }
  },

  completed(task:Task): void{
    try {
      const data = localStorage.getItem(STORAGE_KEY);

      let listaActual: Task[] = data ? JSON.parse(data)  : MOCK_TASKS;
        task.completed = !task.completed;
        
            
           listaActual = listaActual.map((t) => {
                if(t.id === task.id){
                    return task;
                }
                return t;
           })  ;
           this.saveTasks(listaActual);


    }catch (error) {
        console.error('Error al leer de LocalStorage:', error);
    }
  },




  resetToMockData(): Task[] {
    this.saveTasks(MOCK_TASKS);
    return MOCK_TASKS;
  }
};