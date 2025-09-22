// ! Importante:
// Este componente usa los componentes de la librería Shadcn/ui.
// Ver documentación: https://ui.shadcn.com/docs/installation/vite

import React, { useState } from "react";
// Componentes de Shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// Íconos de lucide-react
import { SkipForward, Play } from "lucide-react";
import confetti from "canvas-confetti";

// Lista de palabras para el juego
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

// Mezcla un arreglo aleatoriamente
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Revuelve las letras de una palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("") // divide la palabra en letras
    .sort(() => Math.random() - 0.5) // las ordena aleatoriamente
    .join(""); // vuelve a unir en un string
};

export const ScrambleWords = () => {
  // Estado del juego
  const [words, setWords] = useState(shuffleArray(GAME_WORDS)); // palabras a adivinar
  const [currentWord, setCurrentWord] = useState(words[0]); // palabra actual
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(currentWord)); // palabra revuelta
  const [guess, setGuess] = useState(""); // palabra escrita por el jugador
  const [points, setPoints] = useState(0); // puntaje
  const [errorCounter, setErrorCounter] = useState(0); // errores cometidos
  const [maxAllowErrors, setMaxAllowErrors] = useState(3); // máximo de errores permitidos
  const [skipCounter, setSkipCounter] = useState(0); // número de palabras saltadas
  const [maxSkips, setMaxSkips] = useState(3); // máximo de saltos permitidos
  const [isGameOver, setIsGameOver] = useState(false); // bandera de fin de juego

  // --- Lógica cuando se envía una adivinanza ---
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita que la página recargue
    if (!guess) return; // si está vacío no hace nada

    if (guess === currentWord) {
      // Se elimina la palabra adivinada del arreglo
      const updatedWords = words.slice(1);
      //confetti
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
      });

      // Adivinó correctamente
      setPoints(points + 1);
      setWords(updatedWords);

      // Si no quedan palabras, termina el juego
      if (updatedWords.length === 0) {
        setIsGameOver(true);
      } else {
        // Si quedan palabras, se pasa a la siguiente
        setCurrentWord(updatedWords[0]);
        setScrambledWord(scrambleWord(updatedWords[0]));
      }
    } else {
      //  Adivinó mal
      const newErrors = errorCounter + 1;
      setErrorCounter(newErrors);
      if (newErrors >= maxAllowErrors) {
        setIsGameOver(true); // se acabó el juego si llega al límite de errores
      }
      setGuess("");
    }
  };

  // --- Lógica para saltar palabra ---
  const handleSkip = () => {
    if (skipCounter >= maxSkips) return;

    // Mueve la palabra actual al final del arreglo
    const updatedWords = [...words.slice(1), words[0]];
    setSkipCounter(skipCounter + 1);
    setWords(updatedWords);

    // Nueva palabra actual
    setCurrentWord(updatedWords[0]);
    setScrambledWord(scrambleWord(updatedWords[0]));
    setGuess("");
  };

  // --- Reiniciar juego ---
  const handlePlayAgain = () => {
    const newWords = shuffleArray(GAME_WORDS); // genera nuevas palabras mezcladas
    const firstWord = newWords[0]; // primera palabra de la nueva partida

    setSkipCounter(0);
    setErrorCounter(0);
    setPoints(0);
    setWords(newWords);
    setCurrentWord(firstWord);
    setScrambledWord(scrambleWord(firstWord)); // importante: actualizar también scrambledWord
    setGuess("");
    setIsGameOver(false);
  };

  //! --- Si ya no hay palabras ---
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 },
  });
  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          <div>Puntaje: {points}</div>
          <div>Errores: {errorCounter}</div>
          <div>Saltos: {skipCounter}</div>
          <Button onClick={handlePlayAgain}>Jugar de nuevo</Button>
        </div>
      </div>
    );
  }

  // --- Pantalla principal del juego ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">
            Desordena las letras para encontrar la palabra!
          </p>
        </div>

        {/* Tarjeta principal */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Palabra desordenada */}
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada
                {/* Si el juego terminó, muestra la palabra correcta */}
                {isGameOver && (
                  <span className="text-red-500 text-xl"> {currentWord}</span>
                )}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split("").map((letter, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Input para adivinar */}
            <form onSubmit={handleGuessSubmit} className="mb-6">
              <div className="space-y-4">
                <label
                  htmlFor="guess"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adivina la palabra
                </label>
                <Input
                  id="guess"
                  type="text"
                  value={guess}
                  onChange={(e) =>
                    setGuess(e.target.value.toUpperCase().trim())
                  }
                  placeholder="Ingresa tu palabra..."
                  className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                  maxLength={scrambledWord.length}
                  disabled={isGameOver}
                />

                {/* Botón para enviar respuesta */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  disabled={!guess.trim() || isGameOver}
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {points} / {GAME_WORDS.length}
                </div>
                <div className="text-sm text-green-700 font-medium">Puntos</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {errorCounter}/{maxAllowErrors}
                </div>
                <div className="text-sm text-red-700 font-medium">Errores</div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center gap-2"
                disabled={isGameOver || skipCounter >= maxSkips}
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skipCounter} / {maxSkips})
              </Button>
              <Button
                onClick={handlePlayAgain}
                variant="outline"
                className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Palabras restantes (footer) */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Desafíate con palabras desordenadas!
            <br />
            <br />
            {words.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};
