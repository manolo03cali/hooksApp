// Importamos el hook experimental "use" y el tipo "JSX" desde React.
// - use: permite consumir directamente un contexto u otro recurso compatible con Suspense.
// - JSX: se usa para tipar elementos de React en las props.
import { use, type JSX } from "react";

// Importamos el contexto de usuario, que contiene información del estado de autenticación.
import { UserContext } from "../context/UserContext";

// Importamos "Navigate" de react-router, que permite redirigir a otra ruta.
import { Navigate } from "react-router";

// Definimos las propiedades (Props) que recibirá este componente.
// "element" es un componente de React que se renderizará solo si se cumplen las condiciones de acceso.
interface Props {
  element: JSX.Element;
}

// Definimos el componente PrivateRoute.
// Su propósito es proteger rutas, mostrando el contenido solo a usuarios autenticados.
export const PrivateRoute = ({ element }: Props) => {
  // Usamos el hook "use" para acceder al contexto de usuario.
  // De aquí obtenemos "authStatus", que indica el estado de autenticación.
  const { authStatus } = use(UserContext);

  // Caso 1: Si el estado de autenticación todavía está verificándose,
  // mostramos un mensaje de carga.
  if (authStatus === "checking") {
    return <div>Loading ...</div>;
  }

  // Caso 2: Si el usuario está autenticado,
  // devolvemos el elemento que se pasó como prop (la página protegida).
  if (authStatus === "authenticated") {
    return element;
  }

  // Caso 3: Si no está autenticado,
  // redirigimos al usuario hacia la página de login.
  // "replace" evita que quede un registro en el historial de navegación.
  return <Navigate to="/login" replace />;
};
