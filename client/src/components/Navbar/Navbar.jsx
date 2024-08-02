import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Lock.png";
import PrimaryButton from "../Button/PrimaryButton";
import { useContext } from "react";
import { StateContext } from "../../context/context";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const { address, disconnect } = useContext(StateContext);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect().then((res) => {
      if (res.success) {
        return navigate("/auth/login", { replace: true });
      }
    });
  };

  return (
    <header className="fixed top-0 z-10 flex justify-between w-full px-4 py-5 border-b border-gray-700 backdrop-blur-lg">
      <div className="flex items-center gap-x-1">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <Link to="/">
          <h1 className="text-xl font-semibold text-white">CopyrightSecure</h1>
        </Link>
      </div>
      <nav className="">
        <ul className="flex items-center gap-x-4">
          {address ? (
            <>
              <li>
                <Link to="content/new" className="hover:text-secondary">
                  New content
                </Link>
              </li>
              <li className="ms-6">
                <PrimaryButton
                  onClick={handleDisconnect}
                  className="flex items-center mr-4 text-red-500 gap-x-1"
                >
                  <MdOutlineLogout className="size-6" />
                  Logout
                </PrimaryButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <PrimaryButton>
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-sm border rounded-lg"
                  >
                    Login
                  </Link>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 text-sm border border-transparent rounded-lg bg-secondary"
                  >
                    Register
                  </Link>
                </PrimaryButton>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
