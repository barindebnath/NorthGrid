"use client";

import { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  kpiCards as baseKpis, 
  carbonData, 
  renewableMix, 
  leaderboard, 
  recentActivity as baseActivity 
} from "@/lib/data";
import { 
  Leaf, 
  Zap, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Info,
  Award,
  ArrowRight,
  TrendingDown,
  Download
} from "lucide-react";

export default function DashboardPage() {
  const [kpis, setKpis] = useState(baseKpis);
  const [activities, setActivities] = useState(baseActivity);

  // Function to reload data from localStorage
  const loadDynamicData = () => {
    const logs = JSON.parse(localStorage.getItem("mobility_logs") || "[]");
    
    if (logs.length > 0) {
      // Sum CO2 Saved from logs (in kg)
      const userSavedKg = logs.reduce((sum: number, log: any) => sum + log.co2Saved, 0);
      
      // Let's assume the base value is 1245 kg.
      const baseSavedKg = 1245;
      const totalSaved = baseSavedKg + userSavedKg;
      
      // Active commuters base is 42. Let's add 1 for each unique day logged or just +1 per log
      const totalCommuters = 42 + new Set(logs.map((l: any) => l.user || "User")).size;

      // Update KPIs
      setKpis(prev => prev.map(kpi => {
        if (kpi.label === "Total CO₂ Saved") {
          return { ...kpi, value: `${totalSaved.toLocaleString()} kg` };
        }
        if (kpi.label === "Active Commuters") {
          return { ...kpi, value: totalCommuters.toString() };
        }
        return kpi;
      }));

      // Prepend user logs to activity feed
      const mappedLogs = logs.map((log: any, idx: number) => ({
        id: `user-log-${log.id}`,
        type: "cycle",
        user: "You",
        detail: `logged a ${log.transportMode.toLowerCase()} commute`,
        meta: `${Math.max(1, Math.round((Date.now() - log.id) / 60000))}m ago • ${log.distance} km (+${log.co2Saved}kg CO₂)`
      }));

      setActivities([...mappedLogs, ...baseActivity]);
    }
  };

  useEffect(() => {
    loadDynamicData();
    // Listen for commute-logged events
    window.addEventListener("commute-logged", loadDynamicData);
    return () => {
      window.removeEventListener("commute-logged", loadDynamicData);
    };
  }, []);

  // Icon mapping helper
  const getKpiIcon = (label: string) => {
    switch (label) {
      case "Total CO₂ Saved": return Leaf;
      case "Renewable Grid %": return Zap;
      case "Current Energy Price": return DollarSign;
      default: return Users;
    }
  };

  // Border hover highlighting utility
  const getKpiColorClass = (label: string) => {
    switch (label) {
      case "Total CO₂ Saved": return "text-green bg-green/10 hover:border-green/30";
      case "Renewable Grid %": return "text-energy bg-energy/10 hover:border-energy/30";
      case "Current Energy Price": return "text-warning bg-warning/10 hover:border-warning/30";
      default: return "text-textPrimary bg-elevated hover:border-textPrimary/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-textPrimary font-headline">Organizational Summary</h2>
          <p className="text-textSecondary text-sm mt-1">Real-time sustainability metrics for NorthGrid Hub.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green/10 text-green text-xs font-semibold border border-green/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"></span>
            System Live
          </span>
          <button className="px-4 py-1.5 rounded-xl border border-borderDefault text-xs font-bold hover:bg-elevated transition-all flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />
            Export ESG Data
          </button>
        </div>
      </div>

      {/* KPI Tiles Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((card) => {
          const Icon = getKpiIcon(card.label);
          const colorStyles = getKpiColorClass(card.label);
          return (
            <article 
              key={card.label} 
              className={`bg-surface border border-borderDefault p-5 rounded-2xl flex flex-col justify-between interactive-hover ${colorStyles} cursor-default`}
            >
              <div className="flex justify-between items-start">
                <span className="p-2 rounded-xl bg-base">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase bg-base text-textSecondary font-mono border border-borderDefault">
                  {card.label.split(" ").slice(-1)[0]}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-textSecondary text-xs font-medium">{card.label}</p>
                <h3 className="text-2xl font-bold font-mono text-textPrimary mt-1">
                  {card.value}
                </h3>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-green font-bold">
                <TrendingUp className="w-3 h-3" />
                <span>{card.delta} vs last month</span>
              </div>
            </article>
          );
        })}
      </section>

      {/* Charts Visualization Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carbon Intensity Area Chart */}
        <div className="lg:col-span-2 bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-bold text-textPrimary font-headline">Carbon Intensity Trend</h4>
              <p className="text-xs text-textSecondary mt-1">Emission weight per unit of energy produced today.</p>
            </div>
            <div className="text-[10px] font-bold text-textSecondary bg-elevated px-3 py-1 rounded-full border border-borderDefault">
              Zone: DK1 (Copenhagen)
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="intensityColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-energy)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--accent-energy)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.5} />
                <XAxis dataKey="hour" stroke="var(--text-secondary)" fontSize={10} className="font-mono" />
                <YAxis stroke="var(--text-secondary)" fontSize={10} className="font-mono" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--bg-surface)", 
                    borderColor: "var(--border-default)", 
                    borderRadius: "12px",
                    color: "var(--text-primary)" 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="var(--accent-energy)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#intensityColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Production Mix Donut */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col">
          <h4 className="text-sm font-bold text-textPrimary font-headline mb-1">Energy Production</h4>
          <p className="text-xs text-textSecondary mb-6">Current source segmentation mix.</p>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="h-44 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={renewableMix}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {renewableMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-textPrimary font-mono">80%</span>
                <span className="text-[9px] uppercase tracking-wider text-green font-bold">Renewable</span>
              </div>
            </div>

            <div className="w-full mt-4 space-y-2">
              {renewableMix.map((source) => (
                <div key={source.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }}></span>
                    <span className="text-textSecondary">{source.name}</span>
                  </div>
                  <span className="font-mono font-bold text-textPrimary">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bento: Leaderboard, AI Insights, Live Feed */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Performers Leaderboard */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold text-textPrimary font-headline">Top Performers</h4>
            <Award className="text-energy w-5 h-5" />
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {leaderboard.map((team, idx) => (
              <div key={team.name} className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-textSecondary w-4">
                  0{idx + 1}
                </span>
                <div className="flex-1 flex flex-col">
                  <span className="text-xs font-semibold text-textPrimary">{team.name}</span>
                  <div className="w-full bg-base h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${idx === 0 ? "bg-green" : "bg-energy"}`} 
                      style={{ width: `${team.score}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-textPrimary">
                  {team.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Insights */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold text-textPrimary font-headline">Intelligence Hub</h4>
            <span className="text-[10px] font-bold text-energy px-2.5 py-0.5 rounded-full bg-energy/10 uppercase font-mono">
              AI Insights
            </span>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl border border-energy/15 bg-energy/5 hover:bg-energy/10 transition-colors cursor-pointer">
              <div className="flex gap-3">
                <Zap className="w-4 h-4 text-energy shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-textPrimary">
                  Tonight is an ideal EV charging window between <span className="font-bold text-energy font-mono">22:00 – 04:00</span> when prices fall 40%.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-green/15 bg-green/5 hover:bg-green/10 transition-colors cursor-pointer">
              <div className="flex gap-3">
                <Leaf className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-textPrimary">
                  Your team reduced carbon intensity by <span className="font-bold text-green font-mono">18%</span> this month, equating to 142 trees planted.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-borderDefault bg-base hover:bg-elevated transition-colors cursor-pointer">
              <div className="flex gap-3">
                <Info className="w-4 h-4 text-textSecondary shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-textPrimary">
                  Active cycling activity increased <span className="font-bold font-mono">24%</span> this week due to warm transit windows in Copenhagen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-textPrimary font-headline">Live Activity Feed</h4>
            <span className="w-2.5 h-2.5 rounded-full bg-energy animate-ping"></span>
          </div>
          <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
            {activities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex gap-3 items-start border-l-2 border-borderDefault pl-3 py-0.5 hover:border-energy transition-colors">
                <div className="flex-1">
                  <p className="text-xs text-textPrimary font-medium">
                    <span className="font-bold text-energy">{activity.user}</span> {activity.detail}
                  </p>
                  <p className="text-[10px] text-textSecondary mt-0.5 font-mono">{activity.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Map Banner */}
      <section className="relative h-[280px] w-full rounded-2xl overflow-hidden border border-borderDefault group flex flex-col justify-end p-6">
        {/* Simulated glow backdrop overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.08),transparent_70%)] pointer-events-none"></div>

        {/* Dynamic map background illustration */}
        <div className="absolute inset-0 z-0 bg-[#0c121e] opacity-40 group-hover:scale-105 transition-transform duration-700">
          <div className="w-full h-full border-t border-borderDefault/35 flex items-center justify-center text-textSecondary/5 font-mono select-none text-9xl">
            DK1 ZONE
          </div>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green text-white font-mono uppercase">
              DK1 Regional Match
            </span>
            <span className="text-xs text-textSecondary font-mono">55.6761° N, 12.5683° E</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-textPrimary font-headline leading-tight">
            Your local grid is currently matched at 82% wind-generated power.
          </h3>
          <p className="text-textSecondary text-xs leading-relaxed hidden sm:block">
            Local offshore wind farms are reaching peak capacity due to North Sea wind conditions. 
            Automated load balancing has deferred flexible office systems to match this high-yield window.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button className="bg-energy hover:bg-energy/90 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-energy/20 transition-all flex items-center gap-1.5">
              <span>Deep Dive Grid Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
