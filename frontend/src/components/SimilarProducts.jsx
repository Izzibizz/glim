import { ProductCard } from "./ProductCard";
import { useProductsStore } from "../store/useProductsStore";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import swoopTop from "/swoops/swoop-similar-top.svg";
import swoopBottom from "/swoops/swoop-similar-bottom.svg";

const SimilarProducts = ({ subcategory, currentProductId }) => {
  const { productsData } = useProductsStore();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [numProductsToShow, setNumProductsToShow] = useState(6);
  const [isSimilarProducts, setIsSimilarProducts] = useState(false);

  const aboveColor = "red";

  const previousSectionColor = aboveColor
    ? `bg-main-${aboveColor} w-full abso`
    : `w-full`;

  const updateNumProductsToShow = () => {
    if (window.innerWidth >= 1024) {
      setNumProductsToShow(6);
    } else {
      setNumProductsToShow(4);
    }
  };

  useEffect(() => {
    if (similarProducts.length > 0) {
      setIsSimilarProducts(true);
    } else {
      setIsSimilarProducts(false);
    }
  }, [similarProducts]);

  useEffect(() => {
    console.log(currentProductId);
    if (productsData.products) {
      const filteredProducts = productsData.products.filter(
        (product) =>
          product.subcategory === subcategory &&
          product._id !== currentProductId
      );
      setSimilarProducts(filteredProducts);
    }
  }, [subcategory, currentProductId, productsData.products]);

  useEffect(() => {
    updateNumProductsToShow();
    window.addEventListener("resize", updateNumProductsToShow);
    return () => {
      window.removeEventListener("resize", updateNumProductsToShow);
    };
  }, []);

  return (
    <>
      {isSimilarProducts ? (
        <div className="relative laptop:w-9/12 mx-auto">
          <img
            className="bg-main-white w-full"
            src={swoopTop}
            alt="Section border"
          />
          {similarProducts.length > 0 && (
            <div className="bg-main-white py-8 flex flex-col items-center">
              <h3 className="py-8 text-center font-heading text-text-dark text-xl ">
                Similar products
              </h3>
              <ul className="w-9/12 m-auto grid grid-cols-2 gap-6 tablet:grid-cols-4 tablet:w-9/12 laptop:grid-cols-5 desktop:grid-cols-6">
                {similarProducts
                  .slice(0, numProductsToShow)
                  .map((item, index) => (
                    <li key={index} className="w-full">
                      <ProductCard data={item} />
                    </li>
                  ))}
              </ul>
              <NavLink to="/products">
                <button className="w-24 h-6 my-12 text-xs bg-main-yellow p-1 rounded-full text-text-dark  hover:bg-button-light ">
                  All products
                </button>
              </NavLink>
            </div>
          )}
          <img
            className="bg-main-white w-full "
            src={swoopBottom}
            alt="Section border"
          />
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default SimilarProducts;
