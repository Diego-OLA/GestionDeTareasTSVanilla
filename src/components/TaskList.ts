import type { Task } from '../models/Task';
import { createTaskItem } from './TaskItem';
import { storageService } from '../services/storageService';
import { deleteDialog, dialogForm } from './TaskForm';

type TaskFilter = 'all' | 'completed' | 'pending';

export function renderTaskList(
  container: HTMLElement,
  tasks: Task[],
  currentFilter: TaskFilter = 'all'
): void {
  container.innerHTML = '';

  const filterContainer = document.createElement('div');
  filterContainer.className = 'task-filter';

  const filterLabel = document.createElement('label');
  filterLabel.textContent = 'Mostrar: ';
  filterLabel.htmlFor = 'task-filter-select';

  const filterSelect = document.createElement('select');
  filterSelect.id = 'task-filter-select';
  filterSelect.innerHTML = `
    <option value="all">Todas las tareas</option>
    <option value="pending">No completadas</option>
    <option value="completed">Completadas</option>
  `;

  filterSelect.value = currentFilter;

  filterContainer.append(filterLabel, filterSelect);
  container.appendChild(filterContainer);

  const btnNuevaTarea = document.createElement('button');
  btnNuevaTarea.id = 'btnNuevaTarea';
  btnNuevaTarea.textContent = '➕ Agregar Nueva Tarea';
  container.appendChild(btnNuevaTarea);

  const actualizarPantalla = () => {
    renderTaskList(
      container,
      storageService.getTasks(),
      currentFilter
    );
  };

  filterSelect.addEventListener('change', () => {
    const selectedFilter = filterSelect.value as TaskFilter;

    renderTaskList(
      container,
      storageService.getTasks(),
      selectedFilter
    );
  });

  btnNuevaTarea.addEventListener('click', () => {
    const modal = dialogForm(undefined, actualizarPantalla);
    modal.showModal();
  });

  const tareasFiltradas = tasks.filter((task) => {
    if (currentFilter === 'completed') {
      return task.completed;
    }

    if (currentFilter === 'pending') {
      return !task.completed;
    }

    return true;
  });

  if (tareasFiltradas.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'empty-state';
    emptyMsg.textContent = 'No hay tareas para mostrar.';
    container.appendChild(emptyMsg);
    return;
  }

  tareasFiltradas.forEach((task) => {
    const taskNode = createTaskItem({
      task,

      onToggle: (updatedTask) => {
        storageService.completed(updatedTask);
        actualizarPantalla();
      },

      onEdit: (taskToEdit) => {
        const modal = dialogForm(taskToEdit, actualizarPantalla);
        modal.showModal();
      },

      onDelete: (id, title) => {
        console.log(`Solicitar confirmación para borrar "${title}" (${id})`);

        const modal = deleteDialog(task, actualizarPantalla);
        modal.showModal();
      }
    });

    container.appendChild(taskNode);
  });
}