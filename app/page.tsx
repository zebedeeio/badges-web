'use client';

import { useEffect } from "react";

export default function Home() {
  const fetchUserBadges = async () => {
    
  }

  useEffect(() => {
    fetchUserBadges();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
    </main>
  );
}
