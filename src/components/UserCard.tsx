import { Link } from "react-router-dom";
import type { User } from "../types";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      to={`/users/${user.id}`}
      className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-indigo-300 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-700 font-semibold text-sm">{initials}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1 truncate">
          <span>Email:</span> {user.email}
        </span>
        <span className="flex items-center gap-1 truncate">
          <span>Address:</span> {user.address.city}
        </span>
        <span className="flex items-center gap-1 truncate">
          <span>Website:</span> {user.website}
        </span>
        <span className="flex items-center gap-1 truncate">
          <span>Company:</span> {user.company.name}
        </span>
      </div>
    </Link>
  );
}
