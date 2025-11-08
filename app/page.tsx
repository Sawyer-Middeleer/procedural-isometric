'use client';

import dynamic from 'next/dynamic';

// Dynamically import PixiApp to avoid SSR issues
const PixiApp = dynamic(() => import('@/components/PixiApp'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-white text-xl">Loading canvas...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="border-2 border-gray-700 rounded-lg overflow-hidden shadow-2xl">
        <PixiApp />
      </div>
    </main>
  );
}
