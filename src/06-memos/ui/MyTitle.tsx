import React from "react";

interface Props {
  title: string; // Prop obligatoria: el texto que se mostrará como título
}

// Definimos el componente "MyTitle" y lo envolvemos con React.memo
export const MyTitle = React.memo(({ title }: Props) => {
  // Este console.log se ejecuta cada vez que el componente se renderiza
  console.log("MyTitle re-render");

  // El JSX que se renderiza en pantalla: un título grande (h1)
  return <h1 className="text-3xl">{title}</h1>;
});
// MyTitle es un componente optimizado con React.memo que solo se vuelve
//  a renderizar cuando cambia el title. Esto ayuda a mejorar el
//  rendimiento en aplicaciones donde los renders innecesarios pueden
//  ser costosos.
