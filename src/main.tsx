import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import { PokemonPage } from "./03-examples/PokemonPage";
//import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
//import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
//import { TrafficLight } from "./01-useState/TrafficLight";
//import { HooksApp } from "./HooksApp";
//import { FocusScreen } from "./04-useRef/FocusScreen";
//import { TasksApp } from "./05-useReducer/TaskApp";
import { ScrambleWords } from "./05-useReducer/ScrambleWords";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScrambleWords />
  </StrictMode>
);
