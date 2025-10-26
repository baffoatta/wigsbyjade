"use client";

import React, { useState } from "react";

const StaticReviewsTab: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      {/* Main Reviews Tab */}
      <div
        onClick={toggleExpanded}
        className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          padding: "16px 12px",
          borderRadius: "8px 0 0 8px",
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-col items-center space-y-1">
          {/* Star Icon */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          {/* Reviews Text */}
          <span className="text-sm font-medium tracking-wide">Reviews</span>
        </div>
      </div>

      {/* Expanded Reviews Panel */}
      {isExpanded && (
        <div className="absolute right-full top-0 mr-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Reviews
              </h3>
              <button
                onClick={toggleExpanded}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-3">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  comment:
                    "Amazing quality! The wig looks so natural and feels comfortable all day.",
                  date: "2 days ago",
                },
                {
                  name: "Jennifer L.",
                  rating: 5,
                  comment:
                    "Perfect match for my skin tone. Great customer service too!",
                  date: "1 week ago",
                },
                {
                  name: "Maria K.",
                  rating: 4,
                  comment:
                    "Love the texture and how easy it is to style. Would definitely buy again.",
                  date: "2 weeks ago",
                },
                {
                  name: "Ashley T.",
                  rating: 5,
                  comment:
                    "The lace is so undetectable! Everyone thinks it's my real hair.",
                  date: "3 weeks ago",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {review.name}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* View All Reviews Button */}
            <div className="pt-3 border-t border-gray-200">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticReviewsTab;
