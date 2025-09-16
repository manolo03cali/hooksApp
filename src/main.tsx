import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FocusScreen } from "./04-useRef/FocusScreen";
//import { PokemonPage } from "./03-examples/PokemonPage";
//import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
//import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
//import { TrafficLight } from "./01-useState/TrafficLight";
//import { HooksApp } from "./HooksApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FocusScreen />
  </StrictMode>
);
