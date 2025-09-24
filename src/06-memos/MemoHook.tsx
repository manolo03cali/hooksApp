import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubTitle } from "./ui/MySubTitle";

// Componente principal
export const MemoHook = () => {
  // Estado para el título principal
  const [title, setTitle] = useState("Hola");

  // Estado para el subtítulo
  const [subtitle, setSubTitle] = useState("Mundo");

  // Función memorizada con useCallback:
  // - Solo se recrea cuando cambia `subtitle`.
  // - Esto evita que se cree una nueva referencia en cada render,
  //   lo cual es útil si `MySubTitle` está memorizado con React.memo.
  const handleMyAPICall = useCallback(() => {
    console.log("llamar a mi API-", subtitle);
  }, [subtitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      {/* Encabezado principal */}
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      {/* Componente de título */}
      <MyTitle title={title} />

      {/* Componente de subtítulo con función pasada como prop */}
      <MySubTitle subTitle={subtitle} callMyAPI={handleMyAPICall} />

      {/* Botón que cambia el título, concatenando un timestamp */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Cambio title " + new Date().getTime())}
      >
        Cambiar titulo
      </button>

      {/* Botón que cambia el subtítulo */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setSubTitle("Cambio subTitle ")}
      >
        Cambiar subtitulo
      </button>
    </div>
  );
};
// MyTitle es un componente optimizado con React.memo que solo se vuelve
//  a renderizar cuando cambia el title. Esto ayuda a mejorar el
//  rendimiento en aplicaciones donde los renders innecesarios pueden
//  ser costosos.
