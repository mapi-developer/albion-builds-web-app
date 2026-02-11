import { Group, Role, RoleEquipment } from '../types/albion';

// --- Helpers ---

const emptySlot = { main: { id: null }, swaps: [] };

const createMockEquipment = (mainHandId: number, mainHandName: string = "Weapon"): RoleEquipment => ({
  hand_main: { main: { id: mainHandId, name: mainHandName }, swaps: [] },
  hand_off: emptySlot,
  head: { main: { id: 1001, name: "Cleric Cowl" }, swaps: [] },
  armor: { main: { id: 2001, name: "Cleric Robe" }, swaps: [] },
  shoes: { main: { id: 3001, name: "Cleric Sandals" }, swaps: [] },
  cape: { main: { id: 4001, name: "Martlock Cape" }, swaps: [] },
  bag: emptySlot,
  food: emptySlot,
  potion: emptySlot,
  mount: { main: { id: 5001, name: "Armored Horse" }, swaps: [] },
});

// --- Base Data ---

const BASE_ROLES: Role[] = [
  {
    role_id: 101,
    title: "Brawl Tank",
    description: "Frontline heavy mace build for engaging.",
    type: "zvz",
    tags: ["tank", "engage", "heavy"],
    likes: 45,
    created_at: "2023-10-01T10:00:00Z",
    creator_id: 1,
    creator_name: "TankMaster",
    equipment: createMockEquipment(1234, "Heavy Mace"),
  },
  {
    role_id: 102,
    title: "Defensive Tank",
    description: "Grovekeeper build for peeling.",
    type: "zvz",
    tags: ["tank", "defensive", "peel"],
    likes: 32,
    created_at: "2023-10-02T11:30:00Z",
    creator_id: 1,
    creator_name: "TankMaster",
    equipment: createMockEquipment(1235, "Grovekeeper"),
  },
  {
    role_id: 201,
    title: "Fire DPS",
    description: "Brimstone staff for huge AOE damage.",
    type: "zvz",
    tags: ["dps", "ranged", "fire"],
    likes: 88,
    created_at: "2023-10-05T14:20:00Z",
    creator_id: 2,
    creator_name: "BurnItDown",
    equipment: createMockEquipment(6666, "Brimstone Staff"),
  },
];

const BASE_GROUPS: Group[] = [
  {
    group_id: 1,
    title: "Standard ZvZ Party",
    description: "Optimal composition for 20-man bombing.",
    type: "zvz",
    tags: ["organized", "competitive", "large-scale"],
    likes: 120,
    created_at: "2023-10-01T09:00:00Z",
    creator_id: 1,
    creator_name: "GuildLeader",
    roles: {
      "1": { main_role_id: 101, swap_role_ids: [102] },
      "2": { main_role_id: 201, swap_role_ids: [] },
    },
  },
  {
    group_id: 2,
    title: "Ganking Squad",
    description: "Fast dismount group.",
    type: "ganking",
    tags: ["small-scale", "speed", "pvp"],
    likes: 15,
    created_at: "2023-10-10T20:00:00Z",
    creator_id: 3,
    creator_name: "GankSquad",
    roles: {
      "1": { main_role_id: 102, swap_role_ids: [] },
    },
  },
];

// --- Generated Additional Data ---

const ADDITIONAL_ROLES: Role[] = [
  // Healers
  { id: 301, title: "Hallowfall Healer", type: "small-scale", tags: ["healer", "mobile", "holy"], item: "Hallowfall", creator: "HealBot" },
  { id: 302, title: "Fallen Staff ZvZ", type: "zvz", tags: ["healer", "aoe", "reset"], item: "Fallen Staff", creator: "ClericJohn" },
  { id: 303, title: "Nature Blight", type: "small-scale", tags: ["healer", "hot", "mobile"], item: "Blight Staff", creator: "DruidX" },
  { id: 304, title: "Great Nature Solo", type: "solo", tags: ["healer", "sustain", "pve"], item: "Great Nature Staff", creator: "LonelyWolf" },
  { id: 305, title: "Divine Save", type: "arena", tags: ["healer", "single-target", "save"], item: "Divine Staff", creator: "ArenaChamp" },

  // Supports
  { id: 306, title: "Locus Tank", type: "zvz", tags: ["support", "cleanse", "defensive"], item: "Locus", creator: "SupportMain" },
  { id: 307, title: "Enigmatic Shield", type: "zvz", tags: ["support", "shield", "arcane"], item: "Enigmatic Staff", creator: "SupportMain" },
  { id: 308, title: "Great Arcane Stop", type: "small-scale", tags: ["support", "catch", "utility"], item: "Great Arcane", creator: "StopWatch" },
  { id: 309, title: "Lifecurse Debuff", type: "zvz", tags: ["support", "debuff", "pierce"], item: "Lifecurse Staff", creator: "Debuffer" },

  // Melee DPS
  { id: 310, title: "Carving Sword Pierce", type: "small-scale", tags: ["dps", "melee", "pierce"], item: "Carving Sword", creator: "SwordKing" },
  { id: 311, title: "Realmbreaker", type: "zvz", tags: ["dps", "melee", "hp-cut"], item: "Realmbreaker", creator: "AxeMan" },
  { id: 312, title: "Bear Paws Gank", type: "ganking", tags: ["dps", "mobility", "catch"], item: "Bear Paws", creator: "GankSquad" },
  { id: 313, title: "Bloodletter Execute", type: "small-scale", tags: ["dps", "mobility", "execute"], item: "Bloodletter", creator: "Executor" },
  { id: 314, title: "Halberd Bleed", type: "zvz", tags: ["dps", "melee", "pressure"], item: "Halberd", creator: "Bleeder" },
  { id: 315, title: "Dual Swords Solo", type: "solo", tags: ["dps", "mobility", "cheap"], item: "Dual Swords", creator: "NewbieHelper" },

  // Ranged DPS
  { id: 316, title: "Permafrost", type: "zvz", tags: ["dps", "ranged", "cc"], item: "Permafrost Prism", creator: "IceQueen" },
  { id: 317, title: "Siegebow Bomb", type: "zvz", tags: ["dps", "ranged", "true-damage"], item: "Siegebow", creator: "Archer" },
  { id: 318, title: "Longbow PvE", type: "pve", tags: ["dps", "ranged", "aoe"], item: "Longbow", creator: "Farmer" },
  { id: 319, title: "Light Crossbow", type: "pve", tags: ["dps", "ranged", "single-target"], item: "Light Crossbow", creator: "Farmer" },
  { id: 320, title: "Cursed Skull", type: "arena", tags: ["dps", "dot", "pressure"], item: "Cursed Skull", creator: "DarkMage" },
].map((r, index) => ({
  role_id: r.id,
  title: r.title,
  description: `A generic ${r.tags[0]} build focusing on ${r.tags[1]} using ${r.item}.`,
  type: r.type,
  tags: r.tags,
  likes: Math.floor(Math.random() * 200) + 5,
  created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  creator_id: 100 + index,
  creator_name: r.creator,
  equipment: createMockEquipment(r.id * 10, r.item),
}));

const ADDITIONAL_GROUPS: Group[] = [
  // ZvZ
  { id: 10, title: "Reset Day Bomb Squad", type: "zvz", tags: ["competitive", "high-ip"], creator: "AllianceLeader" },
  { id: 11, title: "ZvZ Support Party", type: "zvz", tags: ["defensive", "utility"], creator: "Shotcaller" },
  { id: 12, title: "New Player ZvZ", type: "zvz", tags: ["beginner", "cheap"], creator: "Recruiter" },
  { id: 13, title: "Castle Defense", type: "zvz", tags: ["defensive", "choke"], creator: "LordCommander" },
  { id: 14, title: "Open World Brawl", type: "zvz", tags: ["brawl", "sustain"], creator: "Brawler" },

  // Small Scale / Roads
  { id: 15, title: "Roads 7-man", type: "small-scale", tags: ["roads", "versatile"], creator: "RoadRunner" },
  { id: 16, title: "Gold Chest Farm", type: "small-scale", tags: ["pve", "pvp-ready"], creator: "TreasureHunter" },
  { id: 17, title: "Hellgate 5v5 Meta", type: "arena", tags: ["meta", "expensive"], creator: "HGSpammer" },
  { id: 18, title: "Hellgate 10v10", type: "small-scale", tags: ["scrim", "organized"], creator: "HGSpammer" },
  { id: 19, title: "Faction Outpost Cap", type: "small-scale", tags: ["faction", "speed"], creator: "General" },

  // Ganking
  { id: 20, title: "Red Zone Police", type: "ganking", tags: ["royal", "police"], creator: "BlueBerry" },
  { id: 21, title: "Black Zone Gate Camp", type: "ganking", tags: ["camp", "catch"], creator: "GateKeeper" },
  { id: 22, title: "Wolf Pack", type: "ganking", tags: ["mobile", "fast"], creator: "Alpha" },
  { id: 23, title: "Invis Gank", type: "ganking", tags: ["stealth", "burst"], creator: "Shadow" },

  // PvE / HCE
  { id: 24, title: "HCE Level 15+", type: "pve", tags: ["hce", "meta", "speedrun"], creator: "HCEMaster" },
  { id: 25, title: "HCE Level 18", type: "pve", tags: ["hce", "elite"], creator: "HCEMaster" },
  { id: 26, title: "Static Dungeon FF", type: "pve", tags: ["fame", "static"], creator: "FameFarmer" },
  { id: 27, title: "World Boss Raid", type: "pve", tags: ["raid", "safe"], creator: "RaidLeader" },
  { id: 28, title: "Avalonian Raid", type: "pve", tags: ["ava", "endgame"], creator: "AvaRL" },
  
  // Arena
  { id: 29, title: "Crystal Arena Grind", type: "arena", tags: ["crystal", "rankup"], creator: "Rank1" },
  { id: 30, title: "Fun Arena Comp", type: "arena", tags: ["casual", "off-meta"], creator: "Troll" },
].map((g, index) => ({
  group_id: g.id,
  title: g.title,
  description: `A composed group for ${g.type} activities focused on ${g.tags.join(' and ')}.`,
  type: g.type,
  tags: g.tags,
  likes: Math.floor(Math.random() * 500) + 10,
  created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  creator_id: 200 + index,
  creator_name: g.creator,
  roles: {
    "1": { main_role_id: 101, swap_role_ids: [] },
    "2": { main_role_id: 301, swap_role_ids: [] },
    "3": { main_role_id: 310, swap_role_ids: [312] },
  },
}));

export const MOCK_ROLES: Role[] = [...BASE_ROLES, ...ADDITIONAL_ROLES];
export const MOCK_GROUPS: Group[] = [...BASE_GROUPS, ...ADDITIONAL_GROUPS];