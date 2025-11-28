import React from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = "avatar", size = 48 }) => (
    <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover"
    />
);