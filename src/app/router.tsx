import { createBrowserRouter } from "react-router-dom";
import PokemonsListPage from "../pages/PokemonsListPage";
import CreatePokemonPage from "../pages/CreatePokemonPage";
import AbilitiesPage from "../pages/AbilitiesPage";
import PokemonsByAbilityPage from "../pages/PokemonsByAbilityPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },               
  { path: "/pokemons", element: <PokemonsListPage /> },
  { path: "/pokemons/new", element: <CreatePokemonPage /> },
  { path: "/abilities", element: <AbilitiesPage /> },
  { path: "/abilities/pokemons", element: <PokemonsByAbilityPage /> },
]);
