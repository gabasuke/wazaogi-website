type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-lantern sm:text-xs sm:tracking-[0.34em]">{eyebrow}</p>
      <h2 className="jp-heading font-display text-[1.45rem] font-semibold leading-[1.32] text-white min-[380px]:text-[1.7rem] sm:text-4xl sm:leading-tight lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 w-full max-w-2xl text-sm leading-7 text-mist/82 sm:mt-5 sm:text-base sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}
