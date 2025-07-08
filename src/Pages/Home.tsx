import { useContext, useEffect, useRef, useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { Link } from "react-router-dom";
import { ApidataContext, type Product } from "../Hooks/ContextApi";
import Container from "../Components/Shared/Container";
import Post from "../Pagination/Post";
import PaginationArea from "../Pagination/PaginationArea";

const Home = () => {
  const data = useContext<Product[]>(ApidataContext);
  const [catshow, setcatShow] = useState(false);
  const [bandshow, setbandShow] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [categorysearchfilter, setCategorysearchfilter] = useState<Product[]>(
    []
  );
  const [menulist] = useState("");
  const [bandgory, SetBandgory] = useState<string[]>([]);

  const catref = useRef<HTMLDivElement>(null);
  const bandref = useRef<HTMLDivElement>(null);

  const [currentpage, setcurrentpage] = useState(1);
  const [perpage, setperpage] = useState(20);
  const [sortby, setSortby] = useState("featured");

  const baseData =
    categorysearchfilter.length > 0 ? categorysearchfilter : data;

  const sortedData = [...baseData];
  if (sortby === "price_low_high") {
    sortedData.sort((a, b) => a.price - b.price);
  } else if (sortby === "price_high_low") {
    sortedData.sort((a, b) => b.price - a.price);
  }

  const lastpage = perpage * currentpage;
  const firstpage = lastpage - perpage;

  const allData = sortedData.slice(firstpage, lastpage);

  const totalItems = baseData.length;
  const pagenumber: number[] = [];
  for (let i = 0; i < Math.ceil(totalItems / perpage); i++) {
    pagenumber.push(i);
  }

  const paginate = (pagenumber: number) => {
    setcurrentpage(pagenumber + 1);
  };
  const next = () => {
    if (currentpage < pagenumber.length) {
      setcurrentpage(state => state + 1);
    }
  };
  const prev = () => {
    if (currentpage > 1) {
      setcurrentpage(state => state - 1);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catref.current?.contains(e.target as Node)) {
        setcatShow(!catshow);
      } else {
        setcatShow(false);
      }
      if (bandref.current?.contains(e.target as Node)) {
        setbandShow(!bandshow);
      } else {
        setbandShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [catshow, bandshow]);

  useEffect(() => {
    setCategory([...new Set(data.map(item => item.category))]);
    SetBandgory([...new Set(data.map(item => item.brand))]);
  }, [data]);

  const handlesubcategory = (citem: string) => {
    const categoryfilter = data.filter(item => item.category === citem);
    setCategorysearchfilter(categoryfilter);
    setcurrentpage(1);
  };

  const handlebrand = (citem: string) => {
    const brandfilter = data.filter(item => item.brand === citem);
    setCategorysearchfilter(brandfilter);
    setcurrentpage(1);
  };

  const handleAllProducts = () => {
    setCategorysearchfilter([]);
  };

  return (
    <section className="lg:py-[80px] py-5 lg:px-0 px-4 bg-[#F5F5F3]">
      <Container>
        <div className="lg:flex justify-between">
          <div className="lg:w-[20%] w-full flex-wrap">
            <h2 className="font-sans lg:text-[49px] text-[25px] font-bold text-[#262626] pb-[11px]">
              Products
            </h2>
            <p className="font-sans font-normal text-[16px] text-[#767676]">
              <Link to="/">Home &#62; shop</Link>
            </p>

            <div className="lg:pt-[112px] flex justify-between items-center">
              <h2 className="cursor-pointer font-sans text-[20px] font-bold text-[#262626] pb-[30px] lg:pt-0 pt-5">
                Shop by Category
              </h2>
            </div>
            <div
              ref={catref}
              className="lg:h-[400px] h-[200px] overflow-y-scroll cursor-pointer"
            >
              <div className="py-4">
                <button
                  onClick={handleAllProducts}
                  className="font-sans text-[16px] font-normal cursor-pointer"
                >
                  All Products
                </button>
              </div>
              <ul>
                {category.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handlesubcategory(item)}
                    className="flex justify-between font-sans text-[16px] font-normal lg:py-[10px] py-1 border-b border-[#F0F0F0] capitalize"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={bandref}
              className="lg:pt-[50px] flex justify-between pb-[30px] items-center"
            >
              <h2 className="font-sans text-[20px] font-bold text-[#262626]">
                Shop by Brand
              </h2>
              <TiArrowSortedUp />
            </div>
            <div className="lg:h-[400px] h-[200px] overflow-y-scroll cursor-pointer">
              {bandgory.map((item, index) => (
                <ul
                  key={index}
                  className="lg:py-[10px] py-1 border-b border-[#F0F0F0]"
                >
                  <li
                    onClick={() => handlebrand(item)}
                    className="font-sans text-[16px] font-normal capitalize"
                  >
                    {item}
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <div className="lg:w-[75%] lg:pt-[220px]">
            <div className="lg:flex justify-between">
              <div className="lg:w-[20%] flex gap-x-7 items-center lg:pt-0 pt-[20px] lg:justify-start justify-between lg:px-0 px-2"></div>

              <div className="lg:w-[30%] flex gap-x-5 lg:justify-end py-[20px] lg:py-0">
                <div className="flex gap-6">
                  <p className="font-sans text-[16px] text-[#767676] py-2 font-medium capitalize">
                    Sort by :
                  </p>
                  <select
                    value={sortby}
                    onChange={e => setSortby(e.target.value)}
                    className="font-sans text-[16px] text-[#767676] capitalize border-2 border-bg-[#000] h-[36px] w-[250px] pl-[10px]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="lg:w-[20%] flex gap-x-5 lg:justify-end">
                <div className="flex lg:gap-x-3 gap-x-[40px] justify-end lg:pb-0 pb-[20px]">
                  <p className="font-sans text-[16px] text-[#767676] py-2 font-medium capitalize">
                    Show :
                  </p>
                  <select
                    value={perpage}
                    onChange={e => setperpage(Number(e.target.value))}
                    className="border-2 border-bg-[#000] h-[36px] lg:w-[139px] w-[250px] pl-[10px]"
                  >
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <Post allData={allData} menulist={menulist} />
            </div>

            <div className="text-end">
              <PaginationArea
                pagenumber={pagenumber}
                paginate={paginate}
                currentpage={currentpage}
                next={next}
                prev={prev}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
