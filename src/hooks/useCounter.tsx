// Custom Hook llamado useCounter

import { useState } from "react";

// Sirve para manejar un contador con funciones para aumentar o disminuir
export const useCounter = (initialValue: number = 1) => {
  // Estado "counter", que guarda el valor actual del contador.
  // Se inicializa con el valor recibido por parámetro (por defecto 1).
  const [counter, setCounter] = useState(initialValue);

  // Función para incrementar el contador en 1
  const increment = () => {
    setCounter(counter + 1);
  };

  // Función para decrementar el contador en 1
  // Si el contador es menor a 1, no hace nada (evita valores negativos).
  const decrement = () => {
    if (counter < 1) return; // condición de seguridad
    setCounter(counter - 1);
  };

  // Retornamos un objeto con:
  // - counter → el valor actual del contador
  // - increment → función para sumar
  // - decrement → función para restar
  return {
    //props
    counter,
    //methods
    increment,
    decrement,
  };
};
