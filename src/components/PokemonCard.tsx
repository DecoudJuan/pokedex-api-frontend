type Props = {
  id: string;
  name: string;
  imageUrl?: string;
  type: string;
  onDelete?: (id: string) => void | Promise<void>;
};

export default function PokemonCard({ id, name, imageUrl, type, onDelete }: Props) {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXdYR-FXBMWaKl4eu5o4TUuGmaH9HOxK2TQ&s";

  const handleDelete = () => onDelete?.(id);

  return (
    <div className="relative bg-white ring-1 ring-slate-200 rounded-xl p-3 shadow-sm hover:shadow transition">


      <div className="relative">

      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs ring-1 ring-slate-300 hover:bg-red-50 hover:text-red-700"
          aria-label={`Eliminar ${name}`}
          title="Eliminar"
        >
          Eliminar
        </button>
      )}
      
        <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
          <img
            src={imageUrl || defaultImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-2 font-medium capitalize text-center">{name}</div>
      <div className="text-sm text-slate-500 text-center">{type}</div>
    </div>
  );
}