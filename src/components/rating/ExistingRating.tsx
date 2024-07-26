import { FC } from "react";

type Rating = {
  movieId: string;
  ratings: number;
  uId: string;
  email: string;
};

interface RatingProps {
  rating: Rating;
}

const ExistingRating: FC<RatingProps> = ({ rating }) => {
  const numStars = 5;
  const stars = "★";
  const emptyStar = "☆";
  return (
    <div>
      <span style={{ color: "red", fontSize: "15px" }}>
        {rating.email.substring(0, rating.email.indexOf("@"))}
      </span>
      <span style={{ color: "red", fontSize: "15px" }}> Rated: </span>
      {[...Array(numStars)].map((star, index) => {
        const ratingValue = index + 1;
        const starSymbol = ratingValue <= rating.ratings ? stars : emptyStar;
        return (
          <span className="rating" key={index}>
            {starSymbol}
          </span>
        );
      })}
    </div>
  );
};
export default ExistingRating;
