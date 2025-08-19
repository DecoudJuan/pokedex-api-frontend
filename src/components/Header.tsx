import { Link } from "react-router-dom";
import pokedexIcon from "../assets/pokedex.png";


export default function Header() {
    return (
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-3 mb-10 pt-5">
          <Link to="/" className="flex item-center gap-2">
            <img src={pokedexIcon} alt="Pokédex Icon" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-white">Pokédex</h1>
          </Link>
        </div>
    );
  }
  