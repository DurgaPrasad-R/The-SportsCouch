import userReviews from "../mocks/reviews";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
const Review = () => {
  return (
    <>
      <h1 className="title font-bold text-2xl flex justify-center mt-4">
        Reviews
      </h1>
      <div className="flex mx-4">
        {userReviews.data.reviews.map((review) => (
          <div key={review.id} className="review rounded-md p-4 m-4 shadow-md">
            <div className="review__user flex flex-col justify-center items-center">
              <img
                src={review.profileImg}
                alt={review.user}
                className="rounded-full w-20"
              />
              <p className="font-bold">{review.user}</p>
            </div>
            <div className="review__rating flex justify-center">
              <div className="stars flex">
                {[...Array(5)].map((_, index) =>
                  index < review.rating ? (
                    <FaStar
                      key={index}
                      className="star text-xl"
                      color="#ffd700"
                    />
                  ) : (
                    <FaRegStar
                      key={index}
                      className="star text-xl"
                      color="#ccc"
                    />
                  )
                )}
              </div>
            </div>
            <div className="review__text flex justify-center">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Review;
