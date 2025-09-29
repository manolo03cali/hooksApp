// Importamos createBrowserRouter y Navigate desde react-router.
// - createBrowserRouter: sirve para crear un router basado en el historial del navegador.
// - Navigate: permite redirigir a otra ruta.
import { createBrowserRouter, Navigate } from "react-router";

// Importamos los componentes de página que se van a usar en las rutas.
import { AboutPage } from "../pages/about/AboutPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { ProfilePage } from "../pages/profile/ProfilePage";

// Importamos un componente de ruta privada que restringe el acceso a ciertas páginas.
import { PrivateRoute } from "./PrivateRoute";

// Definimos y exportamos el enrutador principal de la aplicación.
// Aquí declaramos todas las rutas disponibles y qué componente se renderiza en cada una.
export const appRouter = createBrowserRouter([
  {
    // Ruta principal ("/")
    path: "/",
    element: <AboutPage />, // Renderiza la página "AboutPage"
  },
  {
    // Ruta hacia "/profile"
    path: "/profile",
    //element: <ProfilePage />, // Esto renderizaría directamente ProfilePage (comentado)

    // Usamos PrivateRoute para proteger la ruta.
    // De esta forma, el acceso a ProfilePage dependerá de si el usuario está autenticado.
    element: <PrivateRoute element={<ProfilePage />} />,
  },
  {
    // Ruta hacia "/login"
    path: "/login",
    element: <LoginPage />, // Renderiza la página "LoginPage"
  },
  {
    // Ruta comodín ("*") -> se activa cuando ninguna otra ruta coincide
    path: "*",
    element: <Navigate to="/" />, // Redirige automáticamente a la página principal ("/")
  },
]);
