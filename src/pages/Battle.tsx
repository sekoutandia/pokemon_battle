import React, { useState } from 'react';
import { useBattleStore } from '../store/battleStore';
import { Swords, Shield, Heart, Zap } from 'lucide-react';
import type { Pokemon, Move } from '../types/pokemon';

export default function Battle() {
  const { playerTeam, opponentTeam, currentPokemon, opponentPokemon, setCurrentPokemon, setOpponentPokemon } = useBattleStore();
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const calculateDamage = (move: Move, attacker: Pokemon, defender: Pokemon) => {
    const power = move.power;
    const attack = move.category === 'Physical' ? attacker.stats.attack : attacker.stats.specialAttack;
    const defense = move.category === 'Physical' ? defender.stats.defense : defender.stats.specialDefense;
    
    // Basic damage formula
    const damage = Math.floor((((2 * 50 / 5 + 2) * power * attack / defense) / 50 + 2) * 
      (Math.random() * (1 - 0.85) + 0.85));
    
    return Math.max(1, damage);
  };

  const handleMove = async (move: Move) => {
    if (!currentPokemon || !opponentPokemon) return;

    // Player's turn
    if (isPlayerTurn) {
      const damage = calculateDamage(move, currentPokemon, opponentPokemon);
      const newOpponentHP = Math.max(0, opponentHP - damage);
      setOpponentHP(newOpponentHP);
      setBattleLog(prev => [...prev, `${currentPokemon.name} used ${move.name}! Dealt ${damage} damage.`]);

      if (newOpponentHP <= 0) {
        setBattleLog(prev => [...prev, `${opponentPokemon.name} fainted! You won!`]);
        return;
      }

      // AI's turn
      setIsPlayerTurn(false);
      setTimeout(() => {
        const aiMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)];
        const aiDamage = calculateDamage(aiMove, opponentPokemon, currentPokemon);
        const newPlayerHP = Math.max(0, playerHP - aiDamage);
        setPlayerHP(newPlayerHP);
        setBattleLog(prev => [...prev, `${opponentPokemon.name} used ${aiMove.name}! Dealt ${aiDamage} damage.`]);

        if (newPlayerHP <= 0) {
          setBattleLog(prev => [...prev, `${currentPokemon.name} fainted! You lost!`]);
        }
        setIsPlayerTurn(true);
      }, 1000);
    }
  };

  if (!currentPokemon || !opponentPokemon) {
    return (
      <div className="text-white">
        <h1 className="text-4xl font-bold mb-8">Battle Arena</h1>
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-lg">
          <p className="text-xl mb-4">Select your Pokemon to start battling!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Battle Arena</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Player's Pokemon */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{currentPokemon.name}</h2>
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <span>{playerHP}/100</span>
            </div>
          </div>
          
          <img
            src={currentPokemon.sprite}
            alt={currentPokemon.name}
            className="w-32 h-32 mx-auto mb-4"
          />
          
          <div className="grid grid-cols-2 gap-2">
            {currentPokemon.moves.map((move) => (
              <button
                key={move.id}
                onClick={() => handleMove(move)}
                disabled={!isPlayerTurn}
                className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                  isPlayerTurn
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
              >
                {move.name}
                <div className="flex items-center gap-1 mt-1">
                  <Swords className="w-4 h-4" />
                  <span>{move.power || '-'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Opponent's Pokemon */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{opponentPokemon.name}</h2>
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <span>{opponentHP}/100</span>
            </div>
          </div>
          
          <img
            src={opponentPokemon.sprite}
            alt={opponentPokemon.name}
            className="w-32 h-32 mx-auto mb-4"
          />
          
          <div className="grid grid-cols-2 gap-2">
            {opponentPokemon.stats && (
              <>
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-red-400" />
                  <span>ATK: {opponentPokemon.stats.attack}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>DEF: {opponentPokemon.stats.defense}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>SPD: {opponentPokemon.stats.speed}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Battle Log</h3>
        <div className="h-48 overflow-y-auto space-y-2">
          {battleLog.map((log, index) => (
            <p key={index} className="text-white/80">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}