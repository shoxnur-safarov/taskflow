import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-muted-bg flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="text-muted" size={28} />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">Sahifa topilmadi</h1>
        <p className="text-sm text-muted mb-6 max-w-sm">
          {"Siz izlayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin."}
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Dashboardga qaytish
        </Link>
      </div>
    </div>
  );
}