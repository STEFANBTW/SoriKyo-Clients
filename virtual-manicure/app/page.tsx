"use client";

import dynamic from 'next/dynamic';

const HandTracker = dynamic(() => import('./components/AR/HandTracker'), {
  ssr: false,
  loading: () => <div className="text-white text-center mt-20">Loading Virtual Manicure Experience...</div>
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <HandTracker />
    </main>
  );
}
