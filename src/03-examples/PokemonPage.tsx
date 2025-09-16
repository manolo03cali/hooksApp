// Importamos dos custom hooks: uno para manejar un contador (useCounter)
// y otro para obtener datos de un Pokémon desde la API (usePokemon).
import { useCounter } from "../hooks/useCounter";
import { usePokemon } from "../hooks/usePokemon";

// Componente principal de la página de Pokémon
export const PokemonPage = () => {
  // useCounter devuelve el valor actual del contador y dos funciones:
  // decrement → resta 1 al contador
  // increment → suma 1 al contador
  const { counter, decrement, increment } = useCounter();

  // usePokemon recibe como argumento el "id" (basado en el contador).
  // Devuelve:
  // - pokemon → objeto con la información del Pokémon actual
  // - isLoading → indica si los datos aún se están cargando
  // - formattedId → id formateado (ej: 001 en lugar de 1)
  const { pokemon, isLoading, formattedId } = usePokemon({ id: counter });

  // Mientras los datos están cargando, mostramos un mensaje de "Cargando..."
  if (isLoading) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">Cargando .....</h3>
      </div>
    );
  }

  // Si no se encuentra ningún Pokémon (pokemon es null/undefined), mostramos un error.
  if (!pokemon) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">Pokemon no encontrado</h3>
      </div>
    );
  }

  // Render principal cuando ya tenemos los datos del Pokémon
  return (
    <div className="bg-gradient flex flex-col items-center">
      {/* Título */}
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>

      {/* Mostramos el número formateado + nombre */}
      <h3 className="text-xl font-bold text-white">
        #{formattedId} {pokemon?.name}
      </h3>

      {/* Imagen del Pokémon (sprite oficial de GitHub) */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${counter}.png`}
        alt={pokemon?.name}
      />

      {/* Botones para navegar entre Pokémon */}
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={decrement} // Muestra el Pokémon anterior
        >
          Anterior
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={increment} // Muestra el Pokémon siguiente
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
