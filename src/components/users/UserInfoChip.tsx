import type { FC } from "react";

type HeroIcon = FC<{ className?: string }>;

interface UserInfoChipProps {
  icon: HeroIcon;
  label: string;
  value: string;
}

export const UserInfoChip = ({ icon: Icon, label, value }: UserInfoChipProps) => (
  <div className="bg-gray-50 rounded-xl px-3 py-2.5">
    <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {label}
    </p>
    <p className="text-sm text-gray-800 font-medium truncate">{value}</p>
  </div>
);
