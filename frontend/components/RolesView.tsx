import React, { useState, useMemo, useEffect } from 'react';
import FilterBar from './FilterBar';
import RoleCard from './RoleCard';
import { MOCK_ROLES } from '../data/mockData';
import { FilterState, SortOption } from '../types/albion';
import Pagination from '@atlaskit/pagination';

const ITEMS_PER_PAGE = 20;

export default function RolesView() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    creatorId: '',
    type: '',
    tags: [],
    minSize: 0,
  });
  const [sort, setSort] = useState<SortOption>('date_desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  // Filtering & Sorting Logic
  const filteredRoles = useMemo(() => {
    let result = [...MOCK_ROLES];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(q));
    }

    if (filters.type) {
      result = result.filter(r => r.type.toLowerCase() === filters.type.toLowerCase());
    }

    if (filters.creatorId) {
      const q = filters.creatorId.toLowerCase();
      result = result.filter(r => 
        (r.creator_name && r.creator_name.toLowerCase().includes(q)) || 
        r.creator_id.toString() === q
      );
    }

    if (filters.tags.length > 0) {
      const searchTags = filters.tags.map(t => t.toLowerCase());
      result = result.filter(r => 
        r.tags.some(roleTag => searchTags.includes(roleTag.toLowerCase()))
      );
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'likes_desc': return b.likes - a.likes;
        case 'likes_asc': return a.likes - b.likes;
        case 'date_asc': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'date_desc': default: 
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return result;
  }, [filters, sort]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRoles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRoles, currentPage]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Build Library</h2>
          <p className="text-slate-400">Explore individual builds created by the community.</p>
        </div>
        <div className="w-full md:w-auto">
          <button className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            + New Build
          </button>
        </div>
      </div>

      <FilterBar 
        onFilterChange={setFilters} 
        onSortChange={setSort}
        typeOptions={['tank', 'healer', 'support', 'range-dd', 'melee-dd', 'battle-mount']} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedRoles.length > 0 ? (
          paginatedRoles.map((role) => (
            <RoleCard key={role.role_id} role={role} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            No builds found matching your filters.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            pages={pages}
            selectedIndex={currentPage - 1}
            onChange={(event, page) => setCurrentPage(page)}
            nextLabel="Next"
            previousLabel="Previous"
          />
        </div>
      )}
    </div>
  );
}