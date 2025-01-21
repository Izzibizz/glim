import { Carousel } from "../components/Carousel";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { ShoppingCartPopup } from "../components/ShoppingCartPopup";
import { ReviewCard } from "../components/ReviewCard";
import { Statements } from "../components/Statements";
import { WelcomeMessage } from "../components/WelcomeMessage";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
// import Flickity from "flickity";

export const Home = ({ data }) => {
  const {
    signedUp,
    setSignedUp,
    loggedOut,
    setLoggedOut,
    automaticLogOut,
    setAutomaticLogOut,
  } = useUserStore();

  useEffect(() => {
    if (signedUp) {
      setTimeout(() => {
        setSignedUp(false);
      }, 3000);
    }
  }, [signedUp]);

  useEffect(() => {
    if (loggedOut) {
      setTimeout(() => {
        setLoggedOut(false);
      }, 1500);
    }
  }, [loggedOut]);

  useEffect(() => {
    if (automaticLogOut) {
      setTimeout(() => {
        setAutomaticLogOut(false);
      }, 1500);
    }
  }, [automaticLogOut]);

  return (
    <>
      <main className="flex flex-col bg-main-red laptop:w-9/12 laptop:mx-auto">
        {signedUp && <WelcomeMessage />}
        {loggedOut && <WelcomeMessage />}
        {automaticLogOut && <WelcomeMessage />}
        <ShoppingCartPopup />
        <Hero data={data["hero"]} />
        <Carousel />
        <Statements data={data["atGlim"]} />
      </main>
      <Footer data={data["footer"]} />
    </>
  );
};
