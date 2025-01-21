import { NavLink } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";

export const ProductCard = ({ data }) => {
  const productData = data;
  const { updateShoppingCart } = useProductsStore();
  const image = productData.image.url;
  const productName = productData.title;
  const price = `€${productData.price}`;
  const id = productData._id;

  const addToCart = "Add to Cart"; //productLangData.add-to-cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    updateShoppingCart(productData, 1);
  };

  console.log(useProductsStore())

  return (
    <div className="bg-strong-red m-auto w-full h-full rounded-xl pb-5 laptop:hover:scale-105 hover:drop-shadow-2xl">
      <NavLink to={`/products/${id}`} aria-label="Link to Product">
        <div>
          <img className="w-full rounded-t-xl" src={image} alt="" />
        </div>
      </NavLink>
      <div className="m-4 flex flex-col items-center h-18 tablet:h-28 text-white">
        <NavLink to={`/products/${id}`} aria-label="Link to Product">
          <h3 className="font-heading text-[10px] hover:scale-105 active:opacity-50 laptop:text-xs overflow-hidden text-ellipsis whitespace-nowrap flex flex-col text-center">
            <span className="text-sm">{productData.brand}</span>
            {productName}
          </h3>
        </NavLink>

        <div className="flex flex-col h-full  justify-end items-center ">
          <p className="font-body my-3 font-bold text-sm">{price}</p>
          <button
            onClick={handleAddToCart}
            className="w-24 text-xs bg-button-light p-1 rounded-full text-text-dark hover:bg-main-yellow"
          >
            {addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};
