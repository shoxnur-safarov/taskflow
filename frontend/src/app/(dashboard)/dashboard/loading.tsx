export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="h-7 w-48 bg-border rounded mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-border rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-64 bg-border rounded-xl" />
        <div className="h-64 bg-border rounded-xl" />
      </div>
    </div>
  );
}