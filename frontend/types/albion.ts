/**
 * Albion Online Data Structure Definitions
 * * This file formalizes the structure for player builds, including equipment,
 * ability choices, and situational item swaps.
 */

// ----------------------------------------------------------------------------
// Core Scalar Types
// ----------------------------------------------------------------------------

export type Tier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Enchantment = 0 | 1 | 2 | 3 | 4;
export type Quality = 1 | 2 | 3 | 4 | 5; // 1=Normal, 2=Good, 3=Outstanding, 4=Excellent, 5=Masterpiece

export type EquipmentSlot =
  | 'MainHand'
  | 'OffHand'
  | 'Head'
  | 'Armor'
  | 'Shoes'
  | 'Cape'
  | 'Bag'
  | 'Food'
  | 'Potion'
  | 'Mount';

export type Role = 'Tank' | 'Healer' | 'Melee DPS' | 'Ranged DPS' | 'Support' | 'Battlemount';
export type ContentType = 'ZvZ' | 'Small Scale' | 'Crystal League' | 'HCE' | 'Ganking' | 'Solo' | 'Arena';

// ----------------------------------------------------------------------------
// Item & Ability Definitions
// ----------------------------------------------------------------------------

/**
 * Represents a specific spell or passive selected on an item.
 */
export interface AbilitySelection {
  slot: 'Q' | 'W' | 'E' | 'Passive';
  spellId: number; // The internal game ID for the spell
  spellName?: string;
}

/**
 * Represents a single item instance.
 */
export interface Item {
  uniqueName: string; // e.g., "T8_HEAD_CLOTH_SET3"
  localizedName?: string; // e.g., "Cleric Cowl"
  tier: Tier;
  enchantment: Enchantment;
  quality: Quality;
  count?: number; // Defaults to 1, useful for Food/Potions
  abilities?: AbilitySelection[]; // The spells selected for this specific item
}

// ----------------------------------------------------------------------------
// Swap Logic
// ----------------------------------------------------------------------------

/**
 * Represents a conditional gear swap.
 * Used to define items carried in inventory to adapt to specific matchups.
 */
export interface ItemSwap {
  id: string; // Unique identifier for the swap entry
  targetSlot: EquipmentSlot; // The slot this item is intended to replace
  item: Item;
  
  /**
   * The condition or context under which this swap should be used.
   * e.g., "Vs Heavy CC", "For Brawl Phase", "If kiting"
   */
  conditionDescription: string;
  
  /**
   * Priority indicates importance of carrying this swap.
   * 'Mandatory' = Must be in inventory. 'Optional' = Nice to have.
   */
  priority: 'Mandatory' | 'Optional';
}

// ----------------------------------------------------------------------------
// Build / Loadout Root
// ----------------------------------------------------------------------------

/**
 * The root data structure for a complete player configuration.
 */
export interface AlbionBuild {
  id: string;
  name: string;
  author: string;
  lastUpdated: string; // ISO Date string
  
  // Metadata
  role: Role;
  contentTypes: ContentType[];
  description?: string;
  minIpRequirement?: number;

  // The Primary Set (what the player wears by default)
  mainHand: Item;
  offHand?: Item; // Optional (e.g., if using 2H weapon)
  head: Item;
  armor: Item;
  shoes: Item;
  cape: Item;
  
  // Consumables & Accessories
  food?: Item;
  potion?: Item;
  mount?: Item;
  bag?: Item;

  // The Swap Collection
  // A list of alternative items to be carried in inventory
  inventorySwaps: ItemSwap[];
}

// ----------------------------------------------------------------------------
// Helper Types for UI State
// ----------------------------------------------------------------------------

/**
 * Helper to represent the flat list of items needed to buy the build.
 * Aggregates main set + swaps.
 */
export interface ShoppingListEntry {
  uniqueName: string;
  amount: number;
  displayName: string;
}