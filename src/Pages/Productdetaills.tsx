import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { addToCart } from "../Slice/ProductSlice";
import toast, { Toaster } from "react-hot-toast";
import Container from "../Components/Shared/Container";
import Flex from "../Components/Shared/Flex";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  description: string;
  [key: string]: any; // for any additional props
}

const Productdetaills: React.FC = () => {
  const [singleData, setSingleData] = useState<Product | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get<Product>(
          `https://dummyjson.com/products/${id}`
        );
        setSingleData(response.data);
      } catch (err) {
        setError("Failed to load product data");
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart({ ...item, qty: 1 }));
    toast.success("Added to cart!", {
      position: "top-right",
      duration: 1000,
    });
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  if (error) {
    return (
      <Container>
        <p className="text-center text-red-600 mt-10">{error}</p>
      </Container>
    );
  }

  if (!singleData) {
    return (
      <Container>
        <p className="text-center mt-10 font-sans text-lg">
          Loading product details...
        </p>
      </Container>
    );
  }

  const clientRatings = Array.from({ length: 5 }, (_, index) => {
    const ratingNumber = index + 0.5;
    if (singleData.rating >= index + 1) {
      return <FaStar key={index} className="text-[#FFD881]" />;
    } else if (singleData.rating > ratingNumber) {
      return <FaRegStarHalfStroke key={index} className="text-[#FFD881]" />;
    } else {
      return <FaRegStar key={index} className="text-[#FFD881]" />;
    }
  });

  return (
    <section className="py-5 lg:px-0 px-2 bg-[#F5F5F3]">
      <Toaster />
      <Container>
        <Flex className="flex-wrap justify-between">
          {singleData.images.map((img, idx) => (
            <div key={idx} className="lg:w-[32%] pb-[40px]">
              <img
                className="w-full lg:h-[400px] h-[200px]"
                src={img}
                alt={singleData.title}
              />
            </div>
          ))}
        </Flex>

        <h2 className="font-sans text-[#262626] lg:text-[39px] text-[25px] font-bold pb-4">
          {singleData.title}
        </h2>

        <div className="flex items-center pb-3">
          {clientRatings}
          <p className="font-sans text-[16px] font-normal pl-7">1 Review</p>
        </div>

        <p className="font-sans lg:text-[26px] text-[18px] font-bold pb-3 border-b border-[#D8D8D8]">
          ${singleData.price}
        </p>

        <div className="flex items-center py-4">
          <p className="font-sans lg:text-[16px] text-[13px] font-bold pr-3">
            COLOR :
          </p>
          <div className="flex px-[60px] gap-x-4">
            {/* example colors */}
            {["#979797", "#FF8686", "#7ED321", "#B6B6B6", "#15CBA5"].map(
              (color, i) => (
                <div
                  key={i}
                  className="w-[20px] h-[20px] rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              )
            )}
          </div>
        </div>

        <div className="flex py-4 items-center">
          <p className="font-sans lg:text-[16px] text-[13px] font-bold pr-[80px]">
            SIZE :
          </p>
          <select
            className="w-[136px] h-[36px] border-2 px-3"
            name="size"
            id="size-select"
          >
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex py-6 items-center border-b border-[#D8D8D8]">
          <p className="font-sans lg:text-[16px] text-[14px] capitalize font-bold pr-[50px]">
            stock :
          </p>
          <p className="font-sans text-[16px] font-normal">
            {singleData.stock}
          </p>
        </div>

        <div className="flex py-6 items-center border-b border-[#D8D8D8] lg:gap-x-10 gap-x-4 lg:px-0 px-1">
          <p className="font-sans lg:text-[16px] text-[13px] font-medium lg:px-[46px] px-[25px] lg:py-[16px] py-[10px] border-2 border-[#262626] text-center hover:bg-[#262626] hover:text-white duration-300 ease-in-out cursor-pointer">
            Add to Wish List
          </p>

          <p
            onClick={() => handleAddToCart(singleData)}
            className="font-sans lg:text-[16px] text-[13px] font-medium lg:px-[46px] px-[25px] lg:py-[16px] py-[10px] border-2 border-[#262626] text-center hover:bg-[#262626] hover:text-white duration-300 ease-in-out cursor-pointer"
          >
            Add to Cart
          </p>
        </div>

        <div>
          <div
            onClick={() => setShowFeatures(!showFeatures)}
            className="lg:w-[40%] flex justify-between items-center py-6 cursor-pointer"
          >
            <p className="lg:text-[16px] text-[13px] font-sans font-bold">
              FEATURES & DETAILS
            </p>
            {showFeatures ? <RxCross2 /> : <FaPlus />}
          </div>
          {showFeatures && (
            <p className="lg:w-[50%] lg:text-[16px] text-[12px] font-sans font-normal">
              {singleData.description}
            </p>
          )}
        </div>

        <div>
          <div
            onClick={() => setShowShipping(!showShipping)}
            className="lg:w-[40%] flex justify-between items-center py-6 cursor-pointer"
          >
            <p className="lg:text-[16px] text-[13px] font-sans font-bold">
              SHIPPING & RETURNS
            </p>
            {showShipping ? <RxCross2 /> : <FaPlus />}
          </div>
          {showShipping && (
            <p className="lg:w-[50%] lg:text-[16px] text-[12px] font-sans font-normal">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit,
              numquam!
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Productdetaills;
