import { useState, useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { listPokemons, deletePokemon } from "../lib/api";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import type { Pokemon } from "../lib/types";

export default function PokemonsListPage() {
  const [q, setQ] = useState("");
  const qc = useQueryClient();

  const queryKey = ["pokemons", { page: 1, limit: 12 }];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => listPokemons({ page: 1, limit: 12 }),
    placeholderData: keepPreviousData,
  });

  // Mutation para DELETE con actualización optimista
  const { mutateAsync: remove, isPending } = useMutation({
    mutationFn: (id: string) => deletePokemon(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey });
      const prev = qc.getQueryData<Pokemon[]>(queryKey);
      qc.setQueryData<Pokemon[]>(queryKey, (old = []) =>
        old.filter((p) => p.id !== id)
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKey, ctx.prev); // revertir
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey }); // revalidar server
    },
  });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const pokemons = data || [];
    if (!s) return pokemons;
    return pokemons.filter((p: Pokemon) =>
      String(p.name).toLowerCase().includes(s)
    );
  }, [data, q]);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que querés eliminar este Pokémon?")) return;
    await remove(id);
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
                />
              ))}
            </div>
          )}

          {isPending && (
            <div className="p-2 text-sm text-slate-500">Eliminando…</div>
          )}
        </div>
      </div>
    </div>
  );
}
