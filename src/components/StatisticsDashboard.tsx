import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Startup } from '../types';
import { TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatisticsDashboardProps {
  startups: Startup[];
}

export const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ startups }) => {
  const industries = Array.from(new Set(startups.map(s => s.industry)));
  
  const industryStats = industries.map(industry => {
    const industryStartups = startups.filter(s => s.industry === industry);
    const totalFunding = industryStartups
      .reduce((sum, s) => sum + parseFloat(s.funding?.replace(/[^0-9.]/g, '') || '0'), 0);
    const avgValuation = industryStartups
      .reduce((sum, s) => sum + parseFloat(s.valuation?.replace(/[^0-9.]/g, '') || '0'), 0) / industryStartups.length;
    
    return {
      industry,
      count: industryStartups.length,
      totalFunding,
      avgValuation
    };
  });

  const totalStartups = startups.length;
  const totalFunding = startups.reduce((sum, s) => sum + parseFloat(s.funding?.replace(/[^0-9.]/g, '') || '0'), 0);
  const averageValuation = startups.reduce((sum, s) => sum + parseFloat(s.valuation?.replace(/[^0-9.]/g, '') || '0'), 0) / totalStartups;
  const totalEmployees = startups.reduce((sum, s) => sum + parseInt(s.employees?.replace(/[^0-9]/g, '') || '0'), 0);

  const barData = {
    labels: industries,
    datasets: [{
      label: 'Number of Startups',
      data: industryStats.map(s => s.count),
      backgroundColor: 'rgba(34, 197, 94, 0.9)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 1,
      borderRadius: 8,
      maxBarThickness: 40
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutData = {
    labels: industries,
    datasets: [{
      data: industryStats.map(s => s.totalFunding),
      backgroundColor: [
        'rgba(34, 197, 94, 0.9)',
        'rgba(59, 130, 246, 0.9)',
        'rgba(249, 115, 22, 0.9)',
        'rgba(236, 72, 153, 0.9)',
        'rgba(139, 92, 246, 0.9)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(99, 102, 241, 0.9)',
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          font: {
            size: 13
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="space-y-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-green-100/50">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 rounded-xl p-3">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Startups</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalStartups}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Across {industries.length} different industries
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-100/50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 rounded-xl p-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Funding</p>
              <h3 className="text-2xl font-bold text-gray-900">${(totalFunding / 1000000).toFixed(1)}M</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Average of ${(totalFunding / totalStartups / 1000000).toFixed(1)}M per startup
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-100/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 rounded-xl p-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Valuation</p>
              <h3 className="text-2xl font-bold text-gray-900">${(averageValuation / 1000000).toFixed(1)}M</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Highest: ${Math.max(...industryStats.map(s => s.avgValuation)) / 1000000}M
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100/50">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 rounded-xl p-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalEmployees.toLocaleString()}+</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Average of {Math.round(totalEmployees / totalStartups)} per startup
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Startups by Industry</h3>
              <p className="text-sm text-gray-500 mt-1">Distribution across sectors</p>
            </div>
            <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-lg">
              {industries.length} Industries
            </div>
          </div>
          <Bar data={barData} options={barOptions} className="max-h-[300px]" />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Funding Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">Total funding by industry</p>
            </div>
            <div className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-lg">
              ${(totalFunding / 1000000).toFixed(0)}M Total
            </div>
          </div>
          <Doughnut data={doughnutData} options={doughnutOptions} className="max-h-[300px]" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Industry Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industryStats.map(stat => (
            <div key={stat.industry} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{stat.industry}</h4>
                <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
                  {stat.count} startups
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Total Funding</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${(stat.totalFunding / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg. Valuation</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${(stat.avgValuation / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};