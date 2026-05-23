"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Zap, 
  Car, 
  BarChart3, 
  Calculator, 
  Settings, 
  PlusCircle, 
  HelpCircle, 
  User 
} from "lucide-react";

interface SidebarProps {
  onLogClick?: () => void;
}

export default function Sidebar({ onLogClick }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Energy", href: "/energy", icon: Zap },
    { name: "Mobility", href: "/mobility", icon: Car },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Calculator", href: "/calculator", icon: Calculator },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface border-r border-borderDefault z-30 p-4 space-y-2">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center bg-energy/10 text-energy">
          <Zap className="w-6 h-6 fill-current" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-textPrimary leading-none font-headline">NorthGrid</h1>
          <p className="text-[10px] text-textSecondary tracking-wider uppercase font-medium mt-1">
            Sustainability Intel
          </p>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 active:scale-[0.98] font-body text-sm font-medium ${
                isActive
                  ? "bg-energy/10 text-energy border-l-2 border-energy font-bold"
                  : "text-textSecondary hover:bg-elevated hover:text-textPrimary"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-energy" : "text-textSecondary"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Action and Footer section */}
      <div className="pt-4 border-t border-borderDefault space-y-1">
        <button
          onClick={onLogClick}
          className="w-full bg-energy text-white py-2.5 rounded-xl text-sm font-bold mb-4 shadow-lg shadow-energy/10 hover:bg-energy/90 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Log Commute
        </button>
        <Link
          href="/support"
          className="flex items-center gap-3 px-4 py-3 text-textSecondary hover:bg-elevated hover:text-textPrimary rounded-xl transition-all font-body text-sm font-medium"
        >
          <HelpCircle className="w-5 h-5" />
          Support
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-textSecondary hover:bg-elevated hover:text-textPrimary rounded-xl transition-all font-body text-sm font-medium"
        >
          <User className="w-5 h-5" />
          Account
        </Link>
      </div>
    </aside>
  );
}
