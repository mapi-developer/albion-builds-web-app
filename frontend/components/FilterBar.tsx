import React, { useState, useEffect, useRef } from 'react';
import { FilterState, SortOption } from '../types/albion';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  typeOptions?: string[]; 
}

export default function FilterBar({ 
  onFilterChange, 
  onSortChange, 
  typeOptions = ['zvz', 'ganking', 'pve', 'arena'] 
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Local state for immediate UI feedback
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    creatorId: '',
    type: '',
    tags: [],
    minSize: 0,
  });

  const [rawTags, setRawTags] = useState(''); 

  // Ref to hold the latest onFilterChange to avoid useEffect dependencies
  const onFilterChangeRef = useRef(onFilterChange);

  // Update ref when prop changes
  useEffect(() => {
    onFilterChangeRef.current = onFilterChange;
  }, [onFilterChange]);

  // Debounce the filter update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Guard clause to ensure the function exists before calling
      if (typeof onFilterChangeRef.current === 'function') {
        onFilterChangeRef.current(filters);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filters]); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRawTags(val);
    const tagsArray = val.split(/[\s,]+/).filter(t => t.length > 0);
    setFilters(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Guard clause to ensure the function exists
    if (typeof onSortChange === 'function') {
      onSortChange(e.target.value as SortOption);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 mb-6">
      {/* Top Row: Toggle, Search, Sort */}
      <div className="flex flex-col md:flex-row gap-2">
        
        {/* Filter Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-center px-4 py-2 rounded transition-colors font-medium ${
            isExpanded 
              ? 'bg-amber-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {/* SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>

        {/* Search Input */}
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Sort Dropdown */}
        <select
          className="bg-slate-950 border border-slate-700 rounded px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          onChange={handleSortChange}
          defaultValue="date_desc"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="likes_desc">Most Liked</option>
          <option value="likes_asc">Least Liked</option>
        </select>
      </div>

      {/* Expanded Filter Section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Tags */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 ml-1 uppercase font-bold tracking-wider">Tags</label>
            <input
              type="text"
              placeholder="e.g. tank zvz engage"
              className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              value={rawTags}
              onChange={handleTagsInput}
            />
            <span className="text-[10px] text-slate-500 mt-1 ml-1">Matches any entered tag</span>
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 ml-1 uppercase font-bold tracking-wider">Type</label>
            <select
              className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">All Types</option>
              {typeOptions.map(t => (
                <option key={t} value={t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* Creator */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1 ml-1 uppercase font-bold tracking-wider">Creator ID / Name</label>
            <input
              type="text"
              placeholder="Filter by Creator..."
              className="bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              value={filters.creatorId}
              onChange={(e) => setFilters(prev => ({ ...prev, creatorId: e.target.value }))}
            />
          </div>

        </div>
      )}
    </div>
  );
}