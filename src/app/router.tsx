import { createBrowserRouter } from "react-router-dom";
import PokemonsListPage from "../pages/PokemonsListPage";
import CreatePokemonPage from "../pages/CreatePokemonPage";
import AbilitiesPage from "../pages/AbilitiesPage";
import HomePage from "../pages/HomePage";
import TrainersListPage from "../pages/TrainersListPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },               
  { path: "/pokemons", element: <PokemonsListPage /> },
  { path: "/pokemons/new", element: <CreatePokemonPage /> },
  { path: "/abilities", element: <AbilitiesPage /> },
  { path: "/trainers", element: <TrainersListPage /> },
]);
