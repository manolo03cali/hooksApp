// Definimos una interfaz llamada "User".
// Esto sirve como un contrato que describe la forma que debe tener un objeto de tipo User.
// Así se garantiza que todo "User" tenga estas propiedades con sus respectivos tipos.
export interface User {
  id: number; // Identificador único del usuario (tipo número)
  name: string; // Nombre del usuario (tipo texto)
  location: string; // Ubicación del usuario (tipo texto)
  role: string; // Rol o cargo del usuario (tipo texto)
}

// Función asíncrona que simula la obtención de un usuario desde una fuente externa (por ejemplo, API o base de datos).
// Recibe un parámetro "id" de tipo number.
export const getUserAction = async (id: number) => {
  // Muestra en consola que la función fue llamada
  console.log("Función llamada");

  // Crea una promesa artificial para simular un retraso de 2 segundos (2000 ms),
  // como si la función estuviera esperando una respuesta de un servidor.
  await new Promise((res) => setTimeout(res, 2000));

  // Una vez pasado el tiempo, muestra en consola que la función terminó la espera.
  console.log("Función resolvió");

  // Retorna un objeto que cumple con la estructura de la interfaz "User".
  // Aquí los datos son estáticos (fijos), excepto el "id" que depende del argumento recibido.
  return {
    id: id,
    name: "Manuel Quintero",
    location: "Ottawa, Canada",
    role: "Estudiante de software",
  };
};
