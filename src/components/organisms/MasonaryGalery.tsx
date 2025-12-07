import Image from "next/image";

const images = [
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

export default function MasonaryGalery() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((column, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {column.map((src, imgIndex) => (
            <div key={imgIndex}>
              <Image
                src={src}
                alt={`Galeri ${colIndex}-${imgIndex}`}
                width={500} 
                height={500}
                className="h-auto max-w-full rounded-base object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
