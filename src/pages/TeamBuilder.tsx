import React, { useState, useEffect } from 'react';
import Pokedex from '../components/Pokedex';
import { fetchPokemonList } from '../services/pokemon';
import type { Pokemon } from '../types/pokemon';
import { Users, Plus, X } from 'lucide-react';

export default function TeamBuilder() {
  const [selectedTeam, setSelectedTeam] = useState<Pokemon[]>([]);
  const [showPokedex, setShowPokedex] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddPokemon = (pokemon: Pokemon) => {
    if (selectedTeam.length < 6) {
      setSelectedTeam([...selectedTeam, pokemon]);
      setShowPokedex(false);
    }
  };

  const handleRemovePokemon = (index: number) => {
    setSelectedTeam(selectedTeam.filter((_, i) => i !== index));
  };

  const handleSaveTeam = async () => {
    if (selectedTeam.length === 0) return;
    
    try {
      // TODO: Implement team saving logic with Supabase
      console.log('Saving team:', selectedTeam);
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Team Builder</h1>
      
      <div className="space-y-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Current Team</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPokedex(true)}
                disabled={selectedTeam.length >= 6}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedTeam.length >= 6
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                <Plus className="w-5 h-5" />
                Add Pokémon
              </button>
              <button
                onClick={handleSaveTeam}
                disabled={selectedTeam.length === 0}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedTeam.length === 0
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Save Team
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array(6).fill(null).map((_, index) => {
              const pokemon = selectedTeam[index];
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg ${
                    pokemon ? 'bg-white/5' : 'bg-white/5 border-2 border-dashed border-white/10'
                  } p-4 relative`}
                >
                  {pokemon ? (
                    <>
                      <button
                        onClick={() => handleRemovePokemon(index)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={pokemon.sprite}
                        alt={pokemon.name}
                        className="w-full h-auto mb-2"
                      />
                      <h3 className="text-center font-medium">{pokemon.name}</h3>
                      <div className="flex justify-center gap-1 mt-1">
                        {pokemon.types.map(type => (
                          <span
                            key={type}
                            className="px-2 py-0.5 bg-white/10 rounded-full text-xs"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/40">
                      <Users className="w-8 h-8" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showPokedex && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-900 p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Select a Pokémon</h2>
                <button
                  onClick={() => setShowPokedex(false)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <Pokedex onSelectPokemon={handleAddPokemon} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}