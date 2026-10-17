# CLAUDE.md

Frontend React de la Pokedex (Laboratorio 2 de la facultad). El backend es otro repo: DecoudJuan/pokedex-api-backend. Sin deploy
activo. Más detalle en [docs/arquitectura.md](docs/arquitectura.md).

## Stack
React 19, TypeScript 5.8, Vite 7, Tailwind 4 (PostCSS), TanStack Query 5, axios, React Router 7, lucide-react, ESLint 9.

## Comandos
- `npm install`: instalar.
- `npm run dev`: desarrollo con Vite.
- `npm run build`: `tsc -b && vite build`, salida en `dist/`.
- `npm run preview`: sirve el build.
- `npm run lint`: ESLint.

No hay tests. La API se configura con `VITE_API_URL` en `.env` (por defecto `http://localhost:3000`).

## Estructura
- `src/app/` router y `QueryClient`
- `src/pages/` una página por ruta (inicio, pokemons, nuevo pokemon, entrenadores, habilidades)
- `src/components/` header, tarjetas, buscador y modales de edición
- `src/lib/api.ts` todas las llamadas HTTP; `src/lib/types.ts` tipos del dominio

## Convenciones
- Toda llamada HTTP va en `lib/api.ts`; las páginas usan `useQuery` y `useMutation`, no `axios` directo.
- Los tipos de la API se definen una vez en `lib/types.ts`.
- `.env` solo lleva valores públicos (`VITE_API_URL`): Vite los incluye en el bundle.
- Textos de la interfaz en español. Sin emojis de color.

## Git
Commits y PRs sin atribución a Claude: nada de `Co-Authored-By: Claude` ni "Generated with Claude Code".
