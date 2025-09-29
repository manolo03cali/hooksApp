// Importamos RouterProvider desde react-router.
// Este componente se encarga de proveer el enrutador a toda la aplicación.
// Básicamente conecta nuestra configuración de rutas (appRouter) con la UI.
import { RouterProvider } from "react-router";

// Importamos el enrutador principal de la app (definido en app.router.ts).
// Aquí están todas las rutas y sus respectivos componentes.
import { appRouter } from "./router/app.router";

// Importamos el proveedor del contexto de usuario.
// Este se encarga de manejar el estado de autenticación y la información del usuario
// y lo comparte con cualquier componente de la aplicación que lo consuma.
import { UserContextProvider } from "./context/UserContext";

// Definimos el componente principal de la aplicación.
export const ProfessionalApp = () => {
  return (
    // UserContextProvider envuelve toda la aplicación.
    // De esta manera, cualquier componente dentro podrá acceder al estado del usuario (authStatus, datos, etc.).
    <UserContextProvider>
      {/* Contenedor principal con un fondo en gradiente (clase de Tailwind) */}
      <div className="bg-gradient ">
        {/* RouterProvider conecta el router con la UI. 
            appRouter contiene todas las rutas y componentes asociados */}
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
};
