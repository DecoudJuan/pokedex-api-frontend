import { useEffect, useState } from "react";
import type { Pokemon } from "../lib/types";

type Props = {
  open: boolean;
  pokemon: Pokemon | null;
  onClose: () => void;
  onSubmit: (values: { name: string; type: string; imageUrl?: string | null }) => void | Promise<void>;
  submitting?: boolean;
};

export default function EditPokemonModal({ open, pokemon, onClose, onSubmit, submitting }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>("");

  useEffect(() => {
    if (open && pokemon) {
      setName(pokemon.name ?? "");
      setType(pokemon.type ?? "");
      setImageUrl(pokemon.imageUrl ?? "");
    }
  }, [open, pokemon]);

  if (!open || !pokemon) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type, imageUrl: imageUrl?.trim() || null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Editar Pokémon</h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md ring-1 ring-slate-300 px-3 py-2 outline-none focus:ring-slate-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Tipo</label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-md ring-1 ring-slate-300 px-3 py-2 outline-none focus:ring-slate-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Imagen (URL)</label>
            <input
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-md ring-1 ring-slate-300 px-3 py-2 outline-none focus:ring-slate-400"
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 ring-1 ring-slate-300 hover:bg-slate-50"
              disabled={!!submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={!!submitting}
            >
              {submitting ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
