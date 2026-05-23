"use client";

import { useState } from "react";
import { appliancePresets, spotPrices, carbonData } from "@/lib/data";
import { 
  Calculator, 
  HelpCircle, 
  Leaf, 
  Zap, 
  Clock, 
  TrendingDown, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function CalculatorPage() {
  const [selectedAppliance, setSelectedAppliance] = useState(appliancePresets[0].name);
  const [startHour, setStartHour] = useState(12); // Default to 12:00
  const [duration, setDuration] = useState(3); // Default to 3 hours

  const appliance = appliancePresets.find(a => a.name === selectedAppliance) || appliancePresets[0];

  // Calculations
  const calculateMetrics = (startIdx: number, runHours: number, kwPower: number) => {
    let totalCost = 0;
    let totalCO2 = 0;

    for (let i = 0; i < runHours; i++) {
      const idx = (startIdx + i) % spotPrices.length;
      const hourlyPrice = spotPrices[idx]?.price || 0.5;
      
      // Carbon intensity data maps directly index-wise (divided by 2 since spotPrices has 12 points, etc.)
      const carbonIdx = Math.floor(idx) % carbonData.length;
      const hourlyIntensity = carbonData[carbonIdx]?.intensity || 120;

      totalCost += hourlyPrice * kwPower;
      totalCO2 += (hourlyIntensity * kwPower);
    }

    return {
      cost: parseFloat(totalCost.toFixed(2)),
      co2: Math.round(totalCO2)
    };
  };

  // 1. Current user configuration metrics
  const current = calculateMetrics(Math.floor(startHour / 2), duration, appliance.powerKW);

  // 2. Find optimal start hour (lowest cost start window)
  let bestHour = 0;
  let bestCost = Infinity;

  for (let h = 0; h < 24; h += 2) {
    const metrics = calculateMetrics(h / 2, duration, appliance.powerKW);
    if (metrics.cost < bestCost) {
      bestCost = metrics.cost;
      bestHour = h;
    }
  }

  const optimal = calculateMetrics(bestHour / 2, duration, appliance.powerKW);
  
  // Potential savings
  const costSavings = Math.max(0, current.cost - optimal.cost);
  const co2Savings = Math.max(0, current.co2 - optimal.co2);

  // Helper to format hour string
  const formatHour = (h: number) => {
    return `${h.toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-textPrimary font-headline">Spot Price Optimizer</h2>
        <p className="text-textSecondary text-sm mt-1">Simulate electrical load-shifting thresholds to optimize grid costs and offset carbon footprint.</p>
      </div>

      {/* Primary Simulator Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Simulator Parameters */}
        <div className="lg:col-span-1 bg-surface border border-borderDefault rounded-2xl p-5 space-y-6 h-fit">
          <h4 className="text-sm font-bold text-textPrimary font-headline flex items-center gap-2">
            <Calculator className="w-4 h-4 text-energy" /> Sim Settings
          </h4>

          {/* Select Preset */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
              High-Power Appliance
            </label>
            <select
              value={selectedAppliance}
              onChange={(e) => setSelectedAppliance(e.target.value)}
              className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
            >
              {appliancePresets.map(app => (
                <option key={app.name} value={app.name}>
                  {app.name} ({app.powerKW} kW)
                </option>
              ))}
            </select>
          </div>

          {/* Start Hour Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="start-hour" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                Execution Start Hour
              </label>
              <span className="text-xs font-mono font-bold text-energy">
                {formatHour(startHour)}
              </span>
            </div>
            <input
              type="range"
              id="start-hour"
              min="0"
              max="22"
              step="2"
              value={startHour}
              onChange={(e) => setStartHour(parseInt(e.target.value))}
              className="w-full h-1 bg-borderDefault rounded-lg appearance-none cursor-pointer accent-energy"
            />
            <div className="flex justify-between text-[8px] text-textSecondary font-mono">
              <span>00:00</span>
              <span>08:00</span>
              <span>16:00</span>
              <span>22:00</span>
            </div>
          </div>

          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="run-duration" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                Continuous Runtime
              </label>
              <span className="text-xs font-mono font-bold text-energy">
                {duration} hrs
              </span>
            </div>
            <input
              type="range"
              id="run-duration"
              min="1"
              max="12"
              step="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-1 bg-borderDefault rounded-lg appearance-none cursor-pointer accent-energy"
            />
            <div className="flex justify-between text-[8px] text-textSecondary font-mono">
              <span>1 hr</span>
              <span>6 hrs</span>
              <span>12 hrs</span>
            </div>
          </div>

          {/* Context Banner */}
          <div className="p-3 bg-base rounded-xl border border-borderDefault text-[10px] text-textSecondary flex gap-2">
            <Clock className="w-4 h-4 text-textSecondary shrink-0" />
            <span>
              Prices fluctuate significantly throughout the day based on solar yield, offshore wind generation, and network demand spikes.
            </span>
          </div>
        </div>

        {/* Right Columns: Comparison & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* User current schedule card */}
            <div className="bg-surface border border-borderDefault rounded-2xl p-5 relative overflow-hidden">
              <span className="text-[9px] font-bold text-textSecondary bg-elevated px-2 py-0.5 rounded border border-borderDefault uppercase tracking-wider absolute top-4 right-4 font-mono">
                Current Plan
              </span>
              <p className="text-xs text-textSecondary">Start time: {formatHour(startHour)}</p>
              
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-textSecondary">Estimated Cost</p>
                  <p className="text-xl font-bold font-mono text-textPrimary mt-0.5">{current.cost} DKK</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-textSecondary">Carbon Footprint</p>
                  <p className="text-base font-bold font-mono text-textPrimary mt-0.5">{current.co2} g CO₂</p>
                </div>
              </div>
            </div>

            {/* Optimal matching shift card */}
            <div className="bg-surface border border-energy/35 bg-energy/5 rounded-2xl p-5 relative overflow-hidden">
              <span className="text-[9px] font-bold text-energy bg-energy/10 px-2 py-0.5 rounded border border-energy/10 uppercase tracking-wider absolute top-4 right-4 font-mono">
                Optimal shift
              </span>
              <p className="text-xs text-energy">Start time: {formatHour(bestHour)}</p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-energy/70">Estimated Cost</p>
                  <p className="text-xl font-bold font-mono text-energy mt-0.5">{optimal.cost} DKK</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-energy/70">Carbon Footprint</p>
                  <p className="text-base font-bold font-mono text-energy mt-0.5">{optimal.co2} g CO₂</p>
                </div>
              </div>
            </div>
          </div>

          {/* Potential Savings Banner */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 blur-3xl rounded-full"></div>
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-green/10 text-green rounded-xl">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-textPrimary font-headline">Shifting Potential</h4>
                <p className="text-xs text-textSecondary mt-0.5">By shifting to the optimal window, your organization saves:</p>
              </div>
            </div>
            
            <div className="flex gap-6 font-mono border-l border-borderDefault/70 pl-0 sm:pl-6">
              <div>
                <p className="text-[9px] uppercase font-bold text-textSecondary">Financial</p>
                <p className="text-lg font-black text-green">-{costSavings.toFixed(2)} DKK</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-textSecondary">Emissions</p>
                <p className="text-lg font-black text-green">-{co2Savings} g CO₂</p>
              </div>
            </div>
          </div>

          {/* Interactive Spot Price Shift Visualizer */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-6">
            <h4 className="text-sm font-bold text-textPrimary font-headline mb-4">Daily Load-Matching Visualizer</h4>
            <div className="h-20 w-full flex items-end gap-1 px-1">
              {spotPrices.map((spot, idx) => {
                const hourNum = parseInt(spot.hour.split(":")[0]);
                const userStart = startHour;
                const userEnd = (startHour + duration) % 24;
                
                const optStart = bestHour;
                const optEnd = (bestHour + duration) % 24;

                // Check if this hour falls inside user run window
                let isUserActive = false;
                if (userStart <= userEnd) {
                  isUserActive = hourNum >= userStart && hourNum < userEnd;
                } else {
                  isUserActive = hourNum >= userStart || hourNum < userEnd;
                }

                // Check if this hour falls inside optimal run window
                let isOptActive = false;
                if (optStart <= optEnd) {
                  isOptActive = hourNum >= optStart && hourNum < optEnd;
                } else {
                  isOptActive = hourNum >= optStart || hourNum < optEnd;
                }

                let color = "bg-borderDefault opacity-30";
                if (isUserActive) color = "bg-energy opacity-80 border-t-2 border-energy";
                if (isOptActive && isUserActive) color = "bg-green opacity-90 border-t-2 border-green";
                else if (isOptActive) color = "bg-green opacity-40 border-t-2 border-green/50";

                return (
                  <div key={spot.hour} className="flex-1 flex flex-col items-center group relative cursor-help h-full justify-end">
                    <div className={`w-full rounded-t-sm transition-all duration-150 ${color}`} style={{ height: `${spot.price * 60}%` }}></div>
                    <span className="text-[8px] text-textSecondary font-mono mt-1.5">{spot.hour.split(":")[0]}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-4 justify-center text-[10px] text-textSecondary mt-6 border-t border-borderDefault/70 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-energy rounded-sm"></span> Your window
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-green rounded-sm"></span> Recommended window
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-green opacity-40 rounded-sm"></span> Recommended window overlap
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
