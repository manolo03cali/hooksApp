// ! Importante:
// Este componente usa los componentes de la librería Shadcn/ui.
// Ver documentación: https://ui.shadcn.com/docs/installation/vite

import React, { useEffect, useReducer, useState } from "react";
// Componentes de UI de Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// Íconos de lucide-react
import { SkipForward, Play } from "lucide-react";
// Librería para lanzar confeti
import confetti from "canvas-confetti";
// Reducer y estado inicial del juego
import {
  getInitialState,
  scrambleWordsReducer,
} from "./reducer/ScrambleWordsReducer";

export const ScrambleWords = () => {
  // useReducer → maneja el estado del juego usando el reducer
  const [state, dispatch] = useReducer(scrambleWordsReducer, getInitialState());

  // Extraemos las propiedades del estado para usarlas fácilmente
  const {
    words,
    currentWord,
    scrambledWord,
    guess,
    points,
    errorCounter,
    maxAllowErrors,
    skipCounter,
    maxSkips,
    isGameOver,
    totalWords,
  } = state;

  // 🎉 Efecto para lanzar confeti cuando suben los puntos
  useEffect(() => {
    if (points === 0) return; // no lanzar confeti al inicio
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, [points]); // se ejecuta cada vez que cambia "points"

  // --- Cuando el usuario envía una adivinanza ---
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita recargar la página
    if (!guess) return; // si no hay texto, no hace nada
    dispatch({ type: "CHECK_ANSWER" }); // manda la acción al reducer
  };

  // --- Cuando el usuario salta palabra ---
  const handleSkip = () => {
    dispatch({ type: "SKIP_WORD" });
  };

  // --- Reiniciar juego ---
  const handlePlayAgain = () => {
    dispatch({ type: "START_NEW_GAME", payload: getInitialState() });
  };

  // 📌 Si ya no quedan palabras, mostramos pantalla final
  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          {/* Estadísticas finales */}
          <div>Puntaje: {points}</div>
          <div>Errores: {errorCounter}</div>
          <div>Saltos: {skipCounter}</div>
          {/* Botón para volver a jugar */}
          <Button onClick={handlePlayAgain}>Jugar de nuevo</Button>
        </div>
      </div>
    );
  }

  // 📌 Pantalla principal del juego
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* --- Título --- */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">
            Desordena las letras para encontrar la palabra!
          </p>
        </div>

        {/* --- Tarjeta principal del juego --- */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Palabra desordenada */}
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada
                {/* Si el juego terminó, muestra la respuesta correcta */}
                {isGameOver && (
                  <span className="text-red-500 text-xl"> {currentWord}</span>
                )}
              </h2>

              {/* Letras de la palabra revuelta */}
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

            {/* Input + botón para adivinar */}
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
                    dispatch({
                      type: "SET_GUESS",
                      payload: e.target.value,
                    })
                  }
                  placeholder="Ingresa tu palabra..."
                  className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                  maxLength={scrambledWord.length} // evita escribir más letras que la palabra
                  disabled={isGameOver} // se bloquea si terminó el juego
                />

                {/* Botón enviar respuesta */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  disabled={!guess.trim() || isGameOver} // se desactiva si no hay texto o si terminó
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            {/* Estadísticas del jugador */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Puntos */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {points} / {totalWords}
                </div>
                <div className="text-sm text-green-700 font-medium">Puntos</div>
              </div>
              {/* Errores */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {errorCounter}/{maxAllowErrors}
                </div>
                <div className="text-sm text-red-700 font-medium">Errores</div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3">
              {/* Saltar palabra */}
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center gap-2"
                disabled={isGameOver || skipCounter >= maxSkips} // bloquea si acabó el juego o ya no quedan saltos
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skipCounter} / {maxSkips})
              </Button>

              {/* Jugar de nuevo */}
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

        {/* Footer con palabras restantes */}
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
