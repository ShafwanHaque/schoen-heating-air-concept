import Image from "next/image";
import { siteConfig } from "@/config/site.config";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "default" | "light";
};

export function BrandLogo({
  className,
  priority = false,
  variant = "default",
}: BrandLogoProps) {
  return (
    <span className={`brand${className ? ` ${className}` : ""}`}>
      <Image
        className="brand__logo"
        src={variant === "light" ? siteConfig.brand.logoLight : siteConfig.brand.logo}
        alt={siteConfig.brand.name}
        width={340}
        height={74}
        priority={priority}
        unoptimized
        sizes="(max-width: 767px) 150px, 178px"
      />
    </span>
  );
}
