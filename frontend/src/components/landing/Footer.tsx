const footerLinks = {
  Mahsulot: ["Imkoniyatlar", "Narxlar", "Yangiliklar"],
  Kompaniya: ["Biz haqimizda", "Blog", "Aloqa"],
  Huquqiy: ["Maxfiylik siyosati", "Foydalanish shartlari"],
};

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-10 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="font-bold text-foreground">TaskFlow</span>
          </div>
          <p className="text-xs text-muted">Jamoangiz uchun loyiha boshqaruvi.</p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-border text-xs text-muted text-center">
        © 2026 TaskFlow. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}