import type { Task } from "../models/Task";

interface TaskItemProps{
    task:Task;  
    onToggle:(task:Task)=>void;
    onEdit: (task:Task)=>void;  
    onDelete:(id:string,title:string)=>void;
}

export function createTaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps): HTMLElement {
  const card = document.createElement('div');
  card.className = `task-card ${task.completed ? 'completed' : ''}`;
  card.dataset.id = task.id;

  
    if(task.priority === 'alta'){
        card.classList.add('high-priority');
    }else if(task.priority === 'media'){
        card.classList.add('medium-priority');
    }else if(task.priority === 'baja'){
        card.classList.add('low-priority');
    }

    // Renderizado del contenido interno

  card.innerHTML = `
    <div class ="item">
        
   
    <div class="task-header">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
      <span style="font-weight: bold; color:black;"> ${task.completed ? 'Completada': 'Pendiente'}</span>
      <h3 class="task-title">${escapeHtml(task.title)}</h3>
      <span class="category" >Categoria:</span>
      <span class="" > ${task.category}</span>
      <span class="category">Prioridad:</span>
      <span>${task.priority}</span>
    </div>
    
    <p class="task-description">${escapeHtml(task.description)}</p>

    <div class="task-actions">
      <button class="btn-edit" type="button">Editar</button>
      <button class="btn-delete" type="button">Eliminar</button>
    </div>
     </div>
  `;

  // Asignación de Event Listeners tipados
  const checkbox = card.querySelector<HTMLInputElement>('.task-checkbox')!;
  const editBtn = card.querySelector<HTMLButtonElement>('.btn-edit')!;
  const deleteBtn = card.querySelector<HTMLButtonElement>('.btn-delete')!;

  checkbox.addEventListener('change', () => onToggle(task));
  editBtn.addEventListener('click', () => onEdit(task));
  deleteBtn.addEventListener('click', () => onDelete(task.id, task.title));

  return card;
}

// Helper para evitar inyección de código/HTML no deseado en descripciones y títulos
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}