import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-3 mb-10 pt-5">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">Pokédex</h1>
          </Link>
        </div>
    );
  }
  