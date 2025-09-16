import { useRef } from "react";

// Componente principal
export const FocusScreen = () => {
  // Creamos una referencia a un input. El tipo <HTMLInputElement> indica que
  // la referencia apunta específicamente a un elemento <input>.
  // Al inicio está en null porque todavía no se ha renderizado el input.
  const inputRef = useRef<HTMLInputElement>(null);

  // Función que se ejecuta cuando hacemos click en el botón
  const handleClick = () => {
    // Muestra en consola el valor actual del input (si existe)
    console.log(inputRef.current?.value);

    // Selecciona el texto que haya dentro del input
    inputRef.current?.select();

    // Si en lugar de seleccionar quieres simplemente enfocar el input,
    // se puede usar la línea comentada:
    // inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient flex flex-col gap 4">
      <h1 className="text-2xl font-thin text-white">focus Screen</h1>

      {/* Input controlado por la referencia */}
      <input
        ref={inputRef} // Conectamos la ref al input, así React sabe cuál elemento es
        type="text"
        className="bg-white text-black px-4 py-2 rounded-md"
        autoFocus // El input se enfoca automáticamente al cargar la página
      />

      {/* Botón que al hacer click ejecuta handleClick */}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        set focus
      </button>
    </div>
  );
};
