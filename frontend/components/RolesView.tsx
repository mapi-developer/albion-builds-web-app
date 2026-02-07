import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import RoleCard from './RoleCard';
import { MOCK_ROLES } from '../data/mockData';
import { FilterState, SortOption } from '../types/albion';

export default function RolesView() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    creatorId: '',
    type: '',
    tags: []
  });
  const [sort, setSort] = useState<SortOption>('likes_desc');

  // Extract available options from data
  const availableTags = useMemo(() => Array.from(new Set(MOCK_ROLES.flatMap(r => r.tags))), []);
  const availableTypes = useMemo(() => Array.from(new Set(MOCK_ROLES.map(r => r.type))), []);

  const filteredRoles = useMemo(() => {
    let result = [...MOCK_ROLES];

    // Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
    }
    if (filters.creatorId) {
      result = result.filter(r => r.creator_id.toString() === filters.creatorId);
    }
    if (filters.type) {
      result = result.filter(r => r.type === filters.type);
    }
    if (filters.tags.length > 0) {
      result = result.filter(r => filters.tags.every(tag => r.tags.includes(tag)));
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'likes_desc': return b.likes - a.likes;
        case 'likes_asc': return a.likes - b.likes;
        case 'date_desc': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'date_asc': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
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
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRoles.map(role => (
          <RoleCard key={role.role_id} role={role} />
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No builds found matching your criteria.
        </div>
      )}
    </div>
  );
}