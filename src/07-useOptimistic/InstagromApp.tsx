// Importamos hooks de React:
// - useOptimistic: permite manejar estados "optimistas" (mostrar un resultado antes de confirmarlo en el servidor).
// - useState: para manejar estado normal de React.
// - useTransition: para manejar transiciones concurrentes (ideal para actualizaciones "no urgentes").
// También importamos `toast` de sonner, una librería de notificaciones.
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

// Definimos la interfaz para los comentarios.
// Cada comentario tiene un id, un texto y un flag opcional `optimistic`
// que indica si está en estado "temporal" antes de ser confirmado.
interface Comment {
  id: number;
  text: string;
  optimistic?: boolean;
}

// Llevamos un contador de IDs para los comentarios.
let lastId = 2;

// Componente principal
export const InstagromApp = () => {
  // useTransition: nos devuelve si hay una transición en curso y la función startTransition.
  const [isPending, startTransition] = useTransition();

  // Estado normal de los comentarios confirmados
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "¡Gran foto!" },
    { id: 2, text: "Me encanta 🧡" },
  ]);

  // Estado optimista: usamos `useOptimistic` para manejar actualizaciones rápidas en UI
  // mientras esperamos la confirmación del servidor.
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments, // estado base
    (currentComments, newCommentText: string) => {
      // Esta función transforma el estado actual al nuevo estado optimista
      lastId++;
      return [
        ...currentComments,
        {
          id: lastId,
          text: newCommentText,
          optimistic: true, // lo marcamos como "optimista"
        },
      ];
    }
  );

  // Manejo de envío de formulario (nuevo comentario)
  const handleAddComment = async (formData: FormData) => {
    // Obtenemos el texto del comentario desde el formulario
    const messageText = formData.get("post-message") as string;

    // Agregamos el comentario a nivel "optimista"
    addOptimisticComment(messageText);

    // Ejecutamos la actualización en una transición (no bloquea UI)
    startTransition(async () => {
      // simular la petición http al servidor
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Aquí deberíamos actualizar el estado con el comentario real confirmado desde backend.
      // Este código está comentado porque solo simulamos el error.
      // setComments((prev) => [
      //   ...prev,
      //   {
      //     id: new Date().getTime(),
      //     text: messageText,
      //   },
      // ]);

      //! Este sería el código para revertir el proceso
      // Dejamos los comentarios igual que antes (no agregamos nada realmente)
      setComments((prev) => prev);

      // Mostramos un toast de error usando `sonner`
      toast("Error al agregar el comentario", {
        description: "Intente nuevamente",
        duration: 10_000,
        position: "top-right",
        action: {
          label: "Cerrar",
          onClick: () => toast.dismiss(),
        },
      });
    });
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
      {/* Post de ejemplo */}
      <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-[500px]">
        <img
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
          alt="Instagrom"
          className="object-cover rounded-xl mb-4"
        />
        <p className="text-black font-bold mb-4">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
      </div>

      {/* Comentarios */}
      <ul className="flex flex-col items-start justify-center bg-gray-300 w-[500px] p-4">
        {optimisticComments.map((comment) => (
          <li key={comment.id} className="flex items-center gap-2 mb-2">
            {/* Avatar circular con letra "A" */}
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-center">A</span>
            </div>
            {/* Texto del comentario */}
            <p className="text-black">{comment.text}</p>
            {/* Si el comentario es optimista, mostramos el estado "enviando..." */}
            {comment.optimistic && (
              <span className="text-gray-500 text-sm">enviando... </span>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario de comentarios */}
      {/* Al enviar, ejecuta handleAddComment */}
      <form
        action={handleAddComment}
        className="flex flex-col items-center justify-center bg-gray-300 w-[500px] rounded-b-3xl p-4"
      >
        <input
          type="text"
          name="post-message"
          placeholder="Escribe un comentario"
          required
          className="w-full p-2 rounded-md mb-2 text-black bg-white"
        />
        <button
          type="submit"
          disabled={isPending} // deshabilitado si hay transición en curso
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
