import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const GuestLayout = () => {
  return (
    <div className="flex flex-col bg-custom-gradient grow">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default GuestLayout;
