import React from "react";

interface PlaceholderImageProps {
  width: number;
  height: number;
  alt: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  alt,
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center text-gray-600 font-medium ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">📸</div>
        <div className="text-sm">{alt}</div>
        <div className="text-xs mt-1">
          {width}x{height}
        </div>
      </div>
    </div>
  );
};

export default PlaceholderImage;
