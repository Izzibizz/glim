import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { WelcomeMessage } from "./WelcomeMessage";
import { useProductsStore } from "../store/useProductsStore";

const CheckoutForm = ({ totalPrice }) => {
  const { handlePayment, paymentStatus, paymentSuccessful, isLoading, shoppingCart, orderHistory } =
    useProductsStore();
  const stripe = useStripe();
  const elements = useElements();
  // const [paymentStatus, setPaymentStatus] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  console.log("totalprice in checkoutform: ", totalPrice);
  // Define the product details
  const product = {
    items: shoppingCart,
    /* description: "High-quality cotton t-shirt", */
    price: totalPrice,
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#9f2409",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    if (!elements) return;

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const handleChange = (event) => {
        setIsCardComplete(event.complete);
      };

      cardElement.on('change', handleChange);

      return () => {
        cardElement.off('change', handleChange);
      };
    }
  }, [elements]);


  // function handlePaymentWrapper(stripe, elements) {
  //   handlePayment(stripe, elements);
  // }

  const handleSubmit = async (event) => {
    await handlePayment(event, stripe, elements, product, shoppingCart, totalPrice);
    setShowMessage(true);
  };

  const calculateTotalCost = (item) => {
    const totalCost = item.quantity * item.product.price;
    const roundedPrice = Math.ceil(totalCost * 100) / 100; // Round up to 2 decimal places
    return `${roundedPrice}`;
  };

  const toggleShowCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  const itemsToDisplay = paymentSuccessful ? orderHistory : product.items;

  return (
    <>
      {!paymentSuccessful ? (
        <div className="flex flex-col bg-main-white text-text-dark max-w-[600px] mx-auto max-h-100 rounded-xl p-6 px-8 desktop:p-10 mb-12 gap-4 font-heading text-xs desktop:text-sm ">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <p className="text-2xl my-2">Payment</p>
            <p className="mb-10">Enter your card details to order:</p>
            <CardElement options={cardElementOptions} />
            {showMessage && (
              <div
                className={`payment-status ${
                  paymentStatus === "Payment successful!"
                    ? "text-green-500 text-center mt-4"
                    : "text-red-500 text-center mt-4"
                }`}
              >
                {paymentStatus}
              </div>
            )}
            <button
              type="submit"
              className="bg-cta-blue text-text-light m-auto w-[180px] rounded-full px-5 p-2 mt-8"
              disabled={!stripe || isLoading  || !isCardComplete}
            >
              {isLoading ? "Processing..." : "Buy Now"}
            </button>
          </form>
          <button
            className="bg-cta-blue text-text-light m-auto w-[180px] rounded-full px-5 p-2"
            onClick={toggleShowCardDetails}
          >
            Default card info
          </button>
          {showCardDetails && (
            <div className="flex flex-col gap-1">
              <p className="text-base my-2">This is not a real purchase</p>
              <p className="mb-4">
                Copy paste the card number below and press "Buy Now"
              </p>
              <p>
                Number: <span className="font-black">4242 4242 4242 4242</span>
              </p>
              <p>
                MM/ÅÅ: <span className="font-black">ANY (future)</span>
              </p>
              <p>
                CVC, postal <span className="font-black">ANY</span>
              </p>
            </div>
          )}
        </div>
      ) : ""}

      <div className="tablet:max-w-[600px] tablet:m-auto">
        <h2 className="text-2xl mt-8 mb-8 laptop:text-3xl laptop:mb-12 text-center">
          {paymentSuccessful ? "Your purchased products:" : "Your cart:"}
        </h2>
        <ul className="w-full flex flex-col gap-8">
          {itemsToDisplay.map((item, index) => (
            <li
              key={index}
              className="flex font-heading justify-center tablet:justify-left gap-4 m-auto tablet:gap-6 text-text-light"
            >
              <img
                src={item.product.image.url}
                alt={item.product.title}
                className="rounded-xl w-4/12 tablet:aspect-square tablet:w-2/12 object-cover"
              />
              <div className="w-6/12 tablet:w-full flex-col tablet:flex-row justify-between flex">
                <div className="flex flex-col gap-2 text-xs tablet:text-sm desktop:text-base">
                  <h4 className="font-black">{item.product.title}</h4>
                  <h4>{item.product.brand}</h4>
                  <p>{item.product.size}</p>
                  <h3 className="mt-4 text-lg desktop:text-xl">
                    {item.product.price} €
                  </h3>
                </div>
                <div className="max-w-max">
                  <div className="flex gap-6 tablet:justify-end">
                    <div className="bg-text-light rounded-full text-text-dark w-6 tablet:w-8 flex items-center justify-center text-xs tablet:text-sm">
                      {item.quantity}
                    </div>
                  </div>
                  <p className="font-header text-text-light text-sm mt-4 tablet:mt-8 laptop:mt-14">
                    subtotal:{" "}
                    <span className="bg-main-yellow rounded-xl p-1 px-2 tablet:p-2 tracking-widest font-bold text-text-dark">
                      {calculateTotalCost(item)} €
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CheckoutForm;
