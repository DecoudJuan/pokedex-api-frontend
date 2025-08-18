import { useState, useMemo, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { listPokemons } from "../lib/api";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import type { Pokemon } from "../lib/types";

export default function PokemonsListPage() {
  
    const [q, setQ] = useState("");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["pokemons", { page: 1, limit: 12 }],
        queryFn: () => listPokemons({ page: 1, limit: 12 }),
        placeholderData: keepPreviousData,
    });

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        const pokemons = data || [];
        if (!s) return pokemons;
        return pokemons.filter((p: Pokemon) =>
        String(p.name).toLowerCase().includes(s)
        );
    }, [data, q]);
  

    useEffect(() => {
      console.log("DATA EN QUERY:", data);
    }, [data]);

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
                  {filtered.map((p: any) => (
                 <PokemonCard
                   key={p.id}
                   name={p.name}
                   imageUrl={p.imageUrl}
                   type={p.type}
                 />
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
      
  );
}
