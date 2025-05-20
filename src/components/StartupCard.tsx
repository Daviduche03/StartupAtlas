import React, { useState } from 'react';
import { ExternalLink, MapPin, Calendar, TrendingUp, Users, Twitter, Linkedin, ChevronDown, ChevronUp, DollarSign, Users2 } from 'lucide-react';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
  viewMode: 'grid' | 'list';
}

export const StartupCard: React.FC<StartupCardProps> = ({ startup, viewMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shareUrl = startup.website;
  const shareTitle = `Check out ${startup.name} - ${startup.description}`;

  const cardClass = viewMode === 'grid' 
    ? "group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
    : "group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex";

  const imageClass = viewMode === 'grid'
    ? "relative h-64 overflow-hidden"
    : "relative h-full w-80 overflow-hidden";

  return (
    <div className={cardClass}>
      <div className={imageClass}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10"></div>
        <img 
          src={startup.logo} 
          alt={`${startup.name} logo`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl hover:bg-white/20 transition-colors duration-300">
              <Twitter className="w-5 h-5 text-white" />
            </div>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl hover:bg-white/20 transition-colors duration-300">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
          </LinkedinShareButton>
          <a 
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl hover:bg-white/20 transition-colors duration-300"
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </a>
        </div>
        {viewMode === 'grid' && (
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
              {startup.name}
            </h3>
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg">
              {startup.industry}
            </span>
          </div>
        )}
      </div>
      <div className={`p-7 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        {viewMode === 'list' && (
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{startup.name}</h3>
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg">
                {startup.industry}
              </span>
            </div>
          </div>
        )}

        <p className="text-gray-600 text-lg leading-relaxed">{startup.description}</p>
        
        <div className="mt-7 flex flex-wrap items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Founded {startup.founded}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{startup.location}</span>
          </div>
          {startup.employees && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{startup.employees} employees</span>
            </div>
          )}
        </div>

        <div className="mt-7 pt-7 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          {startup.funding && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <TrendingUp className="w-5 h-5" />
                <span>Total Funding</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                {startup.funding}
              </span>
            </div>
          )}
          {startup.valuation && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <DollarSign className="w-5 h-5" />
                <span>Valuation</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                {startup.valuation}
              </span>
            </div>
          )}
        </div>

        {(startup.founders || startup.highlights || startup.investors) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-7 pt-7 border-t border-gray-100 w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {isExpanded && (
          <div className="mt-7 space-y-6 animate-fade-down">
            {startup.founders && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Founders</h4>
                <div className="flex flex-wrap gap-2">
                  {startup.founders.map((founder, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {founder}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {startup.investors && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users2 className="w-5 h-5" />
                  Key Investors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {startup.investors.map((investor, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                    >
                      {investor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {startup.highlights && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {startup.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};