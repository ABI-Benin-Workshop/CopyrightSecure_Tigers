import { useState } from "react";

const Tabbar = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex pt-6 gap-x-4 text-secondary">
      <button
        onClick={() => setActive(0)}
        className={`p-2 px-4  rounded-lg transition-all duration-300  ${
          active == 0 ? "bg-secondary/50 text-white" : ""
        }`}
      >
        Contents
      </button>
      <button
        onClick={() => setActive(1)}
        className={`p-2 px-4  rounded-lg transition-all duration-300  ${
          active == 1 ? "bg-secondary/50 text-white" : ""
        }`}
      >
        Creators
      </button>
    </div>
  );
};

export default Tabbar;
