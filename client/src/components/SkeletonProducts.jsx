import React from 'react'

export default function SkeletonProducts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-100 bg-gray-500/30 animate-pulse"
                >
                  <div className="h-2/3 bg-gray-500/40"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-500/40 w-3/4"></div>
                    <div className="h-3 bg-gray-500/40 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
  )
}
