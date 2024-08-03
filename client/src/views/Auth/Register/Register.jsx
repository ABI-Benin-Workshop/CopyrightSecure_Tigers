import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineWallet } from "react-icons/md";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import RoleManager from "../../../components/RoleManager/RoleManager";
import { useContext, useState } from "react";
import { StateContext } from "../../../context/context";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { connect } = useContext(StateContext);
  const navigate = useNavigate();
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRegister = () => {
    if (username) {
      connect(true, [username, role]).then((res) => {
        if (res.success) {
          return navigate("/", { replace: true });
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-center grow">
      <div className="flex flex-col items-center px-8 py-8 my-40 border border-white rounded-lg w-80 gap-y-5">
        <div className="flex flex-col items-center gap-y-1">
          <div className="flex items-center justify-center rounded-full bg-secondary">
            <MdOutlinePerson className="w-10 h-10" />
          </div>
          <div className="text-xl font-semibold">Welcome</div>
        </div>
        <span className="text-xs">Sign in to continue</span>
        <form className="flex flex-col w-full gap-2">
          <div className="flex flex-col mb-2 gap-y-2">
            <label htmlFor="username" className="text-sm font-bold">
              Username
            </label>
            <input
              onChange={handleChange}
              required
              type="text"
              id="username"
              value={username}
              placeholder="Enter your username"
              className="block p-2 text-sm text-gray-900 rounded-lg outline-none placeholder:text-sm focus:border ring-0 focus:ring-0 focus:border-secondary"
            />
          </div>
          <div className="flex flex-col mb-2 gap-y-2">
            <span className="text-sm font-bold">Choose a role</span>
            <RoleManager role={role} setRole={setRole} />
          </div>
          <PrimaryButton
            className="bg-secondary"
            type="button"
            onClick={handleRegister}
          >
            <div className="flex items-center justify-center gap-x-1">
              <MdOutlineWallet className=" size-5" />
              <span>Continue with wallet</span>
            </div>
          </PrimaryButton>
          <span className="text-xs">
            Already registered?{" "}
            <Link to="/auth/login" className="text-blue-600">
              Log to your account
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Register;
