import Header from "../components/Header";
import MenuCard from "../components/MenuCard";

import { List, Star, Brain } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-red-600">
      <Header />

      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="grid sm:grid-cols-2 gap-y-8 justify-items-center items-center ">
          
          <MenuCard
            to="/pokemons"
            icon={<List className="w-8 h-8 text-blue-600" />}
            title="Pokémons"
            description="Ver todos los pokémons"
          />

          <MenuCard
            to="/trainers"
            icon={<Brain className="w-8 h-8 text-purple-600" />}
            title="Entrenadores"
            description="Ver todos los entrenadores"
          />

        </div>

        <div className="grid sm:grid-cols-1 justify-items-center items-center mt-5">

          <MenuCard
            to="/abilities"
            icon={<Star className="w-8 h-8 text-yellow-500" />}
            title="Ver habilidades"
            description="Buscar por nombre"
          />
        
        </div>

      </div>
    </div>
  );
}
