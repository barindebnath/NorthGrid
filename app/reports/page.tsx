"use client";

import { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { esgMetrics } from "@/lib/data";
import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  RefreshCw, 
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock monthly carbon savings trend (tons CO2 saved per month)
const monthlyReportData = [
  { month: "Jan", Saved: 4.2 },
  { month: "Feb", Saved: 5.6 },
  { month: "Mar", Saved: 6.8 },
  { month: "Apr", Saved: 8.1 },
  { month: "May", Saved: 9.4 }
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState("All");
  const [period, setPeriod] = useState("Q2 2026");
  const [format, setFormat] = useState("PDF");

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate ESG compile pipeline
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-textPrimary font-headline">ESG & CSRD Reporting</h2>
        <p className="text-textSecondary text-sm mt-1">Compile and export regulatory-compliant sustainability disclosures.</p>
      </div>

      {/* Main split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Report compilation parameters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-borderDefault rounded-2xl p-5">
            <h4 className="text-sm font-bold text-textPrimary font-headline mb-4 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-energy" /> Compiler Options
            </h4>

            <form onSubmit={handleGenerateReport} className="space-y-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                  Disclosures Scope
                </label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                >
                  <option value="All">All Scopes (Scope 1, 2, & 3)</option>
                  <option value="Energy">Scope 2 (Grid & Electricity)</option>
                  <option value="Mobility">Scope 3 (Employee Transit)</option>
                </select>
              </div>

              {/* Reporting Period */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                  Reporting Period
                </label>
                <select 
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                >
                  <option value="Q2 2026">Q2 2026 (Apr - Jun)</option>
                  <option value="Q1 2026">Q1 2026 (Jan - Mar)</option>
                  <option value="Full Year 2025">Full Year 2025</option>
                </select>
              </div>

              {/* Output File Format */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-textSecondary font-mono block mb-2">
                  Export Format
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat("PDF")}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      format === "PDF" 
                        ? "bg-energy/10 border-energy text-energy" 
                        : "bg-base border-borderDefault hover:bg-elevated text-textSecondary"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat("CSV")}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      format === "CSV" 
                        ? "bg-energy/10 border-energy text-energy" 
                        : "bg-base border-borderDefault hover:bg-elevated text-textSecondary"
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    CSV / Excel
                  </button>
                </div>
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-energy hover:bg-energy/90 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Compiling Disclosures...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Generate ESG Report
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Verification / Compilation success Toast card */}
          {success && (
            <div className="p-4 bg-green/5 border border-green/20 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top duration-300">
              <CheckCircle className="w-5 h-5 text-green shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-textPrimary">ESG Compilation Complete</p>
                <p className="text-[10px] text-textSecondary mt-0.5 leading-relaxed">
                  Your certified {format} sustainability document has been compiled for {period}. 
                  <a href="#" className="text-energy font-bold hover:underline block mt-1">Download compiled file</a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Recharts and CSRD parameters overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly progress area chart */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-sm font-bold text-textPrimary font-headline">CSRD Carbon Offset Path</h4>
                <p className="text-xs text-textSecondary mt-0.5">Aggregated carbon reduction trend (Tons CO₂ Offset)</p>
              </div>
              <Calendar className="w-4 h-4 text-textSecondary" />
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyReportData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="savedColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.3} />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={10} />
                  <YAxis stroke="var(--text-secondary)" fontSize={10} />
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
                    dataKey="Saved" 
                    stroke="var(--accent-green)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#savedColor)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CSRD Goals Table */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-6 overflow-hidden">
            <h4 className="text-sm font-bold text-textPrimary font-headline mb-4">CSRD Compliance Audits</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-borderDefault text-textSecondary font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5">Scope Category</th>
                    <th className="py-2.5">Operational Target</th>
                    <th className="py-2.5">Current Progress</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderDefault/50">
                  {esgMetrics.map((metric) => (
                    <tr key={metric.category} className="hover:bg-elevated/45 transition-colors">
                      <td className="py-3 font-semibold text-textPrimary">{metric.category}</td>
                      <td className="py-3 text-textSecondary">{metric.goal}</td>
                      <td className="py-3 text-textPrimary font-mono">{metric.current}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          metric.status === "exceeded" 
                            ? "bg-green/10 text-green" 
                            : "bg-energy/10 text-energy"
                        }`}>
                          {metric.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
