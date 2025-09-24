// Importamos StrictMode (modo estricto de React) y Suspense (componente para manejar cargas asíncronas).
import { StrictMode, Suspense } from "react";
// Importamos createRoot, que se usa para renderizar la aplicación en el DOM en React 18+
import { createRoot } from "react-dom/client";

//import necesario para utilizar sonner y emitir notificaciones en pantalla
//import { Toaster } from "sonner";

// Importamos los estilos globales de la aplicación.
import "./index.css";

// Las siguientes importaciones están comentadas porque son ejemplos de distintos hooks y componentes creados en el proyecto.
// Cada una se puede descomentar para probar su funcionamiento.
//import { PokemonPage } from "./03-examples/PokemonPage";
//import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
//import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
//import { TrafficLight } from "./01-useState/TrafficLight";
//import { HooksApp } from "./HooksApp";
//import { FocusScreen } from "./04-useRef/FocusScreen";
//import { TasksApp } from "./05-useReducer/TaskApp";
//import { ScrambleWords } from "./05-useReducer/ScrambleWords";
//import { MemoHook } from "./06-memos/MemoHook";
//import { MemoCounter } from "./06-memos/MemoCounter";
//import { InstagromApp } from "./07-useOptimistic/InstagromApp";

// Importamos el componente principal que se va a renderizar ahora mismo.
import { ClientInformation } from "./08-use-suspense/ClientInformation";
// Importamos la función que simula la carga de un usuario (con delay incluido).
import { getUserAction } from "./08-use-suspense/api/get-user.action";

// Creamos el punto de entrada de la aplicación, vinculándola con el elemento HTML que tiene id="root"
createRoot(document.getElementById("root")!).render(
  // StrictMode activa comprobaciones y advertencias adicionales durante el desarrollo
  <StrictMode>
    {/* <Toaster /> -> Renderizaría las notificaciones en pantalla si se habilita */}

    {/* Suspense es un componente especial de React que nos permite mostrar un "fallback"
        (pantalla de carga, spinner, mensaje, etc.) mientras se resuelven datos asíncronos */}
    <Suspense
      fallback={
        // Fallback: mientras el componente carga, mostramos un spinner con texto "Cargando..."
        <div className="bg-gradient flex flex-col gap-4">
          <div className="relative flex items-center justify-center">
            {/* Spinner animado */}
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            {/* Texto centrado sobre el spinner */}
            <p className=" absolute text-lg font-semibold">Cargando...</p>
          </div>
        </div>
      }
    >
      {/* Aquí se renderiza el componente ClientInformation, 
          pasándole como prop la promesa devuelta por getUserAction con id=1020 */}
      <ClientInformation getUser={getUserAction(1020)} />
    </Suspense>
  </StrictMode>
);
