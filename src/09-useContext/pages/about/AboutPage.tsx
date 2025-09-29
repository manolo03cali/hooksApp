import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const AboutPage = () => {
  const { isAuthenticated, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">About Page</h1>
      <hr />
      <div className="flex flex-col gap-2">
        {/*Perfil de usuario si tiene sesión */}
        {isAuthenticated && (
          <Link
            to="/profile"
            className="hover:text-blue-500 underline text-2xl"
          >
            Ir a perfil
          </Link>
        )}

        {/*Login Logout */}
        {isAuthenticated ? (
          <Button onClick={logout} variant="destructive" className="mt-4">
            salir
          </Button>
        ) : (
          <Link to="/login" className="hover:text-blue-500 underline text-2xl">
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
};
