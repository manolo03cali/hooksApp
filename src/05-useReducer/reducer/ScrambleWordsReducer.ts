// --- INTERFAZ DE ESTADO ---
// Define la "forma" del estado del juego
export interface ScrambleWordState {
  currentWord: string; // palabra actual que el jugador debe adivinar
  errorCounter: number; // número de intentos fallidos
  guess: string; // palabra escrita por el jugador
  isGameOver: boolean; // indica si el juego terminó (por errores o sin palabras)
  maxAllowErrors: number; // límite de errores permitidos
  maxSkips: number; // número máximo de saltos de palabras
  points: number; // puntaje acumulado del jugador
  scrambledWord: string; // versión revuelta de la palabra actual
  skipCounter: number; // número de palabras saltadas hasta ahora
  words: string[]; // lista de palabras restantes en el juego
  totalWords: number; // total de palabras que había al inicio
}

// --- LISTA DE PALABRAS DEL JUEGO ---
const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// --- FUNCIÓN PARA MEZCLAR UN ARREGLO ALEATORIAMENTE ---
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// --- FUNCIÓN PARA REVOLVER LAS LETRAS DE UNA PALABRA ---
const scrambleWord = (word: string = "") => {
  return word
    .split("") // divide la palabra en letras
    .sort(() => Math.random() - 0.5) // mezcla las letras de forma aleatoria
    .join(""); // vuelve a unirlas en un string
};

// --- ESTADO INICIAL DEL JUEGO ---
export const getInitialState = () => {
  const shuffledWords = shuffleArray([...GAME_WORDS]); // copia y mezcla la lista de palabras
  return {
    currentWord: shuffledWords[0], // primera palabra (la que hay que adivinar)
    errorCounter: 0, // sin errores al inicio
    guess: "", // sin intento escrito aún
    isGameOver: false, // juego no terminado
    maxAllowErrors: 3, // máximo de 3 errores permitidos
    maxSkips: 3, // máximo de 3 saltos permitidos
    points: 0, // puntaje inicial en 0
    scrambledWord: scrambleWord(shuffledWords[0]), // palabra revuelta
    skipCounter: 0, // sin saltos al inicio
    words: shuffledWords, // lista completa de palabras mezcladas
    totalWords: shuffledWords.length, // número total de palabras
  };
};

// --- TIPOS DE ACCIONES QUE ACEPTA EL REDUCER ---
export type ScrambleWordsAction =
  | { type: "SET_GUESS"; payload: string } // el jugador escribe una respuesta
  | { type: "CHECK_ANSWER" } // se valida la respuesta
  | { type: "SKIP_WORD" } // se salta la palabra actual
  | { type: "START_NEW_GAME"; payload: ScrambleWordState }; // reinicia el juego

// --- REDUCER PRINCIPAL DEL JUEGO ---
export const scrambleWordsReducer = (
  state: ScrambleWordState,
  action: ScrambleWordsAction
): ScrambleWordState => {
  switch (action.type) {
    case "SET_GUESS":
      // Guarda la respuesta del usuario en mayúsculas, eliminando espacios
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };

    case "CHECK_ANSWER":
      // Si la respuesta es correcta
      if (state.guess === state.currentWord) {
        const newWords = state.words.slice(1); // eliminamos la palabra actual
        return {
          ...state,
          words: newWords, // palabras restantes
          points: state.points + 1, // incrementa puntos
          guess: "", // limpia respuesta
          currentWord: newWords[0], // próxima palabra
          scrambledWord: scrambleWord(newWords[0]), // próxima palabra revuelta
        };
      }
      // Si la respuesta es incorrecta
      return {
        ...state,
        errorCounter: state.errorCounter + 1, // suma error
        guess: "", // limpia respuesta
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors, // termina si alcanzó el límite
      };

    case "SKIP_WORD": {
      // Si ya alcanzó el máximo de saltos, no hace nada
      if (state.skipCounter >= state.maxSkips) return state;

      const updatedWords = state.words.slice(1); // descarta la palabra actual
      return {
        ...state,
        skipCounter: state.skipCounter + 1, // incrementa el contador de skips
        words: updatedWords, // palabras restantes
        currentWord: updatedWords[0], // siguiente palabra
        scrambledWord: scrambleWord(updatedWords[0]), // revuelve la siguiente
        guess: "", // limpia respuesta
      };
    }

    case "START_NEW_GAME":
      // Reinicia el juego con un nuevo estado inicial
      // return getInitialState(); // otra opción sería generar un estado nuevo directamente
      return action.payload;

    default:
      return state;
  }
};
