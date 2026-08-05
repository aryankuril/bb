const brands = [
  "SOEZI",
  "be&a",
  "COLORBOX",
  "MY SUIT TAILOR",
  "Learnathon",
  "Parle Agro",
  "MASON HOME",
  "ERITAAJ",
  "BROOKS",
  "VPADEL",
  "VERO MODA",
];

export function LogoMarquee() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y bg-sand py-8">
      <p className="eyebrow container mb-6 block">Brands that trust our work</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="text-muted-foreground hover:text-foreground font-display text-lg font-extrabold tracking-tight whitespace-nowrap transition-colors sm:text-2xl"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
