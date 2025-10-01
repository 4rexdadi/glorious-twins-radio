"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	return (
		<div className="flex h-screen" style={{ backgroundColor: "#FFF8ED" }}>
			<AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

			<div className="flex-1 flex flex-col overflow-hidden">
				<AdminHeader
					onMenuToggle={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>

				<main className="flex-1 overflow-y-auto">
					<div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
