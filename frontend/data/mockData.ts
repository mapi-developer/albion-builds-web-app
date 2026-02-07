import { Role, Group } from '../types/albion';

// Helper to create empty slot
const emptySlot = () => ({
  main: { id: null, skill_active_0: null, skill_active_1: null, skill_passive_0: null, skill_passive_1: null },
  swaps: []
});

export const MOCK_ROLES: Role[] = [
  {
    role_id: 101,
    creator_id: 555,
    creator_name: "AlbionKing",
    title: "Brimstone Nuke",
    description: "Huge AOE damage for ZvZ clashes.",
    type: "zvz",
    tags: ["dps", "magic", "aoe"],
    likes: 150,
    created_at: "2023-10-01T10:00:00Z",
    equipment: {
      bag: emptySlot(), cape: emptySlot(), head: emptySlot(), armor: emptySlot(), shoes: emptySlot(),
      hand_main: { 
        main: { id: 444, name: "Brimstone Staff", skill_active_0: 1, skill_active_1: 2, skill_passive_0: 1, skill_passive_1: null },
        swaps: [] 
      },
      hand_off: emptySlot(), food: emptySlot(), potion: emptySlot(), mount: emptySlot()
    }
  },
  {
    role_id: 102,
    creator_id: 666,
    creator_name: "HealBot9000",
    title: "Hallowfall Solo",
    description: "Great for solo roads and small scale.",
    type: "pve",
    tags: ["healer", "solo", "roads"],
    likes: 85,
    created_at: "2023-11-15T14:30:00Z",
    equipment: {
      bag: emptySlot(), cape: emptySlot(), head: emptySlot(), armor: emptySlot(), shoes: emptySlot(),
      hand_main: { 
        main: { id: 555, name: "Hallowfall", skill_active_0: 1, skill_active_1: 1, skill_passive_0: 1, skill_passive_1: null },
        swaps: [] 
      },
      hand_off: emptySlot(), food: emptySlot(), potion: emptySlot(), mount: emptySlot()
    }
  },
  {
    role_id: 103,
    creator_id: 777,
    creator_name: "GankSquad",
    title: "Bear Paws Catch",
    description: "Fast catch and burst.",
    type: "pvp",
    tags: ["ganking", "melee", "burst"],
    likes: 210,
    created_at: "2023-12-05T09:00:00Z",
    equipment: {
      bag: emptySlot(), cape: emptySlot(), head: emptySlot(), armor: emptySlot(), shoes: emptySlot(),
      hand_main: { 
        main: { id: 666, name: "Bear Paws", skill_active_0: 1, skill_active_1: 1, skill_passive_0: 1, skill_passive_1: null },
        swaps: [] 
      },
      hand_off: emptySlot(), food: emptySlot(), potion: emptySlot(), mount: emptySlot()
    }
  }
];

export const MOCK_GROUPS: Group[] = [
  {
    group_id: 501,
    creator_id: 555,
    creator_name: "AlbionKing",
    title: "Sunday ZvZ Raid",
    description: "Main raid force composition.",
    type: "zvz",
    tags: ["large-scale", "guild"],
    likes: 340,
    created_at: "2023-10-05T18:00:00Z",
    roles: {
      "1": { main_role_id: 101, swap_role_ids: [] },
      "2": { main_role_id: 101, swap_role_ids: [] },
      "3": { main_role_id: 102, swap_role_ids: [] },
      "4": { main_role_id: 102, swap_role_ids: [] },
      "5": { main_role_id: 103, swap_role_ids: [] }
    }
  },
  {
    group_id: 502,
    creator_id: 888,
    creator_name: "RoadRunner",
    title: "Ava Roads Farm",
    description: "Gold chest farming group.",
    type: "pve",
    tags: ["small-scale", "money"],
    likes: 45,
    created_at: "2023-12-20T20:00:00Z",
    roles: {
      "1": { main_role_id: 102, swap_role_ids: [101] },
      "2": { main_role_id: 103, swap_role_ids: [] }
    }
  }
];