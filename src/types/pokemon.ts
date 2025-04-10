export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: Move[];
  sprite: string;
}

export interface Move {
  id: number;
  name: string;
  type: string;
  power: number;
  accuracy: number;
  pp: number;
  category: 'Physical' | 'Special' | 'Status';
  description: string;
}

export interface Team {
  id: string;
  userId: string;
  name: string;
  pokemon: Pokemon[];
  created_at: string;
}