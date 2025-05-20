import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Startup } from '../types';
import L from 'leaflet';
import { MapPin, Users, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Custom marker icons for different industries
const createIndustryIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative">
        <div class="absolute -top-4 -left-4 w-8 h-8 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-110" style="background-color: ${color}">
          <div class="flex items-center justify-center h-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      </div>
    `,
    iconSize: [0, 0],
  });
};

interface StartupMapProps {
  startups: Startup[];
}

// Nigerian cities coordinates (expanded and more precise)
const cityCoordinates: { [key: string]: [number, number] } = {
  'Lagos': [6.5244, 3.3792],
  'Abuja': [9.0765, 7.3986],
  'Port Harcourt': [4.8156, 7.0498],
  'Ibadan': [7.3775, 3.9470],
  'Kano': [12.0022, 8.5920],
  'Enugu': [6.4423, 7.4942],
};

// Industry colors for markers
const industryColors: { [key: string]: string } = {
  'Fintech': '#22c55e',
  'EdTech': '#3b82f6',
  'HealthTech': '#f97316',
  'E-commerce': '#ec4899',
  'Mobility': '#8b5cf6',
  'Media': '#f59e0b',
  'Investment': '#6366f1',
  'Transportation': '#06b6d4',
  'FoodTech': '#10b981',
  'AutoTech': '#ef4444',
  'SaaS': '#8b5cf6',
};

export const StartupMap: React.FC<StartupMapProps> = ({ startups }) => {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [hoveredStartup, setHoveredStartup] = useState<Startup | null>(null);

  // Group startups by location
  const startupsByLocation = startups.reduce((acc, startup) => {
    if (!acc[startup.location]) {
      acc[startup.location] = [];
    }
    acc[startup.location].push(startup);
    return acc;
  }, {} as { [key: string]: Startup[] });

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Startup Ecosystem Map</h2>
              <p className="text-gray-500 mt-1">Geographic distribution of Nigerian startups</p>
            </div>
            <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-lg">
              {Object.keys(startupsByLocation).length} Cities
            </div>
          </div>

          <div className="h-[600px] rounded-2xl overflow-hidden shadow-inner">
            <MapContainer
              center={[9.0765, 7.3986]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <ZoomControl position="bottomright" />
              
              {startups.map(startup => {
                const coordinates = cityCoordinates[startup.location];
                if (!coordinates) return null;

                const color = industryColors[startup.industry] || '#6b7280';
                const icon = createIndustryIcon(color);

                return (
                  <Marker
                    key={startup.id}
                    position={coordinates}
                    icon={icon}
                    eventHandlers={{
                      click: () => setSelectedStartup(startup),
                      mouseover: () => setHoveredStartup(startup),
                      mouseout: () => setHoveredStartup(null),
                    }}
                  >
                    <Popup className="rounded-xl">
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-gray-900">{startup.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{startup.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${color}20`, color: color }}>
                            {startup.industry}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>

        <div className="lg:w-80">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Overview</h3>
            <div className="space-y-4">
              {Object.entries(startupsByLocation).map(([location, locationStartups]) => (
                <div
                  key={location}
                  className={`bg-white rounded-xl p-4 transition-all duration-200 ${
                    hoveredStartup?.location === location ? 'shadow-md scale-[1.02]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {location}
                    </h4>
                    <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      {locationStartups.length}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>Top industries: {Array.from(new Set(locationStartups.map(s => s.industry))).slice(0, 2).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedStartup && (
            <div className="mt-6 bg-gray-50 rounded-2xl p-6 animate-fade-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedStartup.name}</h3>
                <a
                  href={selectedStartup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{selectedStartup.employees || 'N/A'}</span>
                </div>
                {selectedStartup.funding && (
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Funding: {selectedStartup.funding}</span>
                  </div>
                )}
                {selectedStartup.valuation && (
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Valuation: {selectedStartup.valuation}</span>
                  </div>
                )}
                {selectedStartup.founders && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Founders</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStartup.founders.map((founder, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                        >
                          {founder}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};