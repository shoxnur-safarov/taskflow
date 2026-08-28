export default function ProductPreview() {
  return (
    <section id="preview" className="px-4 sm:px-6 pb-16">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted-bg">
          <span className="w-2.5 h-2.5 rounded-full bg-danger/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
        </div>

        {/* Mock dashboard content */}
        <div className="p-4 sm:p-6 bg-muted-bg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-3 w-32 bg-border rounded" />
            <div className="h-7 w-20 bg-primary rounded-lg" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["To Do", "In Progress", "Done"].map((col, colIdx) => (
              <div key={col} className="bg-card border border-border rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      colIdx === 0 ? "bg-status-todo" : colIdx === 1 ? "bg-status-progress" : "bg-status-done"
                    }`}
                  />
                  <span className="text-[10px] sm:text-xs font-medium text-muted">{col}</span>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: colIdx === 1 ? 3 : 2 }).map((_, i) => (
                    <div key={i} className="bg-muted-bg rounded-md p-2">
                      <div className="h-2 bg-border rounded w-full mb-1.5" />
                      <div className="h-2 bg-border rounded w-2/3" />
                      <div className="flex items-center justify-between mt-2">
                        <div className="h-3 w-8 rounded bg-primary-light" />
                        <div className="w-4 h-4 rounded-full bg-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}