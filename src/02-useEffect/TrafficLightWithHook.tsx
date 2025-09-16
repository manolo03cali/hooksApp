import { useTrafficLight } from "../hooks/useTrafficLight";

// Componente que representa un semáforo, pero ahora usando un custom hook
export const TrafficLightWithHook = () => {
  // Desestructuramos las propiedades que devuelve el hook useTrafficLight
  // countdown   → el tiempo que queda en la luz actual
  // percentage  → porcentaje de progreso para mostrar en la barra azul
  // redLight    → clase CSS para activar/apagar la luz roja
  // yellowLight → clase CSS para activar/apagar la luz amarilla
  // greenLight  → clase CSS para activar/apagar la luz verde
  const { countdown, percentage, redLight, greenLight, yellowLight } =
    useTrafficLight();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      {/* Contenedor central del semáforo */}
      <div className="flex flex-col items-center space-y-8">
        {/* Título */}
        <h1 className="text-white text-3xl font-thin">
          Semáforo con useEffect
        </h1>

        {/* Temporizador que muestra los segundos restantes */}
        <h2 className="text-white text-xl">{countdown}</h2>

        {/* Barra de progreso que se va llenando/vaciando según el tiempo */}
        <div className="w-64 bg-gray-700 rounded-b-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            // el ancho de la barra se actualiza dinámicamente con el porcentaje
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Luces del semáforo */}
        {/* Cada div representa una luz, y el hook decide cuál se enciende */}
        <div className={`w-32 h-32 ${redLight} rounded-full`}></div>
        <div className={`w-32 h-32 ${yellowLight} rounded-full`}></div>
        <div className={`w-32 h-32 ${greenLight} rounded-full`}></div>
      </div>
    </div>
  );
};
