import type { Task } from '../models/Task';

export let MOCK_TASKS: Task[] = [
  {
    id: '1a2b3c4d-1111',
    title: 'Diseñar la maqueta del dashboard',
    description: 'Crear los wireframes iniciales en Figma para el panel de administración.',
    priority: 'alta',
    category: 'trabajo',
    completed: false
  },
  {
    id: '2b3c4d5e-2222',
    title: 'Comprar víveres para la semana',
    description: 'Comprar frutas, verduras, leche y café en el supermercado.',
    priority: 'media',
    category: 'personal',
    completed: true
  },
  {
    id: '3c4d5e6f-3333',
    title: 'Estudiar módulos de TypeScript Avanzado',
    description: 'Repasar Generics, Utility Types y configuración estricta de tsconfig.',
    priority: 'alta',
    category: 'estudios',
    completed: false
  },
  {
    id: '4d5e6f7g-4444',
    title: 'Llevar el automóvil al taller',
    description: 'Realizar el cambio de aceite y revisión general de frenos.',
    priority: 'baja',
    category: 'otro',
    completed: false
  },
  {
    id: '5e6f7g8h-5555',
    title: 'Preparar presentación para el cliente',
    description: 'Armar las diapositivas con el avance del sprint y las métricas de rendimiento.',
    priority: 'alta',
    category: 'trabajo',
    completed: true
  },
  {
    id: '6f7g8h9i-6666',
    title: 'Organizar escritorio y cables',
    description: 'Acomodar los cables debajo del escritorio y limpiar la estación de trabajo.',
    priority: 'baja',
    category: 'personal',
    completed: false
  }
];