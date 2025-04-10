import type { Pokemon, Move } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Helper function to delay requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to fetch with retry
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000 * (i + 1)); // Exponential backoff
    }
  }
  throw new Error('Failed to fetch after retries');
}

// Fetch Pokemon in batches to avoid rate limiting
async function fetchPokemonBatch(ids: number[]): Promise<Pokemon[]> {
  const results: Pokemon[] = [];
  
  for (const id of ids) {
    try {
      await delay(100); // Rate limiting delay between requests
      const response = await fetchWithRetry(`${BASE_URL}/pokemon/${id}`);
      const pokemonData = await response.json();
      
      const pokemon: Pokemon = {
        id: pokemonData.id,
        name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
        types: pokemonData.types.map((type: { type: { name: string } }) => 
          type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
        ),
        stats: {
          hp: pokemonData.stats[0].base_stat,
          attack: pokemonData.stats[1].base_stat,
          defense: pokemonData.stats[2].base_stat,
          specialAttack: pokemonData.stats[3].base_stat,
          specialDefense: pokemonData.stats[4].base_stat,
          speed: pokemonData.stats[5].base_stat
        },
        moves: await fetchPokemonMoves(pokemonData.moves.slice(0, 4)),
        sprite: pokemonData.sprites.front_default
      };
      
      results.push(pokemon);
    } catch (error) {
      console.error(`Error fetching Pokemon ${id}:`, error);
      // Continue with next Pokemon instead of failing completely
    }
  }
  
  return results;
}

export async function fetchPokemonList(startId = 1, limit = 151): Promise<Pokemon[]> {
  const ids = Array.from({ length: limit }, (_, i) => startId + i);
  const batchSize = 10;
  const batches = [];
  
  // Split ids into batches
  for (let i = 0; i < ids.length; i += batchSize) {
    batches.push(ids.slice(i, i + batchSize));
  }
  
  const results: Pokemon[] = [];
  
  // Process batches sequentially
  for (const batch of batches) {
    const batchResults = await fetchPokemonBatch(batch);
    results.push(...batchResults);
  }
  
  return results;
}

async function fetchPokemonMoves(moves: { move: { url: string } }[]): Promise<Move[]> {
  const results: Move[] = [];
  
  for (const { move } of moves) {
    try {
      await delay(100); // Rate limiting delay between requests
      const response = await fetchWithRetry(move.url);
      const moveData = await response.json();
      
      results.push({
        id: moveData.id,
        name: moveData.name.charAt(0).toUpperCase() + moveData.name.slice(1),
        type: moveData.type.name.charAt(0).toUpperCase() + moveData.type.name.slice(1),
        power: moveData.power || 0,
        accuracy: moveData.accuracy || 100,
        pp: moveData.pp,
        category: moveData.damage_class.name.charAt(0).toUpperCase() + moveData.damage_class.name.slice(1),
        description: moveData.effect_entries[0]?.effect || ''
      });
    } catch (error) {
      console.error(`Error fetching move:`, error);
      // Add a placeholder move instead of failing
      results.push({
        id: 0,
        name: 'Unknown Move',
        type: 'Normal',
        power: 0,
        accuracy: 100,
        pp: 0,
        category: 'Physical',
        description: 'Move data unavailable'
      });
    }
  }
  
  return results;
}