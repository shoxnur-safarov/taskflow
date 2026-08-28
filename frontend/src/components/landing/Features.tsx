import { FolderKanban, LayoutGrid, Users } from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Loyiha boshqaruvi",
    description: "Barcha loyihalaringizni bir joyda tashkil qiling, muddatlarni kuzating va jamoangiz bilan muvofiqlashtiring.",
  },
  {
    icon: LayoutGrid,
    title: "Kanban Board",
    description: "Vazifalarni ustunlar bo'ylab suring, ishning holatini bir qarashda ko'ring.",
  },
  {
    icon: Users,
    title: "Jamoaviy hamkorlik",
    description: "Izohlar, eslatmalar va real vaqtda yangilanishlar orqali jamoangiz bilan samarali ishlang.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 sm:px-6 py-16 bg-muted-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {"Tezroq ishlash uchun kerak bo'lgan hammasi"}
          </h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Vazifalarni tartibga solishdan tortib, jamoangiz bilan hamkorlikgacha.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-card border border-border rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}