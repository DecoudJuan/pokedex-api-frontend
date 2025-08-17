import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listAbilities, listPokemonsByAbility } from "../lib/api";
import Header from "../components/Header";

export default function PokemonsByAbilityPage() {
  const [ability, setAbility] = useState("");
  const abilitiesQ = useQuery({ queryKey: ["abilities", {}], queryFn: () => listAbilities() });

  const pokesQ = useQuery({
    queryKey: ["ability-pokemons", { ability }],
    queryFn: () => listPokemonsByAbility({ ability }),
    enabled: !!ability,
  });

  useEffect(() => {
    if (!ability && abilitiesQ.data?.length) {
      setAbility(abilitiesQ.data[0].name);
    }
  }, [abilitiesQ.data, ability]);

  return (
    <div className="min-h-screen bg-red-600">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Pokémon por habilidad</h2>

          <div className="flex gap-2 mb-4">
            <select className="border rounded px-3 py-2" value={ability} onChange={(e)=>setAbility(e.target.value)}>
              {abilitiesQ.data?.map((a: any) => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>

          {pokesQ.isLoading && <div>Cargando…</div>}
          {pokesQ.isError && <div className="text-red-600">Error cargando</div>}

          {!pokesQ.isLoading && !pokesQ.isError && pokesQ.data && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pokesQ.data.map((p: any) => (
                <li key={p.id} className="bg-white ring-1 ring-slate-200 rounded-xl p-3 shadow-sm">
                  <div className="font-medium capitalize">{p.name}</div>
                  <div className="text-sm text-slate-500">{p.type}</div>
                </li>
              ))}
              {pokesQ.data.length === 0 && <div className="text-slate-600">Sin resultados</div>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
