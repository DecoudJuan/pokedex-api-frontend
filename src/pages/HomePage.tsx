import Header from "../components/Header";
import MenuCard from "../components/MenuCard";

import { Plus, List, Star, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-red-600">
      <Header />

      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="grid sm:grid-cols-2 gap-y-4 justify-items-center items-center ">
          
          <MenuCard
            to="/pokemons"
            icon={<List className="w-8 h-8 text-blue-600" />}
            title="Ver pokémon"
            description="Listado con filtros"
          />
          
          <MenuCard
            to="/pokemons/new"
            icon={<Plus className="w-8 h-8 text-red-600" />}
            title="Crear Pokémon"
            description="Agregar uno nuevo"
          />

          <MenuCard
            to="/abilities"
            icon={<Star className="w-8 h-8 text-yellow-500" />}
            title="Ver habilidades"
            description="Buscar por nombre"
          />



          <MenuCard
            to="/abilities/pokemons"
            icon={<Sparkles className="w-8 h-8 text-purple-600" />}
            title="Pokémon por habilidad"
            description="Separados por ability"
          />
        </div>
      </div>
    </div>
  );
}
