import React, { useState } from "react";
import { FaUser, FaCertificate, FaHistory, FaTrophy, FaBook, FaFileAlt, FaVideo, FaGamepad, FaChevronDown, FaChevronRight } from "react-icons/fa";

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface SidebarGroup {
    title: string;
    items: SidebarItem[];
}

interface DashboardSidebarProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, onTabChange }) => {
    const menuGroups: SidebarGroup[] = [
        {
            title: "User Login LPK PB Merdeka",
            items: [
                { id: "profil", label: "Profil User", icon: <FaUser /> },
                { id: "program", label: "Program yang diikuti", icon: <FaFileAlt /> },
                { id: "sertifikat", label: "Sertifikat Digital", icon: <FaCertificate /> },
                { id: "riwayat", label: "Riwayat Kompetisi", icon: <FaHistory /> },
            ],
        },
        {
            title: "Kompetisi",
            items: [
                { id: "kompetisi-aktif", label: "Kompetisi Aktif", icon: <FaTrophy /> },
                { id: "rulebook", label: "Rulebook & Tata Tertib", icon: <FaBook /> }, // Using Book for rules
                { id: "pendaftaran", label: "Pendaftaran", icon: <FaFileAlt /> },
                { id: "leaderboard", label: "Leaderboard", icon: <FaTrophy /> },
                { id: "arsip", label: "Arsip Kompetisi", icon: <FaHistory /> },
            ],
        },
        {
            title: "Materi",
            items: [
                { id: "artikel", label: "Artikel Edukasi", icon: <FaBook /> },
                { id: "ebook", label: "E-Book", icon: <FaBook /> },
                { id: "video", label: "Video Tutorial", icon: <FaVideo /> },
                { id: "kuis", label: "Kuis Ringan", icon: <FaGamepad /> },
            ],
        },
    ];

    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (title: string) => {
        setCollapsedGroups(prev => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <aside className="w-full md:w-64 bg-white shadow-lg md:h-[calc(100vh-80px)] overflow-y-auto sticky top-20 rounded-xl md:rounded-none md:bg-transparent md:shadow-none">
            <div className="p-4 space-y-6">
                {menuGroups.map((group) => (
                    <div key={group.title}>
                        <button
                            onClick={() => toggleGroup(group.title)}
                            className="flex items-center justify-between w-full text-left mb-2 group"
                        >
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-red-600 transition-colors">
                                {group.title}
                            </h3>
                            <span className="text-gray-400">
                                {collapsedGroups[group.title] ? <FaChevronRight size={10} /> : <FaChevronDown size={10} />}
                            </span>
                        </button>

                        {!collapsedGroups[group.title] && (
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onTabChange(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.id
                                                ? "bg-red-50 text-red-600 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                    >
                                        <span className={`${activeTab === item.id ? "text-red-600" : "text-gray-400"}`}>
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};
