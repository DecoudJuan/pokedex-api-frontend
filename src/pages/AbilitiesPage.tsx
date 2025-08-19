import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listAbilities } from "../lib/api";
import Header from "../components/Header";

export default function AbilitiesPage() {
  const [name, setName] = useState("");
  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["abilities", { name }],
    queryFn: () => listAbilities({ name }),
  });

  return (
    <div className="min-h-screen bg-red-600">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
          <div className="flex gap-2 mb-4">
            <input className="border rounded px-3 py-2 w-full" placeholder="Buscar por nombre" value={name} onChange={e=>setName(e.target.value)} />
            <button onClick={()=>refetch()} className="px-3 py-2 border rounded">Buscar</button>
          </div>

          {isLoading && <div>Cargando…</div>}
          {isError && <div className="text-red-600">Error cargando</div>}
          {!isLoading && !isError && (
            <ul className="space-y-2">
              <h1> Próximamente </h1>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
