import React from 'react';
import { Link } from 'react-router-dom';
import { Swords, Users, User, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Swords className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">PokéBattle</span>
          </Link>
          
          <div className="flex space-x-6">
            <NavLink to="/" icon={<Home />} text="Home" />
            <NavLink to="/battle" icon={<Swords />} text="Battle" />
            <NavLink to="/team-builder" icon={<Users />} text="Teams" />
            <NavLink to="/profile" icon={<User />} text="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}