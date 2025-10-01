"use client";

import { Bell, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

interface AdminHeaderProps {
	onMenuToggle: () => void;
	isSidebarOpen: boolean;
}

const AdminHeader = ({ onMenuToggle, isSidebarOpen }: AdminHeaderProps) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
			<div className="flex items-center justify-between px-4 lg:px-6 py-4">
				{/* Mobile menu button and search */}
				<div className="flex items-center gap-3 flex-1 lg:flex-none">
					<button
						onClick={onMenuToggle}
						className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
						aria-label="Toggle menu"
					>
						{isSidebarOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>

					{/* Mobile search toggle */}
					<button
						onClick={() => setIsSearchOpen(!isSearchOpen)}
						className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
						aria-label="Toggle search"
					>
						<Search className="w-5 h-5" />
					</button>

					{/* Desktop search */}
					<div className="hidden md:block relative max-w-md w-full">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Right side items */}
				<div className="flex items-center gap-2 lg:gap-4">
					<button
						title="Notifications"
						type="button"
						className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
					>
						<Bell className="w-5 h-5 lg:w-6 lg:h-6" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
					</button>

					<div className="flex items-center gap-2 lg:gap-3">
						<div className="hidden sm:block text-right">
							<p className="text-sm font-semibold text-gray-900">Admin User</p>
							<p className="text-xs text-gray-500">Administrator</p>
						</div>
						<div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-600 rounded-full flex items-center justify-center">
							<User className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile search bar */}
			{isSearchOpen && (
				<div className="md:hidden px-4 pb-4 border-t border-gray-200">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
							autoFocus
						/>
					</div>
				</div>
			)}
		</header>
	);
};

export default AdminHeader;
