
export type TaskPriority = 'baja' | 'media' | 'alta';

// Categorías predefinidas para clasificar las tareas
export type TaskCategory = 'trabajo' | 'personal' | 'estudios' | 'otro';

export interface Task {
  id: string; 
  title: string;
  description: string; 
  priority: TaskPriority; 
  category: TaskCategory; // Categoría de la tarea (trabajo, personal, estudios, otro)
  completed: boolean; // Indica si la tarea está completada o no
}


