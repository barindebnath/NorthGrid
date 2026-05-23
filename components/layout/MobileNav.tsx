"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Zap, Plus, BarChart3, Settings } from "lucide-react";

interface MobileNavProps {
  onLogClick?: () => void;
}

export default function MobileNav({ onLogClick }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Energy", href: "/energy", icon: Zap },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-borderDefault z-30 flex items-center justify-around h-16 px-4">
      {/* First two navigation items */}
      {navItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
              isActive ? "text-energy font-bold" : "text-textSecondary"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}

      {/* Central Floating Activity Button */}
      <button
        onClick={onLogClick}
        className="flex flex-col items-center justify-center -mt-6 mx-2 shrink-0 group focus:outline-none"
        aria-label="Log Commute Activity"
      >
        <div className="w-12 h-12 bg-energy hover:bg-energy/90 text-white rounded-full shadow-lg shadow-energy/35 flex items-center justify-center transition-transform active:scale-95 group-hover:scale-105">
          <Plus className="w-6 h-6" />
        </div>
      </button>

      {/* Last two navigation items */}
      {navItems.slice(2).map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
              isActive ? "text-energy font-bold" : "text-textSecondary"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
