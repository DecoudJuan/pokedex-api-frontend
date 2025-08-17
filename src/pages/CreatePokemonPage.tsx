import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPokemon } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function CreatePokemonPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const nav = useNavigate();
  const qc = useQueryClient();

  const mut = useMutation({
    mutationFn: () => createPokemon({ name, type, imageUrl: imageUrl || undefined }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pokemons"] });
      nav("/pokemons"); 
    },
  });

  return (
    <div className="min-h-screen bg-red-600">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Crear Pokémon</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm">Name</label>
                <input className="w-full border rounded px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm">Type</label>
                <input className="w-full border rounded px-3 py-2" value={type} onChange={e=>setType(e.target.value)} />
              </div>
              <div>
                <label className="text-sm">Image URL (opcional)</label>
                <input className="w-full border rounded px-3 py-2" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  disabled={!name || !type || mut.isPending}
                  onClick={()=>mut.mutate()}
                  className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                >
                  {mut.isPending ? "Guardando…" : "Guardar"}
                </button>
                <button onClick={()=>nav(-1)} className="px-4 py-2 rounded border">Cancelar</button>
              </div>
            </div>
            <div>
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
                {imageUrl ? <img src={imageUrl} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="mt-2 text-sm text-slate-600">Vista previa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
