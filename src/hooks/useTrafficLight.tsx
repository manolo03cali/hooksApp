import { useEffect, useState } from "react";

// Definimos un objeto que contiene los colores del semáforo
// Cada color tiene una clase CSS de Tailwind (color + animación pulse)
const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  blue: "bg-blue-500 animate-pulse", // no se usa aún, pero está preparado
};

// El tipo TrafficLightColor solo puede ser una de las claves de "colors"
// Es decir: "red" | "yellow" | "green" | "blue"
type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
  // Estado que guarda el color actual de la luz
  const [light, setLight] = useState<TrafficLightColor>("red");

  // Estado que lleva la cuenta regresiva (inicialmente 5 segundos)
  const [countdown, setCountdown] = useState(5);

  // ⏳ useEffect que controla la cuenta regresiva
  useEffect(() => {
    // Si el contador llega a 0, no hacemos nada más aquí
    if (countdown === 0) return;

    // Creamos un intervalo que resta 1 cada segundo
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Limpiamos el intervalo cuando el componente se desmonta
    // o cuando se vuelva a ejecutar este efecto
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]); // este efecto depende del contador

  // 🚦 useEffect que controla el cambio de color del semáforo
  useEffect(() => {
    // Si aún queda tiempo en el countdown, no cambiamos color
    if (countdown > 0) return;

    // Reiniciamos el contador a 5 segundos
    setCountdown(5);

    // Cambiamos la luz según el color actual
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
  }, [countdown, light]); // depende tanto del countdown como del color actual

  return {
    // 🔹 Propiedades
    countdown, // segundos que quedan antes de cambiar de color
    colors, // el mapa de colores CSS

    // 🔹 Valores calculados
    percentage: (countdown / 5) * 100, // % restante del tiempo (para una barra o círculo de progreso)

    // Clases dinámicas según el color actual
    redLight: light === "red" ? colors.red : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
    greenLight: light === "green" ? colors.green : "bg-gray-500",

    // 🔹 Aquí podrías agregar acciones (ej: reset, skip, pause)
  };
};
