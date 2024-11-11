import ReactStars from "react-rating-stars-component";

const StarRating = ({ rating,size }) => {
  return (
    <ReactStars
      count={5} // Total number of stars
      value={rating} // Rating value out of 5
      size={size} // Size of stars
      activeColor="#ffd700" // Color of active stars
      isHalf={true}
      edit={false} // Set to false to make it read-only
    />
  );
};

export default StarRating;
