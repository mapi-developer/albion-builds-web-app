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
    minSize: 0,
  });
  const [sort, setSort] = useState<SortOption>('date_desc');

  // --- Filtering & Sorting Logic ---
  const filteredGroups = useMemo(() => {
    let result = [...MOCK_GROUPS];

    // 1. Search (Title)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(g => g.title.toLowerCase().includes(q));
    }

    // 2. Type
    if (filters.type) {
      result = result.filter(g => g.type.toLowerCase() === filters.type.toLowerCase());
    }

    // 3. Creator
    if (filters.creatorId) {
      const q = filters.creatorId.toLowerCase();
      result = result.filter(g => 
        (g.creator_name && g.creator_name.toLowerCase().includes(q)) || 
        g.creator_id.toString() === q
      );
    }

    // 4. Tags (OR Logic)
    if (filters.tags.length > 0) {
      const searchTags = filters.tags.map(t => t.toLowerCase());
      result = result.filter(g => 
        g.tags.some(groupTag => searchTags.includes(groupTag.toLowerCase()))
      );
    }

    // 5. Sorting
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Group Compositions</h2>
          <p className="text-slate-400">Find the perfect team structure for your activity.</p>
        </div>
        <div className="w-full md:w-auto">
           <button className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            + New Group
          </button>
        </div>
      </div>

      <FilterBar 
        onFilterChange={setFilters} 
        onSortChange={setSort} 
        typeOptions={['zvz', 'ganking', 'small-scale']}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <GroupCard key={group.group_id} group={group} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            No groups found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}