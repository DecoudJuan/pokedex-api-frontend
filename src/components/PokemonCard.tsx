import { Trash2, Edit } from "lucide-react";

type Props = {
  id: string;
  name: string;
  imageUrl?: string;
  type: string;
  onDelete?: (id: string) => void | Promise<void>;
  onEdit?: (id: string) => void | Promise<void>;
};

export default function PokemonCard({
  id,
  name,
  imageUrl,
  type,
  onDelete,
  onEdit,
}: Props) {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXdYR-FXBMWaKl4eu5o4TUuGmaH9HOxK2TQ&s";

  const handleDelete = () => onDelete?.(id);

  return (
    <div className="bg-white ring-1 ring-slate-200 rounded-xl p-3 shadow-sm hover:shadow transition">
      <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-full object-cover"
        />

        {onEdit && (
          <button
            onClick={() => onEdit(id)}
            className="absolute left-2 top-2 rounded-md p-1 bg-white/80 backdrop-blur-sm
                       ring-1 ring-slate-300 hover:bg-blue-50 hover:text-blue-700"
            aria-label={`Editar ${name}`}
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={handleDelete}
            className="absolute right-2 top-2 rounded-md p-1 bg-white/80 backdrop-blur-sm
                       ring-1 ring-slate-300 hover:bg-red-50 hover:text-red-700"
            aria-label={`Eliminar ${name}`}
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-2 font-medium capitalize text-center">{name}</div>
      <div className="text-sm text-slate-500 text-center">{type}</div>
    </div>
  );
}
