import React from "react";

const StarRating = ({ rating }) => {
  const totalStars = 5; // Total number of stars
  const filledStars = Math.floor(rating); // Number of fully filled stars
  const partialStar = rating % 1; // Fractional part of the star

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className="relative mt-2 text-gray-500 text-xl">
          {/* Full star in gray */}
          {"★"}
          {/* Yellow star overlay for filled or partial stars */}
          {index < filledStars || (index === filledStars && partialStar > 0) ? (
            <span
              className="absolute top-0 left-0 text-yellow-500 overflow-hidden"
              style={{
                width: `${index < filledStars ? 100 : partialStar * 100}%`, // Full or partial fill
              }}
            >
              {"★"}
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
