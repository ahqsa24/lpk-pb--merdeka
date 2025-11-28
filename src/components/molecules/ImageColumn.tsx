// components/molecules/ImageColumn.tsx
import { ImageItem } from "../atoms/ImageItem";

interface ImageColumnProps {
  images: string[];
}

export const ImageColumn: React.FC<ImageColumnProps> = ({ images }) => (
  <div className="grid gap-4">
    {images.map((src, idx) => (
      <ImageItem key={idx} src={src} />
    ))}
  </div>
);
