import React from 'react';
import { Rocket, TrendingUp, Users, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
      </div>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-28">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-3.5 rounded-2xl shadow-lg">
              <Rocket className="w-8 h-8" />
            </div>
            <h1 className="text-6xl font-bold tracking-tight text-shadow">Nigerian Startups</h1>
          </div>
          <p className="text-2xl font-light text-gray-200 max-w-2xl leading-relaxed mb-12 animate-fade-in-delay">
            Discover groundbreaking startups from Nigeria that are revolutionizing industries
            and shaping the future of African innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl animate-fade-in-delay-2">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="bg-green-500/20 p-2.5 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Innovation Hub</h3>
                <p className="text-sm text-gray-400">Leading African tech ecosystem</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="bg-green-500/20 p-2.5 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Talent Pool</h3>
                <p className="text-sm text-gray-400">Exceptional tech talent</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="bg-green-500/20 p-2.5 rounded-xl">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Global Impact</h3>
                <p className="text-sm text-gray-400">International reach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};