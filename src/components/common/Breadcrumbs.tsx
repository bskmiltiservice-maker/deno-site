import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 text-sm text-slate-500">
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="inline-flex items-center">
          <button
            onClick={items[0]?.onClick}
            className="hover:text-[#1E3A8A] transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Accueil"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Accueil</span>
          </button>
        </li>

        {items.slice(1).map((item, index) => (
          <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            {item.active || !item.onClick ? (
              <span className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-[#1E3A8A] transition-colors truncate max-w-[150px] sm:max-w-none cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
