import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container";
import { ApidataContext, type Product } from "../../Hooks/ContextApi";
import { productremove } from "../../Slice/ProductSlice";

interface RootState {
  Product: {
    cartitem: Product[];
  };
}

const Navbar = () => {
  const information = useContext<Product[]>(ApidataContext);
  const data = useSelector((state: RootState) => state.Product.cartitem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [catshow, setCatShow] = useState(false);
  const [usershow, setUserShow] = useState(false);
  const [usercartshow, setUserCartShow] = useState(false);
  const [searchinput, setSearchInput] = useState("");
  const [searchfilter, setSearchFilter] = useState<Product[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const catref = useRef<HTMLDivElement>(null);
  const userref = useRef<HTMLDivElement>(null);
  const usercartref = useRef<HTMLDivElement>(null);
  const userstable = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (catref.current?.contains(target)) {
        setCatShow(!catshow);
      } else {
        setCatShow(false);
      }

      if (userref.current?.contains(target)) {
        setUserShow(!usershow);
      } else {
        setUserShow(false);
      }

      if (usercartref.current?.contains(target)) {
        if (data.length === 0) {
          setUserCartShow(false);
        } else {
          setUserCartShow(!usercartshow);
        }
      } else if (!userstable.current?.contains(target)) {
        setUserCartShow(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [catshow, usershow, usercartshow, data.length]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value === "") {
      setSearchFilter([]);
    } else {
      const filtered = information.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchFilter(filtered);
    }
    setSelectedItemIndex(-1);
  };

  const handleSingleSearch = (id: number) => {
    navigate(`/product/${id}`);
    setSearchFilter([]);
    setSearchInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchfilter.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItemIndex(prev =>
        prev <= 0 ? searchfilter.length - 1 : prev - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItemIndex(prev =>
        prev === searchfilter.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "Enter" && selectedItemIndex !== -1) {
      handleSingleSearch(searchfilter[selectedItemIndex].id);
    }
  };

  const handledelete = (index: number) => {
    dispatch(productremove(index));
  };

  const handletocart = () => {
    setTimeout(() => {
      navigate("/cart");
    }, 300);
    setUserCartShow(false);
  };

  return (
    <nav className="bg-[#F5F5F3] py-5 lg:px-0 px-4 lg:pt-[100px] pt-16">
      <Container>
        <div className="flex justify-between items-center">
          <div className="w-1/5">
            <div
              ref={catref}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              <FaBars />
              <p
                className="text-[14px] font-sans font-normal hidden lg:block hover:text-[#262626]
               text-[#262626] transition ease-in-out delay-400"
              >
                Shop by Category
              </p>
              {catshow && (
                <div className="z-50 absolute top-[180px] bg-[#262626] w-[250px] p-[10px] py-[20px]">
                  <ul className="text-[14px] font-sans font-normal text-white capitalize overflow-hidden">
                    {[
                      "accessories",
                      "furniture",
                      "electronics",
                      "clothes",
                      "bags",
                      "home appliances",
                    ].map(cat => (
                      <li
                        key={cat}
                        className="py-[10px] hover:translate-x-5 duration-300 ease-in-out border-b border-[#D8D8D8]"
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="3/5 relative mr-5">
            <input
              value={searchinput}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Search Products"
              className="pl-[20px] py-[16px] h-[50px] lg:w-[601px] outline-none bg-white rounded-lg"
            />
            <div className="absolute top-[50%] translate-y-[-50%] right-[20px]">
              <FaSearch />
            </div>
            {searchfilter.length > 0 && (
              <div className="lg:w-[600px]  w-[300px] h-[500px] overflow-y-scroll z-50 absolute top-[80px] lg:left-0 -left-10 pb-3 bg-white shadow-md rounded-md">
                {searchfilter.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleSingleSearch(item.id)}
                    className={`flex bg-gray-900 justify-around items-center py-[10px] cursor-pointer ${
                      index === selectedItemIndex ? "bg-[aliceblue]" : ""
                    }`}
                  >
                    <div className="w-[30%]">
                      <img
                        className="lg:h-[120px] lg:w-[150px] h-20 w-20"
                        src={item.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="w-[60%]">
                      <h2 className="font-sans text-[16px] capitalize font-bold pb-[10px] text-white">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-1/5 items-center relative">
            <div className="flex justify-end gap-x-4">
              <div ref={userref} className="flex cursor-pointer">
                <FaUser />
                <IoMdArrowDropdown />
              </div>
              {usershow && (
                <div className="bg-[#000] w-[250px] py-5 px-5 absolute top-[50px] z-50 lg:left-0 left-[-200px] text-center rounded-md">
                  <ul className="text-white font-sans text-[16px] capitalize cursor-pointer">
                    <li className="pb-[10px] hover:pl-[10px] duration-300 ease-in-out font-sans text-[18px] font-medium">
                      sign up
                    </li>
                    <li className="pb-[10px] hover:pl-[10px] duration-300 ease-in-out font-sans text-[18px] font-medium cursor-pointer">
                      login
                    </li>
                    <li className="pb-[10px] hover:pl-[10px] duration-300 ease-in-out font-sans text-[18px] font-medium cursor-pointer">
                      my account
                    </li>
                  </ul>
                </div>
              )}

              <div ref={usercartref} className="relative cursor-pointer">
                <FaShoppingCart className="size-[20px]" />
                {data.length > 0 && (
                  <div className="h-[20px] w-[20px] leading-[20px] bg-[#262626] text-white rounded-full absolute top-[-15px] right-[-10px] text-center">
                    {data.length}
                  </div>
                )}
              </div>

              <div ref={userstable}>
                <div
                  className={`fixed top-0 right-0 h-full lg:w-[400px] w-[300px] z-50 bg-[aliceblue] shadow-lg transition-transform duration-500 ease-in-out rounded-l-md ${
                    usercartshow && data.length > 0
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                >
                  <div className="flex justify-between p-5">
                    <h3 className="font-semibold font-sans text-xl">
                      Cart items
                    </h3>
                    <button
                      onClick={() => setUserCartShow(false)}
                      className="text-2xl cursor-pointer"
                    >
                      <RxCross2 />
                    </button>
                  </div>

                  <div className="p-5 overflow-y-auto h-[calc(100%-60px)]">
                    {data.map((item, index) => (
                      <div key={index} className="pb-5 border-b border-black">
                        <div className="flex justify-around items-center py-[10px]">
                          <img
                            className="w-[100px] h-[100px]"
                            src={item.thumbnail}
                            alt=""
                          />
                          <div>
                            <h2 className="font-sans text-[16px] capitalize font-bold pb-[10px] px-3">
                              {item.title}
                            </h2>
                            <h4 className="font-sans text-[16px] capitalize font-bold px-3">
                              ${item.price}
                            </h4>
                          </div>
                          <div
                            onClick={() => handledelete(index)}
                            className="pr-3 cursor-pointer"
                          >
                            <RxCross2 />
                          </div>
                        </div>
                      </div>
                    ))}

                    {data.length > 0 && (
                      <div className="flex justify-center mt-5">
                        <button
                          onClick={handletocart}
                          className="w-full h-[50px] text-center border-2 border-[#262626] font-sans text-[16px] capitalize font-bold hover:bg-[#262626] duration-500 ease-in-out hover:text-white rounded-l cursor-pointer"
                        >
                          View Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
