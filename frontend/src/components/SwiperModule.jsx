import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore";
import { ProductCard } from "./ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-fade";
import "swiper/css/free-mode";

export const SwiperModule = () => {
    const { productsData } = useProductsStore()
    const [ selectedProducts, setSelectedProducts ] = useState(productsData.products)

    useEffect(() => {
        if (productsData.products) {
          const shuffled = productsData.products.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 20);
          setSelectedProducts(selected);
        }
      }, [productsData]);

      console.log()
    return (
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={6}
          speed={1200}
          centeredSlides={true}
          loop
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              spaceBetween: 10,
              slidesPerView: 2,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 4
            },
            1024: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 7
            }
        }}
        className="w-11/12 mx-auto laptop:py-4"
        >
         {selectedProducts?.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div className="">
                      <ProductCard data={product} />
                      </div>
                    </SwiperSlide>
                  ))}
        </Swiper>
      );
}

