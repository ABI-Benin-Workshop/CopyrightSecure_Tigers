import Content from "../../components/Content/Content";
import { MdSearch } from "react-icons/md";
import Tabbar from "../../components/Tabbar/Tabbar";

const Home = () => {
  return (
    <main className="">
      <Tabbar />
      <div className="flex justify-between pt-8 pb-6">
        <div className="relative w-[400px]">
          <input
            type="text"
            id="voice-search"
            className="outline-none border text-sm rounded-lg block w-full p-2.5  bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-secondary focus:border-secondary"
            placeholder="Search tag..."
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 flex items-center end-0 pe-3"
          >
            <MdSearch />
          </button>
        </div>
        <span>718 contents</span>
      </div>
      <div className="grid grid-cols-4 gap-y-4">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </main>
  );
};

export default Home;
