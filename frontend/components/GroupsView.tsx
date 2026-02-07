import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import GroupCard from './GroupCard';
import { MOCK_GROUPS } from '../data/mockData';
import { FilterState, SortOption } from '../types/albion';

export default function GroupsView() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    creatorId: '',
    type: '',
    tags: [],
    minSize: 0
  });
  const [sort, setSort] = useState<SortOption>('likes_desc');

  const availableTags = useMemo(() => Array.from(new Set(MOCK_GROUPS.flatMap(g => g.tags))), []);
  const availableTypes = useMemo(() => Array.from(new Set(MOCK_GROUPS.map(g => g.type))), []);

  const filteredGroups = useMemo(() => {
    let result = [...MOCK_GROUPS];

    // Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q));
    }
    if (filters.creatorId) {
      result = result.filter(g => g.creator_id.toString() === filters.creatorId);
    }
    if (filters.type) {
      result = result.filter(g => g.type === filters.type);
    }
    if (filters.tags.length > 0) {
      result = result.filter(g => filters.tags.every(tag => g.tags.includes(tag)));
    }
    if (filters.minSize && filters.minSize > 0) {
      result = result.filter(g => Object.keys(g.roles).length >= filters.minSize!);
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'likes_desc': return b.likes - a.likes;
        case 'likes_asc': return a.likes - b.likes;
        case 'date_desc': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'date_asc': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'size_desc': return Object.keys(b.roles).length - Object.keys(a.roles).length;
        case 'size_asc': return Object.keys(a.roles).length - Object.keys(b.roles).length;
        default: return 0;
      }
    });

    return result;
  }, [filters, sort]);

  return (
    <div>
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        sort={sort} 
        setSort={setSort}
        availableTags={availableTags}
        availableTypes={availableTypes}
        showSizeSort={true}
        showSizeFilter={true}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGroups.map(group => (
          <GroupCard key={group.group_id} group={group} />
        ))}
      </div>
      
       {filteredGroups.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No groups found matching your criteria.
        </div>
      )}
    </div>
  );
}