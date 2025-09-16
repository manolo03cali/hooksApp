import { useEffect, useState } from "react";

// Definimos la forma que tendrá un objeto Pokémon
interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

// Props que recibirá este hook → el id del Pokémon que queremos buscar
interface Props {
  id: number;
}

// Custom Hook usePokemon
// Encapsula la lógica de obtener la información de un Pokémon desde la API
export const usePokemon = ({ id }: Props) => {
  // Estado que guarda el Pokémon actual.
  // Puede ser un objeto Pokemon o null si aún no se ha cargado.
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // Estado que indica si la petición está cargando
  const [isLoading, setisLoading] = useState(true);

  // Función asíncrona que obtiene un Pokémon por su id
  const getPokemonbyId = async (id: number) => {
    setisLoading(true); // antes de iniciar la petición, activamos el "loading"

    // Llamada a la API de PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    // Guardamos en el estado los datos que nos interesan
    setPokemon({
      id: id,
      name: data.name, // nombre del Pokémon
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`, // sprite oficial
    });

    // Cuando terminamos de cargar, desactivamos el "loading"
    setisLoading(false);
  };

  // useEffect se ejecuta cada vez que cambia el id
  // Cada vez que el usuario pida otro Pokémon, volvemos a llamar a la API
  useEffect(() => {
    getPokemonbyId(id);
  }, [id]); // dependencia → se dispara si cambia "id"

  // Retornamos los valores que podrán usar los componentes que consumen este hook
  return {
    // Propiedades
    isLoading, // estado de carga
    pokemon, // datos del Pokémon (o null si aún no se cargó)

    // Id formateado con 3 dígitos → ej: 1 → "001", 25 → "025"
    formattedId: id.toString().padStart(3, "0"),
  };
};
