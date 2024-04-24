'use client';

import { getBadgeAwardees, getBadgeDetails } from "@/lib/nostrapi";
import { BadgeAwardees } from "@/components/badge-awardees";
import { BadgeCard } from "@/components/badge-card";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BadgeDetailsView() {
  const [badge, setBadge]: [any, Function] = useState(null);
  const [fetching, setFetching] = useState(true);

  const [awardees, setAwardees]: [any, Function] = useState(null);
  const [awardeesFetching, setAwardeesFetching] = useState(true);

  const { id }: { id: string } = useParams();

  const getBadge = async (badgeId: string) => {
    const { data, error } = await getBadgeDetails(badgeId);

    if (error) {
      toast.error('Could not fetch Badge data.');
      setFetching(false);
    } else {
      setBadge(data.data);
      setFetching(false);
    }

    const { 
      data: awardeesData, 
      error: awardeesError,
    } = await getBadgeAwardees(badgeId);

    if (awardeesError) {
      toast.error('Could not fetch Badge Awardees.');
      setAwardeesFetching(false);
    } else {
      setAwardees(awardeesData.data);
      setAwardeesFetching(false);
    }
  }

  useEffect(() => {
    getBadge(id);
  }, [id]);

  return (
    <main className="flex min-h-screen max-w-[800px] mx-auto flex-col pb-24 pt-8">
      <div className="flex flex-row items-start justify-center">
        <BadgeCard badge={badge} loading={fetching} />
        <BadgeAwardees awardees={awardees} loading={awardeesFetching} />
      </div>
    </main>
  );
}
