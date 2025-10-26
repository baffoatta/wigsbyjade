import React from "react";

interface HoverPlaceholderImageProps {
  width: number;
  height: number;
  alt: string;
  className?: string;
  variant?: "default" | "hover";
}

const HoverPlaceholderImage: React.FC<HoverPlaceholderImageProps> = ({
  width,
  height,
  alt,
  className = "",
  variant = "default",
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case "hover":
        return "from-purple-200 to-pink-300";
      default:
        return "from-pink-200 to-purple-300";
    }
  };

  const getEmoji = () => {
    switch (variant) {
      case "hover":
        return "✨";
      default:
        return "📸";
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${getGradientColors()} flex items-center justify-center text-gray-600 font-medium ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">{getEmoji()}</div>
        <div className="text-sm">{alt}</div>
        <div className="text-xs mt-1">
          {width}x{height}
        </div>
        {variant === "hover" && (
          <div className="text-xs mt-1 text-purple-600 font-semibold">
            Hover View
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverPlaceholderImage;
