// KPI Cards data
export const kpiCards = [
  { label: "Total CO₂ Saved", value: "1,245 kg", delta: "+12%", color: "green" },
  { label: "Renewable Grid %", value: "64%", delta: "+4%", color: "energy" },
  { label: "Current Energy Price", value: "1.84 DKK/kWh", delta: "-8%", color: "warning" },
  { label: "Active Commuters", value: "42", delta: "+16%", color: "primary" }
];

// Carbon Intensity Area Chart Trends (gCO₂/kWh)
export const carbonData = [
  { hour: "00:00", intensity: 110 },
  { hour: "02:00", intensity: 98 },
  { hour: "04:00", intensity: 92 },
  { hour: "06:00", intensity: 125 },
  { hour: "08:00", intensity: 165 },
  { hour: "10:00", intensity: 145 },
  { hour: "12:00", intensity: 92 },
  { hour: "14:00", intensity: 110 },
  { hour: "16:00", intensity: 135 },
  { hour: "18:00", intensity: 185 },
  { hour: "20:00", intensity: 155 },
  { hour: "22:00", intensity: 120 }
];

// Current Renewable Production Mix
export const renewableMix = [
  { name: "Wind Offshore", value: 45, color: "#60a5fa" },
  { name: "Solar PV", value: 15, color: "#ffb148" },
  { name: "Sustainable Biomass", value: 20, color: "#22c55e" },
  { name: "Regional Import", value: 20, color: "#4b5563" }
];

// Organization Rankings
export const leaderboard = [
  { name: "Product Design", score: 92 },
  { name: "Engineering HQ", score: 84 },
  { name: "Customer Success", score: 78 },
  { name: "Sales & Marketing", score: 62 }
];

// Electricity Spot Prices (DKK/kWh) for the next 24 hours
export const spotPrices = [
  { hour: "00:00", price: 0.38, type: "normal" },
  { hour: "02:00", price: 0.14, type: "lowest" },
  { hour: "04:00", price: 0.18, type: "lowest" },
  { hour: "06:00", price: 0.45, type: "normal" },
  { hour: "08:00", price: 0.98, type: "peak" },
  { hour: "10:00", price: 1.22, type: "peak" },
  { hour: "12:00", price: 0.42, type: "current" },
  { hour: "14:00", price: 0.35, type: "normal" },
  { hour: "16:00", price: 0.55, type: "normal" },
  { hour: "18:00", price: 1.10, type: "peak" },
  { hour: "20:00", price: 0.85, type: "peak" },
  { hour: "22:00", price: 0.30, type: "normal" }
];

// Active Balancing Live Feed
export const recentActivity = [
  { id: 1, type: "cycle", user: "Erik Larsson", detail: "logged a cycle commute", meta: "2m ago • 12.4 km" },
  { id: 2, type: "renewable", user: "Station 04", detail: "switched to Renewable Source", meta: "14m ago • Automated" },
  { id: 3, type: "milestone", user: "Sales Department", detail: "hit monthly sustainability goal", meta: "1h ago • 500kg CO₂ saved" },
  { id: 4, type: "warning", user: "Spot Price Alert", detail: "Price Peak expected in Copenhagen", meta: "3h ago • Copenhagen (DK1)" }
];

// Commute log presets and statistics
export const commuteStats = [
  { name: "Cycling", co2SavedPerKm: 0.22, emoji: "🚲", color: "#22c55e" },
  { name: "Walking", co2SavedPerKm: 0.22, emoji: "🚶", color: "#4ade80" },
  { name: "Train / Metro", co2SavedPerKm: 0.18, emoji: "🚆", color: "#60a5fa" },
  { name: "Electric Vehicle (EV)", co2SavedPerKm: 0.15, emoji: "⚡", color: "#38bdf8" },
  { name: "Public Bus", co2SavedPerKm: 0.12, emoji: "🚌", color: "#a78bfa" }
];

// ESG Compliance Goals & Progress
export const esgMetrics = [
  { category: "Scope 1 Direct", goal: "Reduce gas/fleet CO2 by 30%", current: "24% achieved", status: "on-track", targetDate: "Q4 2026" },
  { category: "Scope 2 Grid", goal: "Achieve 95% renewable matching", current: "86% achieved", status: "on-track", targetDate: "Dec 2026" },
  { category: "Scope 3 Employee", goal: "Encourage 75% active commutes", current: "81% achieved", status: "exceeded", targetDate: "Ongoing" }
];

// Energy Appliance Presets for Calculator
export const appliancePresets = [
  { name: "EV Smart Charger", powerKW: 11.0, activeHours: 4, defaultRunHour: "02:00" },
  { name: "Geothermal Heat Pump", powerKW: 3.5, activeHours: 8, defaultRunHour: "12:00" },
  { name: "Industrial Dishwasher", powerKW: 2.2, activeHours: 2, defaultRunHour: "14:00" },
  { name: "Office HVAC System", powerKW: 15.0, activeHours: 10, defaultRunHour: "08:00" }
];
