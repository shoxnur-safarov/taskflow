interface ActivityItem {
  id: number;
  userName: string;
  action: string;
  time: string;
}

const mockActivityFeed: ActivityItem[] = [
  { id: 1, userName: "Alisher", action: "vazifa holatini \"Done\" ga o'zgartirdi", time: "10 daqiqa oldin" },
  { id: 2, userName: "Sardor", action: "\"Fix authentication bug\" vazifasiga izoh qoldirdi", time: "2 soat oldin" },
  { id: 3, userName: "Alisher", action: "sizga vazifa biriktirdi", time: "5 soat oldin" },
  { id: 4, userName: "Malika", action: "loyihaga qo'shildi", time: "Kecha" },
  { id: 5, userName: "Alisher", action: "\"Design system tokens\" vazifasini yaratdi", time: "3 kun oldin" },
];

export default function ActivityFeed() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
      <h3 className="font-semibold text-foreground mb-4">Faoliyat tarixi</h3>
      <div className="space-y-4">
        {mockActivityFeed.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
              {item.userName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{item.userName}</span> {item.action}
              </p>
              <p className="text-xs text-muted mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}