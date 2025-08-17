// src/lib/types.ts
export type Pokemon = {
    id: string;
    name: string;
    type: string;
    imageUrl?: string | null;
  };
  
  export type Paginated<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
  };
  
  export type Ability = {
    id: string;
    name: string;
    description?: string;
    power?: number;
  };
  