import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface PhotoWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackId?: number;
}

export const PhotoWithFallback = ({
  src,
  alt,
  className,
  fallbackId = 0,
}: PhotoWithFallbackProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? `https://picsum.photos/seed/${fallbackId}/150` : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};

interface FallbackPhotoProps {
  size?: "sm" | "lg";
}

export const FallbackPhoto = ({ size = "sm" }: FallbackPhotoProps) => (
  <div className="w-full h-full flex items-center justify-center bg-indigo-50">
    <PhotoIcon className={`text-indigo-300 ${size === "lg" ? "w-6 h-6" : "w-4 h-4"}`} />
  </div>
);
