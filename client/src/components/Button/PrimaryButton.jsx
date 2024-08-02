import PropTypes from "prop-types";

const PrimaryButton = ({ children, className, ...extra }) => {
  return (
    <button
      className={`rounded-lg py-2 active:scale-[.97] transition-all duration-300 text-sm ${className}`}
      {...extra}
    >
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PrimaryButton;
