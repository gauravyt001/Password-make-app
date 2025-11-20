import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 
          ${
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-slate-300 group-hover:border-blue-400'
          }`}
        >
          <Check 
            size={16} 
            className={`text-white transition-transform duration-200 ${checked ? 'scale-100' : 'scale-0'}`} 
            strokeWidth={3}
          />
        </div>
      </div>
      <span className="text-slate-700 font-medium select-none group-hover:text-slate-900">
        {label}
      </span>
    </label>
  );
};