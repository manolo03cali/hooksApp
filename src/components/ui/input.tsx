import * as React from "react";

import { cn } from "@/lib/utils";
// cn = función para concatenar clases de forma condicional (similar a clsx/classnames)

// ----------------------------
// Componente Input
// ----------------------------
function Input({
  className, // permite pasar clases extra al input
  type, // tipo de input (text, password, email, file, etc.)
  ...props // resto de props estándar de un <input> (placeholder, value, onChange, etc.)
}: React.ComponentProps<"input">) {
  // hace que acepte todas las props de un input nativo

  return (
    <input
      type={type} // define el tipo de input
      data-slot="input" // atributo útil para debug o test (slot system)
      className={cn(
        // combina clases base con las que vengan en className
        // Clases base de diseño y comportamiento:
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // Clases para focus (resaltado al enfocar):
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Clases para inputs inválidos (ej. error de validación):
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // clases personalizadas que le pasemos
        className
      )}
      {...props} // pasa todas las props restantes al input (ej. placeholder="Escribe aquí")
    />
  );
}

// ----------------------------
// Exportación
// ----------------------------
export { Input };
