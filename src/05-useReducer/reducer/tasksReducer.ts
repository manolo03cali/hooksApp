import * as z from "zod";

// 🔹 Interfaz que define un TODO: tiene un id, un texto y un booleano de completado
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 🔹 Interfaz que define el estado global del reducer:
// - todos: lista de tareas
// - length: total de tareas
// - completed: total de completadas
// - pending: total de pendientes
interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// 🔹 Tipos de acciones que el reducer puede manejar
// Cada acción tiene un `type` y, en algunos casos, un `payload`
export type TaskAction =
  | { type: "ADD_TODO"; payload: string } // agrega un texto como nueva tarea
  | { type: "TOGGLE_TODO"; payload: number } // cambia el estado de completada ↔ pendiente según id
  | { type: "DELETE_TODO"; payload: number }; // elimina una tarea por id

// =============================
// 🔹 Validaciones con Zod
// =============================

// Esquema para validar una tarea
const TodoScheme = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

// Esquema para validar el estado completo
const taskStateScheme = z.object({
  todos: z.array(TodoScheme),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

// =============================
// 🔹 Estado inicial de las tareas
// =============================
export const getTasksInitialState = (): TaskState => {
  // Intentar recuperar el estado almacenado en localStorage
  const localStorageState = localStorage.getItem("tasks-state");

  // Si no hay nada en localStorage, devolver un estado vacío
  if (!localStorageState) {
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // Parsear el JSON y validarlo contra el esquema con Zod
  const result = taskStateScheme.safeParse(JSON.parse(localStorageState));

  // Si hay error (ej: manipulación manual, datos inválidos),
  // devolver un estado vacío para evitar que la app se rompa
  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // ✅ Si pasa la validación, devolvemos los datos seguros
  // OJO: aunque pasa la validación, siempre existe el riesgo de manipulación externa
  return result.data;
};

// =============================
// 🔹 Reducer de tareas
// =============================
export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    // 🟢 Acción para agregar una nueva tarea
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(), // id único basado en timestamp
        text: action.payload, // el texto viene del payload
        completed: false, // nueva tarea empieza como pendiente
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.length + 1,
        pending: state.pending + 1,
      };
    }

    // 🔴 Acción para eliminar una tarea
    case "DELETE_TODO": {
      // Filtrar la lista para eliminar el id dado
      const currentTodos = state.todos.filter(
        (todo) => todo.id != action.payload
      );

      // Calcular nuevamente cuántas están completadas y pendientes
      const completedTodos = currentTodos.filter(
        (todo) => todo.completed
      ).length;
      const pendingTodos = currentTodos.length - completedTodos;

      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        completed: completedTodos,
        pending: pendingTodos,
      };
    }

    // 🔄 Acción para alternar el estado de una tarea (completada ↔ pendiente)
    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed }; // invertir estado
        }
        return todo;
      });

      // Recalcular métricas
      const completedTodos = updatedTodos.filter(
        (todo) => todo.completed
      ).length;
      const pendingTodos = updatedTodos.length - completedTodos;

      return {
        ...state,
        todos: updatedTodos,
        completed: completedTodos,
        pending: pendingTodos,
      };
    }

    // 🚨 Si la acción no coincide con ningún case, devolvemos el estado tal cual
    default:
      return state;
  }

  // Nota: este return es redundante, nunca se ejecutará por el `switch`
  return state;
};
