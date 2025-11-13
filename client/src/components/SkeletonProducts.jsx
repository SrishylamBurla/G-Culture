import React from 'react'

export default function SkeletonProducts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-84 bg-gray-800/30 animate-pulse border border-gray-700"
                >
                  <div className="h-2/3 bg-gray-700/40 rounded-t-lg"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-700/40 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700/40 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
  )
}
