import burgerMenu from "/bars-solid.svg";
import shoppingCartsvg from "/cart-shopping-solid.svg";
import glimLogo from "/glimSmall.svg";
import swoop from "/nav-swoop2.svg";
import userIcon from "/user-solid.svg";
import xMark from "/xmark-solid.svg";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import animation from "../assets/Circle-loading-Animation.json";
import { useUserStore } from "../store/useUserStore";
import { useProductsStore } from "../store/useProductsStore";
import { WelcomeMessage } from "./WelcomeMessage";

//If signed in Sign in should display username/firstname

export const Navigation = ({ data }) => {
  const {
    email,
    password,
    userId,
    loginUser,
    loggedIn,
    showWelcomePopup,
    setShowWelcomePopup,
    setAutomaticLogOut,
    loadingUser,
    logoutUser,
    loginError,
  } = useUserStore();
  const { shoppingCart } = useProductsStore();
  const [open, setOpen] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navRef = useRef();
  const btnRef = useRef();
  const overlayRef = useRef();
  const modalContentRef = useRef();
  const burgerRef = useRef();
  const logoutTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(emailInput, passwordInput);
    console.log("loginUser:", loginUser);
  };

  const handleClickOutside = (event) => {
    if (overlayRef.current && !modalContentRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleClickOutsideBurger = (event) => {
    if (
      !navRef.current.contains(event.target) ||
      burgerRef.current.contains(event.target)
    ) {
      setOpenBurger(false);
    }
  };

  useEffect(() => {
    if (openBurger) {
      document.addEventListener("mousedown", handleClickOutsideBurger);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBurger);
    };
  }, [openBurger]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (showWelcomePopup) {
      setOpen(false);
      navigate("/");
      setTimeout(() => {
        setShowWelcomePopup(false);
      }, 1500);
      // Set a timeout to log out the user after 15 minutes
      logoutTimeoutRef.current = setTimeout(() => {
        logoutUser();
        setAutomaticLogOut(true);
        navigate("/");
      }, 1800000); //  900000 15 minutes
    } else {
      // Clear the timeout if the user logs out
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
    }
  }, [loggedIn]);
  // add a message for user to know theyve been logged out (welcome message comp could maybe be reused? but it should have the click outside func that the login box has.. would be nice)

  const toggleLogin = () => {
    setOpen(!open);
  };

  const toggleBurger = () => {
    setOpenBurger(!openBurger);
  };

  const totalQuantity = shoppingCart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <>
      {showWelcomePopup && <WelcomeMessage />}
      <nav className="sticky top-0 w-full z-20 bg-strong-red border-b-2 border-main-red border-opacity-35 backdrop-blur-xl">
        <div className="grid grid-cols-3  justify-between tablet:w-11/12 laptop:w-9/12 tablet:mx-auto items-center">
          <div className="flex tablet:gap-10">
            <NavLink
              to="/about"
              className="text-white m-4 hidden laptop:block"
              aria-label="Link to About us"
            >
              <p className="font-body text-white font-extralight text-lg hidden tablet:block">
                {data.about}
              </p>
            </NavLink>
            <NavLink
              aria-label="Link to products"
              to="/products"
              className="text-white m-4 hidden laptop:block"
            >
              <p className="font-body text-white text-xl hidden tablet:block font-bold">
                {data.products}
              </p>
            </NavLink>
            {loggedIn ? (
              <>
                <NavLink
                  to={`/profile/${userId}`}
                  className="laptop:hidden"
                  aria-label="Link to Profile"
                >
                  <img
                    src={userIcon}
                    alt="Profile"
                    className="h-6 m-3 tablet:h-7 tablet:m-3"
                  />
                </NavLink>
                <NavLink
                  to="/products"
                  aria-label="link to products"
                  className="hidden tablet:block laptop:hidden"
                >
                  <img src="/products.svg" alt="products" className="h-9 w-9 mt-2 ml-1" />
                </NavLink>
              </>
            ) : (
              <div
                onClick={toggleLogin}
                className="text-white cursor-pointer laptop:hidden flex"
              >
                <img
                  src={userIcon}
                  alt="Profile"
                  className="h-6 m-3 tablet:h-7 tablet:m-3"
                />
                <NavLink
                  to="/products"
                  aria-label="link to products"
                  className="hidden tablet:block laptop:hidden"
                >
                  <img src="/products.svg" alt="products" className="h-9 w-9 mt-2 mr-2" />
                </NavLink>
              </div>
            )}
            <NavLink
              to="/cart"
              className="text-white tablet:hidden"
              aria-label="Link to Shopping Cart"
            >
              <img
                src={shoppingCartsvg}
                alt="Shopping cart"
                className="h-6 my-3 tablet:h-7 tablet:m-3"
              />
            </NavLink>
            {shoppingCart.length > 0 && (
              <div className="tablet:hidden absolute top-1 border border-dark-red2 left-16 bg-main-white text-text-dark rounded-full w-4 h-4 flex items-center justify-center text-xs ">
                <span>{totalQuantity}</span>
              </div>
            )}
          </div>
          <div className="flex m-auto">
            <NavLink
              to="/"
              className="text-white"
              aria-label="Link to Homepage"
            >
              <img className="w-40 my-4" src={glimLogo} alt="glim logo" />
            </NavLink>
          </div>
          <div className="flex flex-row justify-end tablet:gap-10">
            {loggedIn ? (
              <NavLink to={`/profile/${userId}`} aria-label="Link to Profile">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="hidden laptop:flex laptop:h-7 laptop:mt-4"
                />{" "}
              </NavLink>
            ) : (
              <div
                onClick={toggleLogin}
                className="text-white my-4 cursor-pointer"
              >
                <p className="font-body text-white font-extralight text-lg hidden laptop:block">
                  {data.login}
                </p>
              </div>
            )}

            {!openBurger && (
              <>
                <NavLink
                  to="/cart"
                  className="relative z-40"
                  aria-label="Link to Shopping Cart"
                >
                  <img
                    src={shoppingCartsvg}
                    alt="Shopping cart"
                    className="h-7 m-3 hidden tablet:block laptop:h-8 laptop:m-4"
                  />
                  {shoppingCart.length > 0 && (
                    <div className="hidden tablet:block border border-main-red bg-main-white text-text-dark absolute z-30 tablet:top-1 laptop:top-2 tablet:right-0 laptop:right-2 text-center rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      <span>{totalQuantity}</span>
                    </div>
                  )}
                </NavLink>
                <NavLink
                  to="/products"
                  aria-label="link to products"
                  className="tablet:hidden"
                >
                  <img src="/products.svg" className="h-7 w-7 mt-2 mr-1" alt="products"/>
                </NavLink>
              </>
            )}

            {openBurger ? (
              <div
                className=" font-heading absolute backdrop-blur-sm top-0 right-0 flex-col text-right z-20 p-8 rounded-bl-xl border-main-red text-white bg-red-burger text-xl laptop:hidden"
                ref={navRef}
              >
                <button ref={burgerRef} onClick={toggleBurger}>
                  <img src={xMark} alt="Menu" className="h-6 mb-4 " />
                </button>
                {loggedIn ? (
                  <NavLink
                    aria-label="Link to BurgerMenu"
                    className="nav-link"
                    onClick={toggleBurger}
                    to={`/profile/${userId}`}
                  >
                    <p className="my-2">Profile</p>
                  </NavLink>
                ) : (
                  <div>
                    <p className="cursor-pointer" onClick={toggleLogin}>
                      Login
                    </p>
                    <NavLink
                      aria-label="Link to Sign Up"
                      className="nav-link"
                      onClick={toggleBurger}
                      to="/signup"
                    >
                      <p className="my-2">Sign up</p>
                    </NavLink>
                  </div>
                )}
                {data.burger.map((link, index) => (
                  <NavLink
                    aria-label="Link to Burger Menu"
                    className="nav-link"
                    onClick={toggleBurger}
                    key={index}
                    to={link.link}
                  >
                    <p className={link.style}>{link.text}</p>
                  </NavLink>
                ))}
              </div>
            ) : (
              <>
                <button ref={btnRef} className="flex" onClick={toggleBurger}>
                  <img
                    src={burgerMenu}
                    alt="Menu"
                    className="h-7 m-2 justify-start tablet:h-8 tablet:mt-3 tablet:mr-4 laptop:hidden"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {open ? (
        <div
          onClick={handleClickOutside}
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-full bg-overlay backdrop-blur-sm flex items-center justify-center z-30"
        >
          <div
            ref={modalContentRef}
            className="w-2/3 tablet:w-1/3 desktop:w-3/12 my-20 rounded-lg bg-login border-main-red border-opacity-50 backdrop-blur-sm p-4 relative"
          >
            <div className="flex justify-between">
              <h1 className="font-heading text-text-light text-2xl my-4">
                Log In
              </h1>
              <NavLink to="/signup">
                <button
                  aria-label="Link to SignUp"
                  onClick={() => setOpen(false)}
                  className="bg-main-red hover:bg-button-varm-medium hover:text-text-light transition duration-300 mb-4 justify-self-center px-6 py-2 rounded-full text-sm text-text-light"
                >
                  Sign up
                </button>
              </NavLink>
            </div>
            <form className="flex flex-col gap-2">
              <input
                value={emailInput}
                type="email"
                placeholder="Email..."
                className="p-2 rounded-lg"
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <input
                value={passwordInput}
                type="password"
                placeholder="Password..."
                className="p-2 rounded-lg"
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <button
                onClick={handleLogin}
                // disabled={loadingUser}
                className="bg-cta-blue my-4 px-6 py-2 rounded-full hover:bg-cta-blue-hover text-text-light"
              >
                {loadingUser ? (
                  <div className="flex items-center justify-center">
                    <span>Logging in...</span>
                    <Lottie
                      animationData={animation}
                      loop={true}
                      autoPlay
                      style={{ width: 30, height: 30, marginLeft: 8 }}
                    />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              {loginError && (
                <p className="text-center text-text-dark font-heading font-bold pb-4">
                  The email or password is incorrect, please try again.
                </p>
              )}
            </form>
            <p className="absolute text-text-light -bottom-10 tablet:-bottom-8 z-0  text-xs">
              Press outside of the box to close the window
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};
