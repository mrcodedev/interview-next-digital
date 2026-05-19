import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

type NavLink = {
  to: string;
  label: string;
  icon: FC<{ className?: string }>;
};

const links: NavLink[] = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/users", label: "Users", icon: UsersIcon },
];

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-indigo-600">
          SocialApp
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                pathname === to ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
