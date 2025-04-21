'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GridHoverHero } from "@/app/components/hero/GridHoverHero";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <GridHoverHero />;
  }

  return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
} 