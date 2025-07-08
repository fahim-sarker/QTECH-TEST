import { useState, type ChangeEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Container from "../Components/Shared/Container";
import {
  productdeccrement,
  productincrement,
  productremove,
} from "../Slice/ProductSlice";

interface ProductItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  qty: number;
}

interface RootState {
  Product: {
    cartitem: ProductItem[];
  };
}

interface FormData {
  name: string;
  email: string;
  address: string;
}

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.Product.cartitem);

  const handleincrement = (index: number) => {
    dispatch(productincrement(index));
  };

  const handledecrement = (index: number) => {
    dispatch(productdeccrement(index));
  };

  const handleremove = (index: number) => {
    dispatch(productremove(index));
  };

  const { totalprice, totalquantity } = data.reduce(
    (acc, item) => {
      acc.totalprice += item.price * item.qty;
      acc.totalquantity += item.qty;
      return acc;
    },
    { totalprice: 0, totalquantity: 0 }
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
  });

  const handlecheckout = () => {
    setShowModal(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalCheckout = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.address.trim()
    ) {
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    toast.success("Order placed successfully!", { position: "top-right" });

    setShowModal(false);
    setFormData({ name: "", email: "", address: "" });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="lg:my-[80px] my-[30px] lg:px-0 px-4 bg-[#F5F5F3] py-5">
      <Container>
        <h2 className="font-sans font-bold lg:text-[36px] text-[25px]">Cart</h2>
        <p className="text-[16px] font-sans font-normal lg:pb-[80px] pb-[50px]">
          Home &#62; Cart
        </p>

        <div className="border-2 border-[#F0F0F0] overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-[#F5F5F3] h-[90px] flex justify-between items-center">
              <div className="w-[40%] pl-10">
                <h4 className="text-[16px] font-sans font-bold">Product</h4>
              </div>
              <div className="w-[15%] text-center">
                <h4 className="text-[16px] font-sans font-bold">Price</h4>
              </div>
              <div className="w-[30%] text-center">
                <h4 className="text-[16px] font-sans font-bold">Quantity</h4>
              </div>
              <div className="w-[15%] text-center">
                <h4 className="text-[16px] font-sans font-bold">Total</h4>
              </div>
            </div>

            {data.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between py-4 items-center border-b border-[#F0F0F0]"
              >
                <div className="flex items-center w-[40%] pl-4 gap-x-4">
                  <RxCross2
                    onClick={() => handleremove(index)}
                    className="cursor-pointer"
                  />
                  <img
                    className="h-[80px] w-[80px] object-cover"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <p className="text-[14px] font-sans font-bold">
                    {item.title}
                  </p>
                </div>
                <div className="w-[15%] text-center">
                  <p className="text-[14px] font-sans font-bold">
                    ${item.price}
                  </p>
                </div>
                <div className="w-[30%]">
                  <div className="w-[120px] h-[36px] flex items-center justify-center mx-auto">
                    <p
                      onClick={() => handledecrement(index)}
                      className="font-bold text-[20px] px-2 cursor-pointer"
                    >
                      -
                    </p>
                    <p className="font-bold px-2">{item.qty}</p>
                    <p
                      onClick={() => handleincrement(index)}
                      className="font-bold text-[20px] px-2 cursor-pointer"
                    >
                      +
                    </p>
                  </div>
                </div>
                <div className="w-[15%] text-center">
                  <p className="text-[14px] font-sans font-bold">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <p className="text-end text-[16px] font-sans font-bold py-4">
          Cart totals
        </p>
        <div className="flex justify-end">
          <div className="border-2 border-[#262626] w-full max-w-[400px]">
            <div className="flex px-4 py-3 justify-between border-b border-[#262626]">
              <h3 className="text-[16px] font-sans font-bold">Subtotal</h3>
              <h3 className="text-[16px] font-sans font-bold">
                ${totalprice.toFixed(2)}
              </h3>
            </div>
            <div className="flex px-4 py-3 justify-between border-b border-[#262626]">
              <h3 className="text-[16px] font-sans font-bold">Quantity</h3>
              <h3 className="text-[16px] font-sans font-bold">
                {totalquantity}
              </h3>
            </div>
            <div className="flex px-4 py-3 justify-between">
              <h3 className="text-[16px] font-sans font-bold">Total</h3>
              <h3 className="text-[16px] font-sans font-bold">
                ${totalprice.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex justify-end my-4">
          <button
            onClick={handlecheckout}
            className="w-[200px] h-[50px] text-center border-2 border-[#262626] font-sans text-[16px] font-bold bg-[#000] text-white hover:bg-[#fff] duration-500 hover:text-black rounded cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-md w-full max-w-[400px]">
              <h2 className="text-xl font-bold mb-4">Checkout Form</h2>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  type="text"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  type="email"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Address</label>
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={3}
                  placeholder="Your Address"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalCheckout}
                  className="px-4 py-2 bg-[#000] text-white rounded hover:bg-[#333]"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        <Toaster />
      </Container>
    </div>
  );
};

export default Cart;
