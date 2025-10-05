interface RatingDisplayProps {
  rating: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
}

export const RatingDisplay = ({ rating, editable = false, onChange }: RatingDisplayProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  const handleStarClick = (index: number, isHalf: boolean = false) => {
    if (editable && onChange) {
      const newRating = isHalf ? index + 0.5 : index + 1;
      onChange(Math.min(5, Math.max(0, newRating)));
    }
  };

  // Star SVG path
  const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <button
          key={`full-${i}`}
          onClick={() => handleStarClick(i)}
          disabled={!editable}
          className={`${editable ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          aria-label={`Rate ${i + 1} stars`}
          title={`${i + 1} stars`}
        >
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
        </button>
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <button
          onClick={() => handleStarClick(fullStars, true)}
          disabled={!editable}
          className={`${editable ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform relative`}
          aria-label={`Rate ${fullStars + 0.5} stars`}
          title={`${fullStars + 0.5} stars`}
        >
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
          <svg 
            className="w-5 h-5 text-yellow-400 absolute top-0 left-0" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <path d={starPath} />
          </svg>
        </button>
      )}
      
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <button
          key={`empty-${i}`}
          onClick={() => handleStarClick(fullStars + (hasHalfStar ? 1 : 0) + i)}
          disabled={!editable}
          className={`${editable ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          aria-label={`Rate ${fullStars + (hasHalfStar ? 1 : 0) + i + 1} stars`}
          title={`${fullStars + (hasHalfStar ? 1 : 0) + i + 1} stars`}
        >
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
        </button>
      ))}
      
      {/* Rating number display */}
      <span 
        className="ml-2 text-sm text-gray-600 font-medium"
        aria-label={`Current rating: ${rating.toFixed(1)} stars`}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
};