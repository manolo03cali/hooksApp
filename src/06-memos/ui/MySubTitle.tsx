import { memo } from "react";

interface Props {
  subTitle: string; // Texto que se mostrará como subtítulo
  callMyAPI: () => void; // Función que se ejecutará al hacer click en el botón
}

// Componente funcional "MySubTitle" memorizado con React.memo
export const MySubTitle: React.FC<Props> = memo(({ subTitle, callMyAPI }) => {
  // Este console.log permite ver cuándo el componente se vuelve a renderizar
  console.log("MySubTitle re-render");

  return (
    <>
      {/* Subtítulo en pantalla */}
      <h6 className="text-2xl font-bold">{subTitle}</h6>

      {/* Botón que llama a la función pasada por props */}
      <button
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        onClick={callMyAPI}
      >
        Llamar a function
      </button>
    </>
  );
});
