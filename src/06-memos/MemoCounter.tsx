// Importamos un hook personalizado llamado `useCounter`
// que seguramente maneja un contador con su valor y función para incrementarlo.
import { useCounter } from "@/hooks/useCounter";
// Importamos useMemo de React, que sirve para memorizar valores calculados pesados.
import { useMemo } from "react";

// Función simulando una tarea "pesada" (consume CPU).
// Recorre un bucle hasta `iterationNumber` y mide cuánto tarda.
const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy_stuff_started"); // inicia un temporizador
  for (let index = 0; index < iterationNumber; index++) {
    console.log("ahí vamos..."); // imprime en consola en cada iteración
  }
  console.timeEnd("Heavy_stuff_started"); // termina el temporizador y muestra el tiempo en consola

  // Devuelve un string indicando cuántas iteraciones se realizaron
  return `${iterationNumber} interacciones realizadas`;
};

// Componente principal
export const MemoCounter = () => {
  // Primer contador, inicializado en 10_000 (10 mil)
  const { counter, increment } = useCounter(10_000);

  // Segundo contador, inicializado en 10
  const { counter: counter2, increment: increment2 } = useCounter(10);

  // Memoriza el resultado de heavyStuff(counter) usando useMemo.
  // ✅ Solo se recalcula cuando cambia `counter`.
  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      {/* Muestra el resultado pesado memorizado */}
      <h1 className="text-2xl font-thin text-white">
        Memo- useMemo {myHeavyValue}
      </h1>
      <hr />

      {/* Mostramos los contadores */}
      <h4>Counter: {counter}</h4>
      <h4>Counter 2: {counter2}</h4>

      {/* Botones para incrementar cada contador */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment2}
      >
        +1-counter 2
      </button>
    </div>
  );
};
