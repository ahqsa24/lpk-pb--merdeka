// components/organisms/MasonryGallery.tsx
import { ImageColumn } from "../molecules/ImageColumn";

export const MasonryGallery = () => {
  const columns = [
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    ],
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    ],
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    ],
    [
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
    ],
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {columns.map((images, index) => (
        <ImageColumn key={index} images={images} />
      ))}
    </div>
  );
};
