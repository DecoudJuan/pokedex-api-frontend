type Props = {
  name: string;
  imageUrl?: string;
  type: string;
};

export default function PokemonCard({ name, imageUrl, type }: Props) {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXdYR-FXBMWaKl4eu5o4TUuGmaH9HOxK2TQ&s";

  return (
    <div className="bg-white ring-1 ring-slate-200 rounded-xl p-3 shadow-sm hover:shadow transition">
      <div className="relative">
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
