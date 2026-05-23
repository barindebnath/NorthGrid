"use client";

import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { kpiCards, carbonData, renewableMix, leaderboard } from "@/lib/data";

const COLORS = ["#60a5fa", "#22c55e", "#f59e0b", "#ef4444"];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-borderDefault bg-surface p-5">
            <p className="text-sm text-textSecondary">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            <p className="mt-1 text-sm text-green">{card.delta} vs last month</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-borderDefault bg-surface p-5 lg:col-span-2">
          <h2 className="mb-4 font-semibold">Carbon Intensity Trend</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="intensity" stroke="#60a5fa" fill="#60a5fa33" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-borderDefault bg-surface p-5">
          <h2 className="mb-4 font-semibold">Renewable Production Mix</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={renewableMix} dataKey="value" nameKey="name" outerRadius={100}>
                  {renewableMix.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-borderDefault bg-surface p-5">
        <h2 className="mb-4 font-semibold">Sustainability Leaderboard</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={leaderboard} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="score" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
