<!-- repo-check: sin-deploy -->
# Pokedex API · Frontend

Frontend en React de la Pokedex: lista, busca, crea, edita y borra pokemons y entrenadores, y consulta habilidades. Es el
Laboratorio 2 de la facultad; el backend vive en otro repo, [DecoudJuan/pokedex-api-backend](https://github.com/DecoudJuan/pokedex-api-backend).

Estado: trabajo práctico. Estuvo publicado en Vercel (`https://pokedex-api-app.vercel.app`) y hoy está dado de baja, así que ese link
ya no responde.

## Qué hace

- **Inicio**: menú con acceso a pokemons, entrenadores y habilidades.
- **Pokemons** (`/pokemons`): listado con búsqueda y filtro por tipo, edición en un modal y borrado.
- **Nuevo pokemon** (`/pokemons/new`): formulario de alta.
- **Entrenadores** (`/trainers`): listado, edición en un modal y borrado.
- **Habilidades** (`/abilities`): búsqueda de habilidades por nombre.

Todo habla con la API REST del backend por `axios`, y TanStack Query se encarga del cache y de refrescar las listas después de crear,
editar o borrar.

## Stack

- React 19, TypeScript 5.8 y Vite 7.
- Tailwind CSS 4 (vía PostCSS) e iconos de `lucide-react`.
- TanStack Query 5 para el estado del servidor, `axios` para HTTP y React Router 7 para las rutas.
- ESLint 9 con `typescript-eslint`.
- Node 20.19 o superior (lo pide Vite 7).

## Cómo correrlo en local

Hace falta tener el [backend](https://github.com/DecoudJuan/pokedex-api-backend) corriendo (por defecto en `http://localhost:3000`).

```bash
git clone https://github.com/DecoudJuan/pokedex-api-frontend.git
cd pokedex-api-frontend
npm install
npm run dev        # servidor de desarrollo de Vite
```

La dirección de la API sale de la variable `VITE_API_URL` (archivo `.env`); si no está definida usa `http://localhost:3000`.
Otros comandos: `npm run build` (`tsc -b && vite build`, genera `dist/`), `npm run preview` y `npm run lint`.

## Deploy

No tiene deploy activo: es un trabajo práctico y la publicación en Vercel se dio de baja (esa URL hoy da 404). Por eso este
README lleva la marca `sin-deploy`.

Lo que quedó configurado en el repo:

- `vercel.json` reescribe toda ruta a `/` para que React Router funcione al recargar una dirección interna.
- `.github/workflows/azure-static-web-apps-*.yml` es un workflow de Azure Static Web Apps generado automáticamente: en cada push
  a `main` intenta publicar. Declara `output_location: "build"` y Vite genera `dist/`, así que habría que corregirlo antes de usarlo.

Si se vuelve a publicar en Vercel, hay que definir `VITE_API_URL` con la dirección pública del backend.

## Documentos

- [Arquitectura](docs/arquitectura.md): carpetas, rutas, capa de datos y variables de entorno.
- [CLAUDE.md](CLAUDE.md): comandos, estructura y convenciones para trabajar en el repo.
- [Backend](https://github.com/DecoudJuan/pokedex-api-backend): la API que consume este frontend.

## Licencia

MIT, ver [LICENSE](LICENSE).
