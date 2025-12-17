import { Stats } from '@/types';

interface StatsBarProps {
  stats: Stats;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      <div className="border border-gray-200 p-3 sm:p-4">
        <div className="text-xs text-gray-500 mb-1">Total Applications</div>
        <div className="text-xl sm:text-2xl font-semibold text-gray-900">
          {stats.total}
        </div>
      </div>
      <div className="border border-gray-200 p-3 sm:p-4">
        <div className="text-xs text-gray-500 mb-1">Active Interviews</div>
        <div className="text-xl sm:text-2xl font-semibold text-gray-900">
          {stats.active}
        </div>
      </div>
      <div className="border border-gray-200 p-3 sm:p-4">
        <div className="text-xs text-gray-500 mb-1">Offers</div>
        <div className="text-xl sm:text-2xl font-semibold text-green-600">
          {stats.offers}
        </div>
      </div>
      <div className="border border-gray-200 p-3 sm:p-4">
        <div className="text-xs text-gray-500 mb-1">Rejected</div>
        <div className="text-xl sm:text-2xl font-semibold text-red-600">
          {stats.rejected}
        </div>
      </div>
      <div className="border border-gray-200 p-3 sm:p-4 col-span-2 sm:col-span-1">
        <div className="text-xs text-gray-500 mb-1">Response Rate</div>
        <div className="text-xl sm:text-2xl font-semibold text-gray-900">
          {stats.responseRate}%
        </div>
      </div>
    </div>
  );
}
