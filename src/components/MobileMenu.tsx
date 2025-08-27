"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onListenLive: () => void;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
];

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isDark,
  onToggleTheme,
  onListenLive,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg animate-in slide-in-from-top-2 duration-200"
    >
      <div className="px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg font-medium transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}

        {/* Mobile Actions */}
        <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {}}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Contact
          </button>

          <button
            type="button"
            className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Contact
          </button>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Theme
            </span>
            <ThemeToggle
              isDark={isDark}
              onToggle={onToggleTheme}
              variant="mobile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
