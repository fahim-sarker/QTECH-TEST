import React from "react";
import { Link } from "react-router-dom";
import { GiRoyalLove } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slice/ProductSlice";
import type { Product } from "../Hooks/ContextApi";


const ProductCard: React.FC<{ item: Product }> = ({ item }) => {
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addToCart({ ...item, qty: 1 }));
    toast.success("Added to cart!", {
      position: "top-right",
      duration: 2000,
    });
  };

  return (
    <div className="w-full sm:w-[48%] lg:w-[32%] p-4 border-2 border-black mb-6 rounded-lg cursor-pointer group">
      <div className="relative overflow-hidden">
        <p className="absolute top-5 left-5 text-[16px] font-sans font-bold bg-black w-[92px] h-[35px] text-white text-center leading-[35px]">
          {item.discountPercentage} %
        </p>
        <Link to={`/product/${item.id}`}>
          <img
            className="w-full h-[250px] lg:h-[300px] object-cover py-5 lg:py-0"
            src={item.thumbnail}
            alt={item.title}
          />
        </Link>
        <div className="absolute left-0 bottom-[-150px] w-full h-[150px] bg-white pr-5 pt-8 pb-2 flex justify-end duration-500 ease-in-out group-hover:bottom-0">
          <ul className="flex flex-col justify-end gap-3">
            <li className="flex items-center gap-x-3 font-sans text-[16px] hover:text-[#262626] cursor-pointer">
              Add to Wish List <GiRoyalLove />
            </li>
            <li className="flex items-center justify-end gap-x-3 font-sans text-[16px] hover:text-[#262626] cursor-pointer">
              Compare <TfiReload />
            </li>
            <li
              onClick={handleCart}
              className="flex items-center justify-end gap-x-3 font-sans text-[16px] hover:text-[#262626] cursor-pointer"
            >
              Add to Cart <FaShoppingCart />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-4 px-2">
        <h2 className="font-sans text-[16px] font-bold text-[#262626] truncate">
          {item.title}
        </h2>
        <p className="font-sans text-[16px] font-bold text-[#262626] mt-2 lg:mt-0">
          ${item.price}
        </p>
      </div>
      <div className="px-2 pb-5">
        <p className="font-sans text-[16px] font-bold capitalize text-[#767676]">
          stock: {item.stock}
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductCard;
