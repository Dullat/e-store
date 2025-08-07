const GamePageSkeleton = () => (
  <div className="max-w-[1200px] m-auto p-4">
    <div className="grid lg:grid-cols-[5fr_2fr] gap-4">
      
      <div className="relative w-full min-h-[340px] bg-gray-800 rounded-2xl overflow-hidden">
        <div className="w-full h-full skeleton-shimmer" />
      </div>
      <div className="flex flex-col gap-5 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow">
        <div className="h-10 w-2/3 bg-gray-700 rounded-md relative overflow-hidden skeleton-shimmer" />
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-gray-700 opacity-80 rounded-full skeleton-shimmer" />
          <div className="h-4 w-12 bg-gray-700 opacity-80 rounded-full skeleton-shimmer" />
          <div className="h-4 w-10 bg-gray-700 opacity-80 rounded-full skeleton-shimmer" />
        </div>
        <div className="h-8 w-1/2 bg-blue-600/50 rounded-lg mt-4 skeleton-shimmer" />
        <div className="h-20 w-full bg-gray-700/70 rounded-lg mt-4 skeleton-shimmer" />
        <div className="h-4 w-1/3 bg-gray-700 opacity-80 rounded-full skeleton-shimmer mt-2" />
      </div>
    </div>
  </div>
);

export default GamePageSkeleton;
