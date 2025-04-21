'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GridCards } from "@/app/components/cards/GridCards";
import { motion } from "framer-motion";
import { useEffect } from "react";

// 定义淡入动画变体
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function OthersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!session) {
        return null;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-6xl mx-auto mt-20"
            >
                <div className="w-full">
                    <GridCards />
                </div>
            </motion.div>
        </main>
    );
} 