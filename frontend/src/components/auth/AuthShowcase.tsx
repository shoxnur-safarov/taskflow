export default function AuthShowcase() {
  return (
    <div className="w-full h-full bg-primary-light flex flex-col items-center justify-center overflow-hidden px-12 relative">
      <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl -top-10 -right-10" />
      <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl bottom-10 -left-10" />

      <div className="relative max-w-md text-center mb-16 z-10">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Ishlaringizni tartibga soling
        </h2>
        <p className="text-muted">
          TaskFlow bilan jamoangiz bilan birga loyihalarni boshqaring, vazifalarni kuzating va
          maqsadlaringizga tezroq eting.
        </p>
      </div>

      <div className="relative w-80 h-64 mb-8 z-10">
        <div className="absolute top-14 left-0 w-52 rounded-xl bg-card border border-border shadow-lg p-4 rotate-[-6deg] animate-float-slow">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-status-todo" />
            <span className="text-xs font-medium text-muted">To Do</span>
          </div>
          <div className="h-2.5 bg-border rounded w-full mb-2" />
          <div className="h-2.5 bg-border rounded w-2/3" />
        </div>

        <div className="absolute top-0 right-0 w-52 rounded-xl bg-card border border-border shadow-xl p-4 rotate-[4deg] animate-float">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-status-progress" />
            <span className="text-xs font-medium text-muted">In Progress</span>
          </div>
          <div className="h-2.5 bg-primary-light rounded w-full mb-2" />
          <div className="h-2.5 bg-primary-light rounded w-3/4 mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-primary border-2 border-card" />
              <div className="w-5 h-5 rounded-full bg-priority-medium border-2 border-card" />
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-priority-high/10 text-priority-high font-medium">
              High
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 left-16 w-52 rounded-xl bg-card border border-border shadow-2xl p-4 rotate-[-2deg] animate-float-slower">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-status-done" />
            <span className="text-xs font-medium text-muted">Done</span>
          </div>
          <div className="h-2.5 bg-border rounded w-full mb-2 opacity-50" />
          <div className="h-2.5 bg-border rounded w-1/2 opacity-50" />
        </div>
      </div>
    </div>
  );
}   