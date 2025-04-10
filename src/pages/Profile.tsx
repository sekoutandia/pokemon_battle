import React from 'react';
import { Trophy } from 'lucide-react';

export default function Profile() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Trainer Profile</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Rating</span>
              <span className="font-bold">1000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Wins</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Losses</span>
              <span className="font-bold">0</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Battles</h2>
          <div className="space-y-4">
            <p className="text-white/80">No recent battles</p>
          </div>
        </div>
        
        <div className="col-span-2 bg-white/10 backdrop-blur-md rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold">Achievements</h2>
          </div>
          <p className="text-white/80">Start battling to earn achievements!</p>
        </div>
      </div>
    </div>
  );
}