import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { StartupCard } from './components/StartupCard';
import { StatisticsDashboard } from './components/StatisticsDashboard';
import { StartupMap } from './components/StartupMap';
import { startups } from './data';
import { Search, Filter, ArrowUpDown, LayoutGrid, List, ChevronDown } from 'lucide-react';
import { SortOption, ViewMode } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const searchRef = useRef<HTMLDivElement>(null);

  const industries = Array.from(new Set(startups.map(startup => startup.industry)));

  const filteredStartups = startups
    .filter(startup => {
      const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          startup.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = !selectedIndustry || startup.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.founded - a.founded;
        case 'oldest':
          return a.founded - b.founded;
        case 'funding-high':
          const fundingA = parseInt(a.funding?.replace(/[^0-9]/g, '') || '0');
          const fundingB = parseInt(b.funding?.replace(/[^0-9]/g, '') || '0');
          return fundingB - fundingA;
        case 'funding-low':
          const fundingC = parseInt(a.funding?.replace(/[^0-9]/g, '') || '0');
          const fundingD = parseInt(b.funding?.replace(/[^0-9]/g, '') || '0');
          return fundingC - fundingD;
        case 'valuation-high':
          const valA = parseInt(a.valuation?.replace(/[^0-9]/g, '') || '0');
          const valB = parseInt(b.valuation?.replace(/[^0-9]/g, '') || '0');
          return valB - valA;
        case 'valuation-low':
          const valC = parseInt(a.valuation?.replace(/[^0-9]/g, '') || '0');
          const valD = parseInt(b.valuation?.replace(/[^0-9]/g, '') || '0');
          return valC - valD;
        default:
          return 0;
      }
    });

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 pb-20">
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={scrollToSearch}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl group"
          >
            <span>Skip to Search</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>

        <StatisticsDashboard startups={startups} />
        <StartupMap startups={startups} />

        <div ref={searchRef} className="bg-white rounded-3xl shadow-xl p-8 mb-12 animate-fade-up">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 group-focus-within:text-green-500" />
              <input
                type="text"
                placeholder="Search innovative startups..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 text-lg transition-shadow duration-200 hover:bg-gray-100 focus:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative min-w-[220px] group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 group-focus-within:text-green-500" />
              <select
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-xl appearance-none focus:ring-2 focus:ring-green-500 text-lg transition-shadow duration-200 hover:bg-gray-100 focus:bg-white"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="relative min-w-[220px] group">
              <ArrowUpDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 group-focus-within:text-green-500" />
              <select
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-xl appearance-none focus:ring-2 focus:ring-green-500 text-lg transition-shadow duration-200 hover:bg-gray-100 focus:bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="funding-high">Highest Funding</option>
                <option value="funding-low">Lowest Funding</option>
                <option value="valuation-high">Highest Valuation</option>
                <option value="valuation-low">Lowest Valuation</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
          {filteredStartups.map((startup, index) => (
            <div key={startup.id} className={`animate-fade-up`} style={{ animationDelay: `${index * 150}ms` }}>
              <StartupCard startup={startup} viewMode={viewMode} />
            </div>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center animate-fade-up">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No startups found</h3>
              <p className="text-gray-500 text-lg">
                Try adjusting your search or filter criteria to find more startups.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;