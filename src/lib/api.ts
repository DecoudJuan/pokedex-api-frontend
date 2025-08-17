import axios from "axios";
import type { Ability, Pokemon } from "./types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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
