import React from 'react';
import { Link } from 'react-router-dom';
import { Swords, Users, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to PokéBattle</h1>
        <p className="text-xl text-white/80">Build your team. Fight for glory. Become a champion.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <FeatureCard
          icon={<Swords className="w-12 h-12" />}
          title="Real-time Battles"
          description="Challenge trainers worldwide in dynamic Pokémon battles"
          link="/battle"
        />
        <FeatureCard
          icon={<Users className="w-12 h-12" />}
          title="Team Building"
          description="Create and customize your perfect Pokémon team"
          link="/team-builder"
        />
        <FeatureCard
          icon={<Trophy className="w-12 h-12" />}
          title="Leaderboards"
          description="Climb the ranks and prove you're the very best"
          link="/profile"
        />
      </div>

      <div className="mt-16 text-center">
        <img
          src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=1200"
          alt="Pokemon battle arena"
          className="rounded-lg shadow-2xl mx-auto mb-8"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-colors"
    >
      <div className="text-yellow-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </Link>
  );
}