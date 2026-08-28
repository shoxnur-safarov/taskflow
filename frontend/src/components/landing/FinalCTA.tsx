import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 py-16 bg-primary-light">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Ishni tartibga soling. Loyihalarni oldinga suring.
        </h2>
        <Link
          href="/sign-up"
          className="inline-block mt-6 bg-primary text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Bepul boshlash
        </Link>
      </div>
    </section>
  );
}