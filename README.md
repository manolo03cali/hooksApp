# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Contenido abordado en este ejercicio

Dos formas de usar typeScript interface:
interface Props {
title: string;
}
export const MyTitle = ({ title }: Props) => {
console.log("MyTitle re-render");
return <h1>{title}</h1>;
};
interface Props {
subTitle: string;
}

export const MySubTitle: React.FC<Props> = ({ subTitle }) => {
return <h6>{subTitle}</h6>;
};
TailwindCSS y estilos
Uso de v0 by vercel o lovable para generar plantilla grafica
useState- Estado que re-dibuja
Tipado estricto
useEffect- Disparar efectos secundarios
Conectar varios custom hooks
useRef-Valor que no dispara re-render
shadcnUI: componentes predisenados altamente personalizables
npm install zod

Patron reducer
useReducer hook
Validadores de esquemas-zod
Efectos sobre estados
LocalStorage y SessionStorage
Condiciones de los reducers

Memorización

Hooks de memorización como:

useMemo

useCallback

useOptimistic para hacer actualizaciones en pantalla rápidas

useTransaction para evitar bloqueos de UI

Simular fallos en posteos optimistas para hacer reversiones

Nueva api Use

Componente Suspense
Para enviar notificaciones en pantalla
npx shadcn@latest add sonner

---

09-useContext y API - use

Hook useContext

Nueva API - use

Persistencia de sesiones de usuario

Rutas de la aplicación

Rutas privadas y públicas

Diseño condicional

Y más

Es una sección indispensable para comprender cómo React resuelve el problema de "Prop Drilling" o pasar los props de componente a componente hasta llegar al que necesita la información

Usamos react router v 7 modo Data
npm i react-router
