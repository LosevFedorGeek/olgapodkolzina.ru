import React from 'react';
import { Palette } from 'lucide-react';

interface AdminFloatingBadgeProps {
  onOpen: () => void;
  isAuthorized: boolean;
}

export const AdminFloatingBadge: React.FC<AdminFloatingBadgeProps> = ({ onOpen, isAuthorized }) => {
  if (!isAuthorized) return null;

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-[#2A1525]/95 text-[#E8BD6F] border border-[#D99E41]/50 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:bg-[#381B32] active:scale-95 transition-all duration-200 cursor-pointer font-sans text-xs font-semibold tracking-wider uppercase group"
      title="Панель автора Ольги Подколзиной"
      aria-label="Панель автора"
    >
      <Palette className="w-4 h-4 text-[#D99E41] group-hover:rotate-12 transition-transform" />
      <span>Панель автора</span>
    </button>
  );
};
