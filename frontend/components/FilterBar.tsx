import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { FilterState, SortOption } from '../types/albion';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  availableTags: string[];
  availableTypes: string[];
  showSizeSort?: boolean; // Only true for groups
  showSizeFilter?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  sort,
  setSort,
  availableTags,
  availableTypes,
  showSizeSort = false,
  showSizeFilter = false
}) => {
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    setFilters({ ...filters, tags: newTags });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 space-y-4">
      
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            name="search"
            value={filters.search}
            onChange={handleTextChange}
            placeholder="Search titles or descriptions..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/50 placeholder:text-slate-600"
          />
        </div>

        {/* Creator ID Filter */}
        <div className="w-full md:w-48">
          <input 
            type="text"
            name="creatorId"
            value={filters.creatorId}
            onChange={handleTextChange}
            placeholder="Filter by Creator ID"
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:border-amber-600/50 text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-48">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-4 py-2 rounded-lg appearance-none focus:outline-none focus:border-amber-600/50 cursor-pointer"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="likes_desc">Most Popular</option>
              <option value="likes_asc">Least Popular</option>
              {showSizeSort && <option value="size_desc">Largest Group</option>}
              {showSizeSort && <option value="size_asc">Smallest Group</option>}
            </select>
            <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500">
              {sort.includes('desc') ? <SortDesc size={16} /> : <SortAsc size={16} />}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Filters (Type, Size, Tags) */}
      <div className="flex flex-wrap gap-4 items-center border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Filter size={16} />
          <span>Filters:</span>
        </div>

        {/* Type Filter */}
        <select
          name="type"
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
          className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none hover:border-slate-700 cursor-pointer"
        >
          <option value="">All Types</option>
          {availableTypes.map(t => (
            <option key={t} value={t}>{t.toUpperCase()}</option>
          ))}
        </select>

        {/* Size Filter (Optional) */}
        {showSizeFilter && (
             <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Min Roles:</span>
                <input 
                    type="number"
                    value={filters.minSize || ''}
                    onChange={(e) => setFilters({...filters, minSize: parseInt(e.target.value) || 0})}
                    className="w-16 bg-slate-950 border border-slate-800 text-slate-200 px-2 py-1.5 rounded-lg text-sm focus:outline-none"
                    placeholder="0"
                />
             </div>
        )}

        <div className="w-px h-6 bg-slate-800 mx-2 hidden sm:block"></div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filters.tags.includes(tag)
                  ? 'bg-amber-600/20 text-amber-400 border-amber-600/50'
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterBar;