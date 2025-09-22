import { useEffect, useState } from "react";

// 🎨 Diccionario que asocia un color (red, yellow, green, blue)
// con clases de Tailwind CSS para mostrar el color y animación
const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  blue: "bg-blue-500 animate-pulse",
};

// 🔑 Se define un tipo TypeScript que solo permite
// los valores "red" | "yellow" | "green" | "blue"
type TrafficLightColor = keyof typeof colors;

// 🚦 Componente principal
export const TrafficLightWithEffect = () => {
  // Estado que guarda qué luz está encendida
  const [light, setLight] = useState<TrafficLightColor>("red");

  // Estado para el contador regresivo (inicia en 5 segundos)
  const [countdown, setCountdown] = useState(5);

  // 🕒 Efecto que maneja el temporizador (countdown)
  useEffect(() => {
    // Si el contador llegó a 0, no sigue restando
    if (countdown === 0) return;

    // Cada segundo resta 1 al contador
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Limpieza: cuando cambie `countdown` o se desmonte el componente,
    // eliminamos el intervalo para evitar fugas de memoria
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  // 🎨 Efecto que cambia de color cuando countdown llega a 0
  useEffect(() => {
    if (countdown === 0) {
      // Reinicia el temporizador a 5 segundos
      setCountdown(5);

      // Cambia el color del semáforo en orden secuencial
      if (light === "red") {
        setLight("yellow");
        return;
      }
      if (light === "yellow") {
        setLight("green");
        return;
      }
      if (light === "green") {
        setLight("red");
        return;
      }
    }
  }, [countdown, light]);

  // 🎨 Renderizado visual
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        {/* Título */}
        <h1 className="text-white text-3xl font-thin">
          Semaforo con useEffect
        </h1>

        {/* Muestra el contador */}
        <h2 className="text-white text-xl">{countdown}</h2>

        {/* Barra de progreso que se llena según el tiempo restante */}
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            // El ancho es proporcional al tiempo restante
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        {/* Luces del semáforo */}
        <div
          className={`w-32 h-32 
            ${light === "red" ? colors[light] : "bg-gray-500"}
            rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${
            light === "yellow" ? colors[light] : "bg-gray-500"
          }  rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${
            light === "green" ? colors[light] : "bg-gray-500"
          } rounded-full`}
        ></div>
      </div>
    </div>
  );
};
