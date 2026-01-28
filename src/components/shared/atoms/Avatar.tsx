import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  size?: number | string;
  className?: string;
  textSize?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  alt = "avatar",
  size = 40,
  className = "",
  textSize = "text-sm"
}) => {
  const [imageState, setImageState] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    if (!src) {
      setImageState('error');
      return;
    }

    setImageState('loading');
    const img = new Image();
    img.src = src;
    img.referrerPolicy = "no-referrer"; // Important for Google images

    img.onload = () => {
      setImageState('success');
    };

    img.onerror = () => {
      setImageState('error');
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const showFallback = !src || imageState === 'error' || imageState === 'loading';

  const getInitials = (n: string) => {
    return n ? n.charAt(0).toUpperCase() : 'U';
  };

  // Determine size style
  const sizeStyle = typeof size === 'number' ? { width: size, height: size, minWidth: size, minHeight: size } : {};

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 text-gray-500 dark:text-gray-300 ${className}`}
      style={sizeStyle}
    >
      {showFallback ? (
        name ? (
          <span className={`font-bold ${textSize} select-none`}>
            {getInitials(name)}
          </span>
        ) : (
          <FaUser size={typeof size === 'number' ? size * 0.5 : 16} />
        )
      ) : (
        <img
          src={src || ""}
          alt={alt}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};