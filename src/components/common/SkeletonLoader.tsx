import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft animate-pulse flex flex-col justify-between h-[420px]">
      <div>
        <div className="w-full h-56 bg-slate-200/70 rounded-2xl mb-4" />
        <div className="h-3.5 bg-slate-200/70 rounded w-1/3 mb-2" />
        <div className="h-5 bg-slate-200/70 rounded w-3/4 mb-3" />
        <div className="h-3 bg-slate-200/70 rounded w-full mb-1" />
        <div className="h-3 bg-slate-200/70 rounded w-2/3" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="h-6 bg-slate-200/70 rounded w-16" />
        <div className="h-9 bg-slate-200/70 rounded-xl w-24" />
      </div>
    </div>
  );
};

export const CatalogSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
