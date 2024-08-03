import { useForm } from "react-hook-form";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { useContext } from "react";
import { StateContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const NewContent = () => {
  const navigate = useNavigate();
  const { addWork } = useContext(StateContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    await addWork(data.title, data.description, data.amount);
    reset({});
    return navigate("/");
  };

  return (
    <main className="flex items-center justify-center grow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] 2xl:w-[500px] border border-white rounded-lg flex flex-col items-center p-4 2xl:px-6"
      >
        <div className="w-full pb-4 mb-8 text-2xl font-semibold text-center border-b border-gray-700">
          Securely register your works.
        </div>
        <div className="flex flex-col w-full mb-3 ">
          <label htmlFor="title" className="mb-1 text-sm 2xl:text-base">
            Title
          </label>
          <input
            className="w-full px-2 py-2 text-sm text-white bg-transparent border border-gray-600 rounded-lg outline-none focus:border focus:border-secondary"
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter a title"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Title</span> is required.
            </p>
          )}
        </div>
        <div className="flex flex-col w-full mb-3 ">
          <label htmlFor="description" className="mb-1 text-sm 2xl:text-base">
            Description
          </label>
          <textarea
            className="w-full px-2 py-2 text-sm text-white bg-transparent border border-gray-600 rounded-lg outline-none resize-none focus:border focus:border-secondary"
            {...register("description", { required: true })}
            rows={5}
            maxLength={500}
            placeholder="Enter an description"
          ></textarea>
          {errors.description && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Description</span> is required.
            </p>
          )}
        </div>
        <div className="flex flex-col w-full mb-3 ">
          <label className="mb-1 text-sm 2xl:text-base" htmlFor="amount">
            Amount (in ether)
          </label>
          <input
            className="w-full px-2 py-2 text-sm text-white bg-transparent border border-gray-600 rounded-lg outline-none focus:border focus:border-secondary"
            type="number"
            step={0.0001}
            min={0}
            placeholder="Enter an amout"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Amout</span> is required.
            </p>
          )}
        </div>
        <PrimaryButton
          type="submit"
          className="w-64 my-6 bg-secondary 2xl:text-base"
        >
          Create
        </PrimaryButton>
      </form>
    </main>
  );
};

export default NewContent;
