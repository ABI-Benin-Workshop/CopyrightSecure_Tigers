import { useContext } from "react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { MdOutlinePerson, MdOutlineWallet } from "react-icons/md";
import { StateContext } from "../../../context/context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { connect } = useContext(StateContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    connect().then((res) => {
      if (res.success) {
        return navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className="flex items-center justify-center grow">
      <div className="flex flex-col items-center py-8 my-40 border border-white rounded-lg w-72 gap-y-5">
        <div className="flex flex-col items-center gap-y-1">
          <div className="flex items-center justify-center rounded-full bg-secondary">
            <MdOutlinePerson className="w-10 h-10" />
          </div>
          <div className="text-xl font-semibold">Welcome</div>
        </div>
        <span className="text-xs">Log in to continue</span>
        <PrimaryButton className="px-3 bg-secondary" onClick={handleLogin}>
          <div className="flex items-center justify-center gap-x-1">
            <MdOutlineWallet className=" size-5" />
            <span>Continue with wallet</span>
          </div>
        </PrimaryButton>
        <span className="text-xs">
          Not registered?{" "}
          <Link to="/auth/register" className="text-blue-600">
            Create account
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Login;
