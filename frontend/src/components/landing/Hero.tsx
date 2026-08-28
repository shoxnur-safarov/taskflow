import Link from "next/link";

export default function Hero() {
    return (
        <section className="pt-16 sm:pt-24 pb-12 px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
                Ishni tartibga soling. Loyihalarni oldinga suring.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted max-w-xl mx-auto">
                TaskFlow jamoangiz va vazifalaringizni birlashtiradi — yuqori tezlikdagi ishchi jarayonlar
                {"uchun mo'ljallangan loyiha boshqaruv platformasi."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                    href="/sign-up"
                    className="w-full sm:w-auto bg-primary text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Boshlash
                </Link>
                <a
                    href="#preview"
                    className="w-full sm:w-auto border border-border text-foreground text-sm font-medium px-6 py-3 rounded-lg hover:bg-muted-bg transition-colors"
                >
                    {"Demo ko'rish"}
                </a>
            </div>
        </section>
    );
}