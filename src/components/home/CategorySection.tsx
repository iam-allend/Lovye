const categories = [
  "Birthday",
  "Confess",
  "Anniversary",
  "Apology",
  "Graduation",
  "Long Message",
];

export default function CategorySection() {
  return (
    <section
      id="categories"
      className="px-4 py-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <div
              key={item}
              className="
                rounded-full
                border
                border-white/70
                bg-white/55
                px-5
                py-3
                text-sm
                font-medium
                text-[#5d4b55]
                shadow-soft
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:bg-white
              "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}