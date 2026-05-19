import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useFetch } from "../hooks/useFetch";
import { AlbumList, TodoList, Spinner, ErrorMessage } from "../components";
import type { User } from "../types";
import { UserInfoChip, UserInitialsAvatar, UserTabs } from "../components";

type Tab = "albums" | "todos";

export const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("albums");

  const {
    data: user,
    loading,
    error,
  } = useFetch<User>(id ? `https://jsonplaceholder.typicode.com/users/${id}` : null);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "albums", label: "Albums" },
    { key: "todos", label: "ToDos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>

        {/* Profile card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <UserInitialsAvatar
                name={user.name}
                containerClassName="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center"
                textClassName="text-indigo-700 font-bold text-xl"
              />
            </div>

            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm mb-5">@{user.username}</p>

            <div className="grid grid-cols-2 gap-3">
              <UserInfoChip icon={EnvelopeIcon} label="Email" value={user.email} />
              <UserInfoChip icon={MapPinIcon} label="City" value={user.address.city} />
              <UserInfoChip icon={GlobeAltIcon} label="Website" value={user.website} />
              <UserInfoChip icon={BuildingOfficeIcon} label="Company" value={user.company.name} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <UserTabs tabs={tabs} activeTab={activeTab} onSelectTab={setActiveTab} />

          <div className="p-4">
            {activeTab === "albums" && <AlbumList userId={user.id} />}
            {activeTab === "todos" && <TodoList userId={user.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};
