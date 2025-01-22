//User needs to be logged in to able to access the review form.
import { useProductsStore } from "../store/useProductsStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import star from "/star-regular.svg";
import starFull from "/star-solid.svg";
import StarRating from "./StarRating";
import { NotFound } from "../pages/NotFound";

export const ReviewForm = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [charCheck, setCharCheck] = useState(true);
  const { fetchSingleProduct, loadingProduct, singleProduct } =
    useProductsStore();
  const product = singleProduct.product;

  useEffect(() => {
    fetchSingleProduct(id);
  }, []);

  if (!product || !product.image || !product.image.url) {
    return (
      <div>
        <NotFound reason="product to review" />
      </div>
    );
  }

  const handleSend = (event) => {
    event.preventDefault();
    // setFetched(false);
    console.log("Message: ", message, "Stars:", selectedStars);

    // From previous twitter clone project

    // const fetchOptions = {
    //   method: "POST",
    //   body: JSON.stringify({ message: message }),
    //   headers: { "Content-Type": "application/json" },
    // };

    // fetch(thoughts_URL, fetchOptions)
    //   .then((res) => res.json())
    //   .then((newThought) => {
    //     setThoughts((previousThoughts) => [newThought, ...previousThoughts]);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setMessage("");
    setSelectedStars(0);
    // setFetched(true);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
    setCharacters(e.target.value.length);
    if (message.length <= 6 || message.length >= 140) {
      setCharCheck(true);
    } else {
      setCharCheck(false);
    }
    console.log(charCheck);
  };

  const characterLimit = () => {
    if (charCheck) {
      return " transition-opacity duration-500 opacity-100 text-text-dark text-right ";
    } else {
      return "transition-opacity duration-500 opacity-0 text-text-dark text-right ";
    }
  };

  return (
    <section className="bg-main-red w-full py-12 laptop:pt-28 laptop:w-9/12 mx-auto">
      {loadingProduct ? (
        <Loading />
      ) : (
        <>
          <div className="w-9/12 max-w-[700px] m-auto text-text-light font-heading">
            <h2>Write review for {product.title}</h2>

            <form id="reviewForm">
              <textarea
                name="textarea"
                className="text-text-dark w-full resize-none p-2 rounded-md "
                id="textForm"
                value={message}
                cols="20"
                rows="4"
                placeholder="Write your review here..."
                onChange={handleMessage}
              ></textarea>
              <div className="lower-info flex justify-between align-center">
                 <p className={characterLimit()}>{characters}/140</p>
                <div className="flex gap-2 justify-items-center gap-12">
                <StarRating
                    selectedStars={selectedStars}
                    setSelectedStars={setSelectedStars}
                  />
                  <button
                    className="send-button bg-main-yellow text-text-dark px-6 py-2 rounded-full hover:bg-strong-yellow hover:cursor-pointer"
                    onClick={handleSend}
                    disabled={charCheck}
                  >
                    Send review
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
};
