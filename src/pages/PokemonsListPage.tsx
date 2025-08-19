import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { listPokemons, deletePokemon, updatePokemon } from "../lib/api";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import EditPokemonModal from "../components/EditPokemonModal";
import type { Pokemon } from "../lib/types";

export default function PokemonsListPage() {
  const [q, setQ] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Pokemon | null>(null);

  const qc = useQueryClient();
  const queryKey = ["pokemons", { page: 1, limit: 12 }];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => listPokemons({ page: 1, limit: 12 }),
    placeholderData: keepPreviousData,
  });

  const { mutateAsync: remove, isPending: deleting } = useMutation({
    mutationFn: (id: string) => deletePokemon(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey });
      const prev = qc.getQueryData<Pokemon[]>(queryKey);
      qc.setQueryData<Pokemon[]>(queryKey, (old = []) => old.filter((p) => p.id !== id));
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKey, ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey });
    },
  });

  const { mutateAsync: saveEdit, isPending: saving } = useMutation({
    mutationFn: (payload: { id: string; values: { name: string; type: string; imageUrl?: string | null } }) =>
      updatePokemon(payload.id, payload.values),
    onSuccess: (updated: Pokemon) => {
      qc.setQueryData<Pokemon[]>(queryKey, (old = []) =>
        old.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditOpen(false);
      setSelected(null);
    },
    onError: (e: any) => {
      alert(e?.message ?? "No se pudo actualizar");
    },
  });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const pokemons = data || [];
    if (!s) return pokemons;
    return pokemons.filter((p: Pokemon) => String(p.name).toLowerCase().includes(s));
  }, [data, q]);

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const handleEdit = (id: string) => {
    const current = (data || []).find((p) => p.id === id) || null;
    setSelected(current);
    setEditOpen(true);
  };

  const submitEdit = async (values: { name: string; type: string; imageUrl?: string | null }) => {
    if (!selected) return;
    await saveEdit({ id: selected.id, values });
  };

  return (
    <div className="min-h-screen bg-red-600">
      <Header />
      <SearchBar value={q} onChange={setQ} />

      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          {isLoading && <div className="p-6">Cargando…</div>}
          {isError && <div className="p-6 text-red-600">Error cargando</div>}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="p-6 text-slate-600">No hay pokémon.</div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((p: Pokemon) => (
                <PokemonCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  imageUrl={p.imageUrl ?? undefined}
                  type={p.type}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}

          {(deleting || saving) && (
            <div className="p-2 text-sm text-slate-500">
              {deleting ? "Eliminando…" : saving ? "Guardando cambios…" : null}
            </div>
          )}
        </div>
      </div>

      <EditPokemonModal
        open={editOpen}
        pokemon={selected}
        onClose={() => { setEditOpen(false); setSelected(null); }}
        onSubmit={submitEdit}
        submitting={saving}
      />
    </div>
  );
}
