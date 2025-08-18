import axios from "axios";
import type { Ability, Pokemon } from "./types";


const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:3000' : undefined);



if (!API_URL) {
  throw new Error('VITE_API_URL no está definida en producción');
}



export const api = axios.create({
  baseURL: API_URL,
});

export async function listPokemons(params: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
} = {}): Promise<Pokemon[]> {
  const { data } = await api.get("/pokemons", { params });
  return data;
}

export async function createPokemon(body: {
  name: string;
  type: string;
  imageUrl?: string;
}): Promise<Pokemon> {
  const { data } = await api.post("/pokemons", body);
  return data;
}

export async function listAbilities(params: { name?: string } = {}): Promise<Ability[]> {
  const { data } = await api.get("/abilities", { params });
  return data;
}

export async function listPokemonsByAbility(params: { ability: string }): Promise<Pokemon[]> {
  const { data } = await api.get("/abilities/pokemons", { params });
  return data;
}

export const getPokemonById = async (id: string): Promise<Pokemon> => {
  const { data } = await api.get(`/pokemons/${id}`);
  return data;
};

export const getPokemonAbilities = async (id: string): Promise<Ability[]> => {
  const { data } = await api.get(`/pokemons/${id}/abilities`);
  return data;
};
