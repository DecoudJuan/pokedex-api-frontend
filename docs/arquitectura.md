# Arquitectura

SPA de React sin servidor propio: Vite compila a archivos estáticos y toda la lógica de datos está en el backend
([pokedex-api-backend](https://github.com/DecoudJuan/pokedex-api-backend)).

## Carpetas (`src/`)

| Ruta | Qué hay |
|---|---|
| `main.tsx` | Punto de entrada: monta la aplicación con React Router y TanStack Query. |
| `app/router.tsx` | Rutas con `createBrowserRouter`: `/`, `/pokemons`, `/pokemons/new`, `/abilities`, `/trainers`. |
| `app/queryClient.ts` | `QueryClient` con `retry: 1` y sin refetch al volver a la ventana. |
| `pages/` | Una página por ruta: `HomePage`, `PokemonsListPage`, `CreatePokemonPage`, `TrainersListPage`, `AbilitiesPage`. |
| `components/` | Piezas reutilizables: `Header`, `MenuCard`, `PokemonCard`, `TrainerCard`, `SearchBar` y los modales de edición. |
| `lib/api.ts` | Cliente `axios` y una función por endpoint (trainers, pokemons, abilities). |
| `lib/types.ts` | Tipos `Pokemon`, `Trainer`, `Ability` y `Paginated`. |

## Capa de datos

`lib/api.ts` crea una instancia de `axios` con `baseURL` tomada de `VITE_API_URL` (por defecto `http://localhost:3000`). Las páginas
usan `useQuery` para leer y `useMutation` para crear, editar y borrar.

Endpoints que consume: `GET/POST /trainers`, `GET/PUT/DELETE /trainers/:id`, `GET/POST /pokemons`, `GET/PUT/DELETE /pokemons/:id`,
`GET /pokemons/:id/abilities`, `GET /abilities` y `GET /abilities/pokemons`. Los listados de pokemons y de entrenadores aceptan
`page`, `limit`, `search` y `type`.

## Configuración

| Variable | Para qué |
|---|---|
| `VITE_API_URL` | Dirección del backend. Es pública: Vite la incluye en el bundle, así que no puede llevar secretos. |

## Estilos

Tailwind 4 se aplica con `@tailwindcss/postcss` (ver `postcss.config.js`); las pantallas usan fondo rojo y tarjetas blancas.

## Deploy

`vercel.json` reescribe toda ruta a `/` (SPA). Hay además un workflow de Azure Static Web Apps generado automáticamente. Ninguno
está activo hoy; ver la sección Deploy del [README](../README.md).
