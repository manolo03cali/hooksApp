// Importamos el hook experimental "use" de React, y el tipo Usable.
// "use" permite manejar valores que son promesas o recursos de Suspense directamente.
// "Usable" es un tipo que describe qué valores son "usables" por el hook.
import { use, type Usable } from "react";

// Importamos el tipo "User" desde el archivo get-user.action.ts,
// para tipar correctamente la información que recibimos de un usuario.
import { type User } from "./api/get-user.action";

// Definimos las propiedades (Props) que recibirá este componente.
// En este caso, recibe "getUser", que debe ser un valor Usable del tipo User (una promesa suspendida o un recurso de datos).
interface Props {
  getUser: Usable<User>;
}

//const userPromise = getUserAction(123); // Ejemplo comentado de cómo se podría crear una promesa de usuario.

// Definimos el componente funcional ClientInformation,
// que recibe como prop "getUser" (una promesa usable que contiene los datos del usuario).
export const ClientInformation = ({ getUser }: Props) => {
  // Usamos el hook experimental "use" para resolver el valor de "getUser".
  // Cuando la promesa se resuelva, tendremos el objeto usuario completo disponible en "user".
  const user = use(getUser);

  // const user = use(userPromise); // Ejemplo alternativo de cómo se usaría si se pasara "userPromise".
  //const user = await getUserAction(id); // Forma tradicional con async/await, pero no se usa aquí porque Suspense lo gestiona.

  //   useEffect(() => {
  //     getUserAction(id).then(console.log);
  //   }, [id]);
  // Ejemplo comentado de cómo se haría normalmente con useEffect para cargar datos sin Suspense.

  // Renderizamos la interfaz con la información del usuario ya cargada
  return (
    <div className="bg-gradient flex flex-col gap-4">
      {/* Nombre del usuario y su id */}
      <h1 className="text-4xl font-thin text-white">
        {user.name}-#{user.id}
      </h1>

      {/* Ubicación del usuario */}
      <p className="text-white text-2xl">{user.location}</p>
      {/* Rol del usuario */}
      <p className="text-white text-xl">{user.role}</p>
    </div>
  );
};
