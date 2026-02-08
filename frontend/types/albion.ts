/**
 * Albion Online Data Structure Definitions
 * Matches the structure of backend/role.json and backend/group.json
 */

// ----------------------------------------------------------------------------
// Enums & Unions
// ----------------------------------------------------------------------------

export type EquipmentSlotType = 
  | 'bag' 
  | 'cape' 
  | 'head' 
  | 'armor' 
  | 'shoes' 
  | 'hand_main' 
  | 'hand_off' 
  | 'food' 
  | 'potion' 
  | 'mount';

export type SortOption = 
  | 'likes_desc' 
  | 'likes_asc' 
  | 'date_desc' 
  | 'date_asc' 
  | 'size_desc' 
  | 'size_asc';

// ----------------------------------------------------------------------------
// Equipment & Items
// ----------------------------------------------------------------------------

export interface EquipmentItem {
  id: number | null;
  name?: string; // Optional helper for UI display (mockData uses it)
  skill_active_0?: number | null;
  skill_active_1?: number | null;
  skill_passive_0?: number | null;
  skill_passive_1?: number | null;
}

export interface EquipmentSlotConfig {
  main: EquipmentItem;
  swaps: EquipmentItem[];
}

// Maps specific slot names to their configuration
export type RoleEquipment = Record<EquipmentSlotType, EquipmentSlotConfig>;

// ----------------------------------------------------------------------------
// Role (Build) Definitions
// ----------------------------------------------------------------------------

export interface Role {
  role_id: number;
  title: string;
  description: string;
  type: string; // e.g., 'zvz', 'pve', 'ganking'
  tags: string[];
  likes: number;
  dislikes?: number;
  created_at: string | Date;
  creator_id: number;
  creator_name?: string; // UI helper
  equipment: RoleEquipment;
}

// ----------------------------------------------------------------------------
// Group Definitions
// ----------------------------------------------------------------------------

export interface GroupRoleSlot {
  main_role_id: number;
  swap_role_ids: number[];
}

export interface Group {
  group_id: number;
  title: string;
  description: string;
  type: string;
  tags: string[];
  likes: number;
  dislikes?: number;
  created_at: string | Date;
  creator_id: number;
  creator_name?: string; // UI helper
  // Roles are stored as a map of Slot ID -> Configuration
  roles: Record<string, GroupRoleSlot>;
}

// ----------------------------------------------------------------------------
// UI State Types
// ----------------------------------------------------------------------------

export interface FilterState {
  search: string;
  creatorId: string;
  type: string;
  tags: string[];
  minSize?: number; // Specific to Groups
}