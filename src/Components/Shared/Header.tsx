import { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../Shared/Container";
import Flex from "../Shared/Flex";

const Header = () => {
  const [show, setShow] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (barRef.current && barRef.current.contains(event.target as Node)) {
        setShow(prev => !prev);
      } else {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 px-4 lg:px-0 lg:py-5 py-3">
      <Container>
        <Flex className="justify-between items-center">
          <div className="w-1/3 items-center">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="w-2/3 items-center">
            <ul
              className={`lg:flex lg:flex-row flex flex-col gap-y-3 gap-x-10 pl-5 pt-5 lg:pt-0 font-sans text-[#767676] text-[18px] font-medium lg:static fixed duration-700 ease-in-out transition-all ${
                show
                  ? "bg-[#262626] top-0 left-0 w-1/2 h-full py-2"
                  : "top-0 left-[-250px] h-full"
              }`}
            >
              {["Home", "Shop", "About", "Contact", "Journal"].map(item => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : ``}
                    className="lg:hover:text-[#262626] hover:text-white lg:border-none border-b-2 border-[#767676] rounded-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:hidden cursor-pointer" ref={barRef}>
            <FaBars />
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

export default Header;
