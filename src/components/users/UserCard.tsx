import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import type { User } from "../../types";
import { UserInitialsAvatar } from "./UserInitialsAvatar";

interface Props {
  user: User;
}

export const UserCard = ({ user }: Props) => {
  return (
    <Link
      to={`/users/${user.id}`}
      className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-indigo-300 transition-all group"
    >
      <div className="flex items-center gap-4">
        <UserInitialsAvatar
          name={user.name}
          containerClassName="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"
          textClassName="text-indigo-700 font-semibold text-sm"
        />

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
        </div>

        <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5 truncate">
          <EnvelopeIcon className="w-3 h-3 flex-shrink-0" />
          {user.email}
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <MapPinIcon className="w-3 h-3 flex-shrink-0" />
          {user.address.city}
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <GlobeAltIcon className="w-3 h-3 flex-shrink-0" />
          {user.website}
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <BuildingOfficeIcon className="w-3 h-3 flex-shrink-0" />
          {user.company.name}
        </span>
      </div>
    </Link>
  );
};
