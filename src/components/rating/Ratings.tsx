import { FC, useState, useEffect } from "react";
import { auth, db } from "../../authentication/firebase";
import {
  collectionGroup,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import ExistingRating from "./ExistingRating";
import "./ratings.css";
import { ToastContainer, toast } from "react-toastify";
interface MovieProps {
  id: string;
}

type Rating = {
  movieId: string;
  ratings: number;
  uId: string;
  email: string;
};

const Ratings: FC<MovieProps> = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentMovieRatings, setCurrentMovieRatings] = useState<Rating[]>([]);
  const [movieForEdit, setMovieForEdit] = useState<Rating | null>(null);
  const [showStars, setShowStars] = useState(true);

  const fetchRatings = async () => {
    try {
      const snapshot = await getDocs(collectionGroup(db, "movies"));
      if (snapshot.empty) {
        return;
      }

      const allUsersData = snapshot.docs.map((doc) => doc.data() as Rating);
      const filteredRatings = allUsersData.filter(
        (movie) => movie.movieId === id
      );

      const user = auth.currentUser;
      if (user) {
        const currentUserRating = filteredRatings.find(
          (rating) => rating.uId === user.uid
        );

        const sortedRatings = filteredRatings.sort((a, b) => {
          if (a.uId === user.uid) return -1;
          if (b.uId === user.uid) return 1;
          return 0;
        });

        setCurrentMovieRatings(sortedRatings);
        setShowStars(!currentUserRating);

        if (currentUserRating) {
          setMovieForEdit(currentUserRating);
        } else {
          setMovieForEdit(null);
        }
      } else {
        setCurrentMovieRatings(filteredRatings);
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [id, rating]);

  const handleRatingClick = async (ratings: number) => {
    const user = auth.currentUser;
    if (!user) {
      toast.info("login to set rating", {
        position: "top-right",
      });
      return;
    }

    setRating(ratings);
    try {
      const ratingRef = doc(db, "ratings", user.uid);
      const movieRatingRef = doc(ratingRef, "movies", id.toString());
      await setDoc(movieRatingRef, {
        movieId: id,
        uId: user.uid,
        ratings: ratings,
        timeStamp: serverTimestamp(),
        email: user.email,
      });

      fetchRatings();
    } catch (error) {
      console.error("Error writing rating document: ", error);
    }
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleRatingEdit = () => {
    setShowStars(true);
  };

  const previousRatings = currentMovieRatings.map((rating, index) => (
    <div className="star-ratings" style={{ display: "flex" }} key={index}>
      <ExistingRating rating={rating} />
      {auth.currentUser?.uid === rating.uId && (
        <div
          onClick={handleRatingEdit}
          style={{
            color: "white",
            marginTop: "5px",
            marginLeft: "3px",
            cursor: "pointer",
          }}
        >
          change
        </div>
      )}
    </div>
  ));

  const numStars = 5;
  const stars = "★";
  const emptyStar = "☆";

  return (
    <>
      {showStars && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {[...Array(numStars)].map((_, index) => {
            const ratingValue = index + 1;
            const starSymbol =
              ratingValue <= (hoverRating || rating) ? stars : emptyStar;

            return (
              <span
                className={`rating ${showStars ? "edit-stars" : ""}`}
                key={ratingValue}
                onMouseEnter={() => handleMouseEnter(ratingValue)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRatingClick(ratingValue)}
              >
                {starSymbol}
              </span>
            );
          })}
        </div>
      )}
      {previousRatings}
    </>
  );
};

export default Ratings;
