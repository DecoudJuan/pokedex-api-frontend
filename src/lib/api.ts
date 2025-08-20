import axios from "axios";
import type { Ability, Pokemon, Trainer } from "./types";


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

if (!import.meta.env.DEV) console.log('API base URL =>', API_URL);


// TRAINERS

export async function listTrainers(params: {
  page?: number; limit?: number; search?: string; type?: string;
} = {}): Promise<Trainer[]> {
  const { data } = await api.get<Trainer[]>("/trainers", { params });
  return Array.isArray(data) ? data : [];
}

export async function getTrainerById(id: string): Promise<Trainer> {
  const { data } = await api.get<Trainer>(`/trainers/${id}`);
  return data;
}

export async function createTrainer(body: {
  id: string;
  name: string;
  imageUrl?: string | null;
}): Promise<Trainer> {
  const { data } = await api.post<Trainer>("/trainers", body);
  return data;
}

export async function updateTrainer(
  id: string,
  values: { name?: string; imageUrl?: string | null }
): Promise<Trainer> {
  const { data } = await api.put<Trainer>(`/trainers/${id}`, values);
  return data;
}

export async function deleteTrainer(id: string): Promise<void> {
  await api.delete(`/trainers/${id}`);
}



// POKEMONS


export async function listPokemons(params: {
  page?: number; limit?: number; search?: string; type?: string;
} = {}): Promise<Pokemon[]> {
  const { data } = await api.get<Pokemon[]>("/pokemons", { params });
  return Array.isArray(data) ? data : [];
}

export async function createPokemon(body: {
  name: string;
  type: string;
  imageUrl?: string;
}): Promise<Pokemon> {
  const { data } = await api.post("/pokemons", body);
  return data;
}

export async function deletePokemon(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/pokemons/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Error eliminando Pokémon (status ${res.status})`);
  }
}

export async function updatePokemon(
  id: string,
  data: { name?: string; type?: string; imageUrl?: string | null }
) {
  const res = await fetch(`${API_URL}/pokemons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Error actualizando (status ${res.status})`);
  }
  return res.json(); 
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


