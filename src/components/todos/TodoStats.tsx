type StatColor = "indigo" | "amber" | "green";

interface StatCardProps {
  label: string;
  value: number;
  color: StatColor;
}

const StatCard = ({ label, value, color }: StatCardProps) => {
  const colors: Record<StatColor, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className={`rounded-2xl p-4 ${colors[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium opacity-70 mt-0.5">{label}</p>
    </div>
  );
};

interface TodoStatsProps {
  total: number;
  pending: number;
  completed: number;
}

export const TodoStats = ({ total, pending, completed }: TodoStatsProps) => (
  <div className="grid grid-cols-3 gap-3">
    <StatCard label="Total" value={total} color="indigo" />
    <StatCard label="Pending" value={pending} color="amber" />
    <StatCard label="Done" value={completed} color="green" />
  </div>
);
