import { HiOutlineShieldCheck } from "react-icons/hi2";
import { FaEthereum } from "react-icons/fa";

const Content = () => {
  return (
    <div className="w-[300px] bg-custom-gradient2 rounded-lg shadow flex flex-col items-center">
      <a href="#">
        <img
          className="p-4 rounded-t-lg"
          src="https://picsum.photos/250"
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="font-semibold tracking-tight text-white">
            Apple Watch Series 7 GPS, Aluminium Case
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5 text-green-500 gap-x-1">
          <span className="text-xs 2xl:text-sm">Validated</span>
          <HiOutlineShieldCheck className="size-4 2xl:size-5" />
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-xl font-bold text-white gap-x-1">
            0.001 <FaEthereum />
          </span>
          <a
            href="#"
            className="text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};
export default Content;
