interface UserTabsProps<T extends string> {
  tabs: readonly { key: T; label: string }[];
  activeTab: T;
  onSelectTab: (tab: T) => void;
}

export const UserTabs = <T extends string>({ tabs, activeTab, onSelectTab }: UserTabsProps<T>) => (
  <div className="flex border-b border-gray-100">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() => onSelectTab(tab.key)}
        className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative cursor-pointer ${
          activeTab === tab.key
            ? "text-indigo-600"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        {tab.label}
        {activeTab === tab.key && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
        )}
      </button>
    ))}
  </div>
);
