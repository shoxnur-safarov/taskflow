import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg text-foreground">TaskFlow</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted hover:text-foreground transition-colors">
            Imkoniyatlar
          </a>
          <a href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">
            Qanday ishlaydi
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:block">
            Kirish
          </Link>
          <Link
            href="/sign-up"
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Boshlash
          </Link>
        </div>
      </div>
    </header>
  );
}