import { FolderPlus, ListPlus, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    title: "Workspace yarating",
    description: "Jamoangiz uchun bir necha soniyada workspace tashkil qiling.",
  },
  {
    icon: ListPlus,
    title: "Vazifalar qo'shing",
    description: "Loyihalaringizni yarating va vazifalarni taqsimlang.",
  },
  {
    icon: TrendingUp,
    title: "Jarayonni kuzating",
    description: "Kanban board orqali ishning holatini real vaqtda ko'ring.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 sm:px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Samaradorlik uchun yaratilgan</h2>
          <p className="mt-3 text-muted">Bir necha oddiy qadamda ishga tushiring.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-sm text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}