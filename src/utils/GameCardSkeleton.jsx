import React from "react";

const GameCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] shadow-lg w-full h-full animate-pulse">
      {/* Image area */}
      <div className="relative aspect-[16/9] overflow-hidden w-full rounded-t-lg">
        <div
          className="w-full h-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:1000px_100%]"
          style={{
            animation: "shimmer 2s infinite linear",
            backgroundSize: "1000px 100%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* overlay shimmer brighter line moving across) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            animation: "shimmer 2s infinite linear",
            backgroundSize: "1000px 100%",
          }}
        ></div>
      </div>

      {/* content area */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 bg-zinc-700 rounded-md relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700"
            style={{
              animation: "shimmer 2s infinite linear",
              backgroundSize: "1000px 100%",
            }}
          />
        </div>

        {/* genre tags */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 w-12 bg-zinc-700 rounded-md relative overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700"
                style={{
                  animation: "shimmer 2s infinite linear",
                  backgroundSize: "1000px 100%",
                }}
              />
            </div>
          ))}
        </div>

        {/* footer metrics */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-zinc-700 rounded-md relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700"
              style={{
                animation: "shimmer 2s infinite linear",
                backgroundSize: "1000px 100%",
              }}
            />
          </div>

          <div className="h-4 w-10 bg-zinc-700 rounded-md relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700"
              style={{
                animation: "shimmer 2s infinite linear",
                backgroundSize: "1000px 100%",
              }}
            />
          </div>
        </div>
      </div>

      {/* border glow */}
      <div className="absolute inset-0 rounded-lg border-2 border-transparent hover:border-purple-500/30 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

export default GameCardSkeleton;
