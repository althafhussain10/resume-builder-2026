import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto" as const,
  };
  return (
    <div ref={setNodeRef} style={style} className="relative">
      <button
        type="button"
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
        className="absolute top-1 left-1 z-20 h-9 w-9 sm:h-7 sm:w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5 sm:h-4 sm:w-4" />
      </button>
      {children}
    </div>
  );
};