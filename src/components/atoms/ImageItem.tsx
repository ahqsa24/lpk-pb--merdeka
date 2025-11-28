// components/atoms/ImageItem.tsx
import Image from "next/image";

interface ImageItemProps {
  src: string;
  alt?: string;
}

export const ImageItem: React.FC<ImageItemProps> = ({ src, alt = "" }) => (
  <div>
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className="h-auto max-w-full rounded-base"
    />
  </div>
);
