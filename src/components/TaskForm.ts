import type {Task} from '../models/Task';
import { MOCK_TASKS } from '../data/mockTasks';
import { STORAGE_KEY } from '../services/storageService';
import { storageService } from '../services/storageService';

export function dialogForm(task?:Task,onUpdate?: () => void): HTMLDialogElement  {
    const dialog = document.querySelector<HTMLDialogElement>('#task-dialog') || document.createElement('dialog');
    dialog.className = 'task-dialog';
    dialog.innerHTML = `
        <form method="dialog" class="task-form">
            <h2>${task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <div class="form-dialog">
            <div>
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" value="${task ? task.title : ''}" required />
            </div>
            <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required>${task ? task.description : ''}</textarea>
            </div>
            <div>
            <label for="priority">Prioridad:</label>
            <select id="priority" name="priority" required>
                <option value="baja" ${task?.priority === 'baja' ? 'selected' : ''}>Baja</option>
                <option value="media" ${task?.priority === 'media' ? 'selected' : ''}>Media</option>
                <option value="alta" ${task?.priority === 'alta' ? 'selected' : ''}>Alta</option>
            </select>
            </div>
            <div>
            <label for="category">Categoría:</label>
            <select id="category" name="category" required>
                <option value="trabajo" ${task?.category === 'trabajo' ? 'selected' : ''}>Trabajo</option>
                <option value="personal" ${task?.category === 'personal' ? 'selected' : ''}>Personal</option>
                <option value="estudios" ${task?.category === 'estudios' ? 'selected' : ''}>Estudios</option>
                <option value="otro" ${task?.category === 'otro' ? 'selected' : ''}>Otro</option>
            </select>
            </div>
            <div class="form-actions">
                <button type="submit">${task ? 'Guardar Cambios' : 'Agregar Tarea'}</button>
                <button type="button" id="cancelBtn">Cancelar</button>
            </div>
            </div>
        </form>
    `;

      if (!document.body.contains(dialog)) {
        document.body.appendChild(dialog);
    }

    
    const form = dialog.querySelector('form')!;
    const cancelBtn = dialog.querySelector('#cancelBtn')!;

    
    cancelBtn.addEventListener('click', () => {
        dialog.close();
    });

      form.addEventListener('submit', (e) => {
        // Evitamos que la página se recargue por completo
        e.preventDefault();

        // Creamos un lector de datos del formulario de forma fácil
        const formData = new FormData(form);
        
      
        const data = localStorage.getItem(STORAGE_KEY);
        let listaActual: Task[] = data ? JSON.parse(data) : MOCK_TASKS;

        if (task) {
            
            listaActual = listaActual.map((t) => {
                if (t.id === task.id) {
                    return {
                        ...t, // Mantiene el id y el estado completed original
                        title: formData.get('title') as string,
                        description: formData.get('description') as string,
                        priority: formData.get('priority') as any,
                        category: formData.get('category') as any,
                    };
                }
                return t;
            });
        } else {
            
            const nuevaTarea: Task = {
                id: Date.now().toString(), // Genera un ID único con el tiempo actual
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                priority: formData.get('priority') as any,
                category: formData.get('category') as any,
                completed: false // Toda tarea nueva empieza sin terminar
            };
            listaActual.push(nuevaTarea);
        }

      
        storageService.saveTasks(listaActual);

       
        dialog.close();

         if (onUpdate) {
            onUpdate();
        }

      
    });


    return dialog;
}


export function deleteDialog(
    task: Task,
    onDelete?: () => void
): HTMLDialogElement {
    const dialog =
        document.querySelector<HTMLDialogElement>('#delete-dialog') ||
        document.createElement('dialog');

    dialog.id = 'delete-dialog';
    dialog.className = 'task-dialog';

    dialog.innerHTML = `
        <form method="dialog" class="task-form">
            <h2>Eliminar tarea</h2>
            <p>¿Deseas eliminar la tarea "${task.title}"?</p>

            <div class="form-actions">
                <button type="submit" id="confirmDelete">
                    Eliminar
                </button>
                <button type="button" id="cancelDelete">
                    Cancelar
                </button>
            </div>
        </form>
    `;

    if (!document.body.contains(dialog)) {
        document.body.appendChild(dialog);
    }

    const form = dialog.querySelector('form')!;
    const cancelButton = dialog.querySelector('#cancelDelete')!;

    cancelButton.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = localStorage.getItem(STORAGE_KEY);
        const tasks: Task[] = data ? JSON.parse(data) : MOCK_TASKS;

        const updatedTasks = tasks.filter((currentTask) => {
            return currentTask.id !== task.id;
        });

        storageService.saveTasks(updatedTasks);
        dialog.close();

        onDelete?.();
    });

    return dialog;
}
       