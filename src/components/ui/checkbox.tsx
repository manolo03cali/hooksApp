import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// Radix proporciona componentes accesibles y controlados, aquí usamos su Checkbox
import { CheckIcon } from "lucide-react";
// Ícono de check (palomita) de la librería lucide-react
import { cn } from "@/lib/utils";
// cn = función para concatenar clases de forma condicional

// -----------------------------
// Componente Checkbox
// -----------------------------
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  // ✅ Toma todas las props que acepta el Checkbox de Radix (ej: checked, onCheckedChange...)
  // ✅ className se usa para añadir estilos personalizados

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox" // Marca semántica, útil en testing/estilos
      className={cn(
        // Estilos base:
        "peer border-input dark:bg-input/30",
        // Estilos cuando está checked:
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        // Estilos de accesibilidad / focus:
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Layout general:
        "size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none",
        // Estados deshabilitado:
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Se le pueden agregar estilos extras externos:
        className
      )}
      {...props} // Pasa las demás props al componente Radix
    >
      {/* Indicador del checkbox → aparece cuando está marcado */}
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {/* Icono de check (✓) */}
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
