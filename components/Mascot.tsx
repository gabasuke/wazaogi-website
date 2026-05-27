import Image from "next/image";

type Props = {
  alt: string;
  className?: string;
  priority?: boolean;
};

export function Mascot({ alt, className = "", priority = false }: Props) {
  return (
    <Image
      src="/images/wazaogi-mascot-icon-round.png"
      alt={alt}
      width={920}
      height={920}
      priority={priority}
      unoptimized
      className={`rounded-full object-cover ${className}`}
    />
  );
}
