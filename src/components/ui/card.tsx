import * as React from "react";
import { cn } from "@/lib/utils";
// cn = función utilitaria para combinar clases condicionalmente (similar a clsx)

// -----------------------------
// Card (contenedor principal)
// -----------------------------
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card" // marca semántica para identificar el slot (útil en test/estilos)
      className={cn(
        // Estilos base:
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        // Se pueden sobrescribir/agregar clases personalizadas
        className
      )}
      {...props} // pasa el resto de props (ej. id, onClick, etc.)
    />
  );
}

// -----------------------------
// CardHeader (parte superior)
// -----------------------------
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Usa grid para organizar el título y una acción a la derecha si existe
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

// -----------------------------
// CardTitle (título principal)
// -----------------------------
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

// -----------------------------
// CardDescription (subtítulo o texto secundario)
// -----------------------------
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// -----------------------------
// CardAction (acciones, ej: botón cerrar o menú)
// -----------------------------
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        // Se posiciona arriba a la derecha del header
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

// -----------------------------
// CardContent (contenido principal)
// -----------------------------
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

// -----------------------------
// CardFooter (parte inferior)
// -----------------------------
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        // Footer alineado con padding y soporte para borde superior
        "flex items-center px-6 [.border-t]:pt-6",
        className
      )}
      {...props}
    />
  );
}

// Exporta todos los componentes para usarlos como piezas sueltas
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
