import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import type { Pokemon } from '../types/pokemon';
import { fetchPokemonList } from '../services/pokemon';

const POKEMON_TYPES = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison',
  'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark',
  'Steel', 'Fairy'
];

interface PokedexProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
}

export default function Pokedex({ onSelectPokemon }: PokedexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [generation, setGeneration] = useState(1);

  useEffect(() => {
    loadPokemon();
  }, [generation]);

  const loadPokemon = async () => {
    setLoading(true);
    try {
      const startId = (generation - 1) * 151 + 1;
      const limit = generation === 1 ? 151 : generation === 2 ? 100 : 135;
      const pokemonList = await fetchPokemonList(startId, limit);
      setPokemon(pokemonList);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemon = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || p.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 mb-4">
          {[1, 2, 3].map((gen) => (
            <button
              key={gen}
              onClick={() => setGeneration(gen)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                generation === gen
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              Gen {gen}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              !selectedType
                ? 'bg-yellow-500 text-white'
                : 'bg-white/5 text-white/80 hover:bg-white/10'
            }`}
            onClick={() => setSelectedType(null)}
          >
            All Types
          </button>
          {POKEMON_TYPES.map(type => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === type
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPokemon.map(pokemon => (
            <button
              key={pokemon.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors text-center group"
              onClick={() => onSelectPokemon(pokemon)}
            >
              <div className="relative">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto mb-2 group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-white font-medium">#{pokemon.id} {pokemon.name}</h3>
              <div className="flex justify-center gap-2 mt-2">
                {pokemon.types.map(type => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-white/10 rounded-full text-xs"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-white/60">
                <div>HP: {pokemon.stats.hp}</div>
                <div>ATK: {pokemon.stats.attack}</div>
                <div>DEF: {pokemon.stats.defense}</div>
                <div>SPD: {pokemon.stats.speed}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}