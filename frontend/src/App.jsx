import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* import dotenv from "dotenv"; */

import CheckoutForm from "./components/CheckoutForm";
import { Navigation } from "./components/Navigation";
import { ScrollToTop } from "./components/ScrollToTop";
import dataEn from "./data.en.json";
import { GlimRoutes } from "./routes/GlimRoutes";

const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(apiKey); 

export const App = () => {
  const data = dataEn;

  return (
    <>
      <ScrollToTop />
      <div className="bg-second-red">
        <Navigation data={data["navbar"]} />
        <GlimRoutes data={data} />
      </div>
    </>
  );
};
