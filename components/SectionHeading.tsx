type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-lantern">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-mist/82 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
