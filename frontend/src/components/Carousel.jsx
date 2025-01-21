import { useEffect, useState, useRef, useCallback } from "react";
import { useProductsStore } from "../store/useProductsStore";
import { Loading } from "../components/Loading";
import { SwiperModule } from "./SwiperModule";

export const Carousel = () => {
  const { fetchProducts, loadingProduct } = useProductsStore();


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
    <div className="w-full m-auto pb-4">
      {loadingProduct ? (
        <Loading />
      ) : (
        <>
          <h2 className="font-heading text-xl laptop:text-2xl py-4 laptop:py-0 text-center text-white font-light">
            Featured Products
          </h2>

          <SwiperModule />
        </>
      )}
    </div>
  );
};
