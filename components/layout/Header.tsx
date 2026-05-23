"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Sun, Moon, HelpCircle, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check initial HTML class
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Human readable title mapping
  const pageTitle = () => {
    const segment = pathname.split("/")[1];
    if (!segment) return "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md border-b border-borderDefault">
      <div className="flex justify-between items-center w-full px-6 h-16 max-w-[1440px] mx-auto">
        {/* Title and Mobile Menu trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden text-textSecondary hover:text-textPrimary"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary capitalize font-headline">
            {pageTitle()}
          </h1>
        </div>

        {/* Search bar (desktop only) */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              placeholder="Search insights or assets..."
              className="w-full bg-elevated border border-borderDefault rounded-full pl-10 pr-4 py-1.5 text-xs text-textPrimary placeholder:text-textSecondary focus:outline-none focus:ring-2 focus:ring-energy/20 focus:border-energy transition-all duration-150"
            />
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 text-textSecondary hover:text-textPrimary transition-colors rounded-lg hover:bg-elevated"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button
            className="p-2 text-textSecondary hover:text-textPrimary transition-colors rounded-lg hover:bg-elevated relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger animate-pulse"></span>
          </button>

          {/* Help Shortcut */}
          <button
            className="p-2 text-textSecondary hover:text-textPrimary transition-colors rounded-lg hover:bg-elevated hidden sm:block"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-borderDefault ml-2 cursor-pointer hover:border-energy transition-colors">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpWCpQ3C311MI-d31gTbAv19fI0AWSlfnPhyya_UayvmkMP_IAjOtClD0j4NeTOnu2vQZta1jltIpn4jvQrzYUR67sQnTA7_gy5I9kV8fo8VWc7GMVBUF14yDX8Ts1pADJREHA1gm_orivR9TSGqolXwIyKkSZzHmMU3fwllCYCN5xzhrorxly50_UC442cqr_PHWLPGHtk_wdgLPTS9pg2OOlcOJ2ovAPnn98QsKxvLtH-jZ7360cGgfQhxx4U8YAT0lx1qI4o6Q"
              alt="User profile avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
