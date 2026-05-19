import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface TodoSearchBarProps {
  filter: string;
  resultsCount: number;
  onChangeFilter: (value: string) => void;
  onClearFilter: () => void;
}

export const TodoSearchBar = ({
  filter,
  resultsCount,
  onChangeFilter,
  onClearFilter,
}: TodoSearchBarProps) => (
  <div className="p-4 border-b border-gray-100">
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={filter}
        onChange={(e) => onChangeFilter(e.target.value)}
        placeholder="Search TODOs..."
        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
      />
      {filter && (
        <button
          onClick={onClearFilter}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>

    {filter && (
      <p className="text-xs text-gray-400 mt-2 px-1">
        {resultsCount} result{resultsCount !== 1 ? "s" : ""} for{" "}
        <span className="font-medium text-gray-600">"{filter}"</span>
      </p>
    )}
  </div>
);
