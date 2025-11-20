import React from 'react';

interface StrengthIndicatorProps {
  strength: 'Weak' | 'Medium' | 'Strong';
}

export const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ strength }) => {
  const getColor = () => {
    switch (strength) {
      case 'Strong': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Weak': return 'bg-red-500';
      default: return 'bg-slate-200';
    }
  };

  const getWidth = () => {
    switch (strength) {
      case 'Strong': return 'w-full';
      case 'Medium': return 'w-2/3';
      case 'Weak': return 'w-1/3';
      default: return 'w-0';
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Strength</span>
        <span className="text-xs font-bold text-slate-700 uppercase">{strength}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${getColor()} ${getWidth()} transition-all duration-300 ease-out rounded-full`} />
      </div>
    </div>
  );
};