import { useState } from "react";

// Objeto que mapea cada color con sus clases de Tailwind CSS (color + animación)
const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  blue: "bg-blue-500 animate-pulse", // este no se usa aún, pero está definido
};

// Creamos un type que dice: la variable "light" solo puede tener como valor
// las keys del objeto colors → "red" | "yellow" | "green" | "blue"
type TrafficLightColor = keyof typeof colors;

// Componente principal
export const TrafficLight = () => {
  // Estado que guarda el color actual del semáforo. Inicia en "red".
  const [light, setLight] = useState<TrafficLightColor>("red");

  // Función que cambia el color del semáforo
  const handleColorChange = (color: TrafficLightColor) => {
    setLight((prev) => {
      console.log({ prev }); // mostramos en consola el color previo
      return color; // actualizamos el estado con el nuevo color
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      {/* Contenedor del semáforo */}
      <div className="flex flex-col items-center space-y-8">
        {/* Luz roja */}
        <div
          className={`w-32 h-32 
            ${light === "red" ? colors[light] : "bg-gray-500"} 
            rounded-full`}
        ></div>

        {/* Luz amarilla */}
        <div
          className={`w-32 h-32 
            ${light === "yellow" ? colors[light] : "bg-gray-500"} 
            rounded-full`}
        ></div>

        {/* Luz verde */}
        <div
          className={`w-32 h-32 
            ${light === "green" ? colors[light] : "bg-gray-500"} 
            rounded-full`}
        ></div>

        {/* Botones para cambiar manualmente la luz */}
        <div className="flex gap-2">
          <button
            onClick={() => handleColorChange("red")}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Rojo
          </button>
          <button
            onClick={() => handleColorChange("yellow")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Amarillo
          </button>
          <button
            onClick={() => handleColorChange("green")}
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Verde
          </button>
        </div>
      </div>
    </div>
  );
};
