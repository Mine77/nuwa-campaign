'use client'

import { SessionProvider } from "next-auth/react";
import { FloatingNav } from "../navigation/FloatingNav";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <FloatingNav />
            {children}
        </SessionProvider>
    );
} 