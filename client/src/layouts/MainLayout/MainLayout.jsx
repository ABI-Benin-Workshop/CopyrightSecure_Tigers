import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext } from "react";
import { StateContext } from "../../context/context";

const MainLayout = () => {
  const { address } = useContext(StateContext);

  return (
    <div className="flex flex-col bg-custom-gradient grow pt-[81px] px-4 relative">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default MainLayout;
