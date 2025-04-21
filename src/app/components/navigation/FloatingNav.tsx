import { motion } from "framer-motion";
import { FiUser, FiAward, FiHome } from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    title: string;
    icon: IconType;
    path: string;
}

export const FloatingNav = () => {
    const pathname = usePathname();

    const navItems: NavItem[] = [
        {
            title: "Home",
            icon: FiHome,
            path: "/",

        },
        {
            title: "Leaderboard",
            icon: FiAward,
            path: "/leaderboard",
        },
        {
            title: "My Profile",
            icon: FiUser,
            path: "/profile",
        },
    ];

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="flex items-center justify-center space-x-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${pathname === item.path
                            ? "bg-violet-600 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}; 