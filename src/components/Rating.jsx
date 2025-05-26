const Rating = ({ value }) => {
  const totalStars = 5;
  const stars = Array(totalStars)
    .fill()
    .map((_, index) => {
      if (index < Math.floor(value)) {
        return (
          <span key={index} className="text-yellow-400">
            ★
          </span>
        );
      } else if (index < value) {
        return (
          <span key={index} className="text-yellow-300">
            ☆
          </span>
        ); // Half-star approximation
      } else {
        return (
          <span key={index} className="text-gray-300">
            ★
          </span>
        );
      }
    });

  return (
    <div className="flex items-center my-1">
      <div className="flex">{stars}</div>
      <span className="text-xs text-gray-500 ml-1">{value}/5</span>
    </div>
  );
};

export default Rating;
