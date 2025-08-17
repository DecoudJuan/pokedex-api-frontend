import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Props = { value: string; onChange: (v: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="max-w-5xl mx-auto px-4 -mt-6">
      <div className="flex items-center gap-3">
        {/* pill */}
        <label
          htmlFor={id}
          className="flex-1 bg-white rounded-full shadow ring-1 ring-black/5 px-4 py-2 flex items-center gap-2"
        >
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search"
            className="w-full outline-none bg-transparent"
          />
        </label>

        {/* botón filtros + menú */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="shrink-0 bg-white rounded-full w-10 h-10 grid place-items-center shadow ring-1 ring-black/5"
            title="Opciones"
          >
            ☰
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow ring-1 ring-black/5 p-1 z-50"
            >
              <MenuLink to="/pokemons/new" onSelect={() => setOpen(false)}>
                Crear Pokémon
              </MenuLink>
              <MenuLink to="/abilities" onSelect={() => setOpen(false)}>
                Ver habilidades
              </MenuLink>
              <MenuLink to="/pokemons" onSelect={() => setOpen(false)}>
                Ver pokémon
              </MenuLink>
              <MenuLink
                to="/abilities/pokemons"
                onSelect={() => setOpen(false)}
              >
                Pokémon por habilidad
              </MenuLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  to,
  children,
  onSelect,
}: {
  to: string;
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onSelect}
      className="block px-3 py-2 rounded text-sm hover:bg-slate-50"
      role="menuitem"
    >
      {children}
    </Link>
  );
}
