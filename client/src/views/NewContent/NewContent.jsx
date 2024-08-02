import { useForm } from "react-hook-form";
import PrimaryButton from "../../components/Button/PrimaryButton";

const NewContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="flex items-center justify-center grow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] border border-gray-600 rounded-lg flex flex-col p-4"
      >
        <div className="flex flex-col mb-3 gap-y-1">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <input
            className="bg-transparent border border-gray-600 w-full text-sm px-2 py-1.5 rounded-lg outline-none focus:border focus:border-secondary text-gray-900"
            type="text"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-3 gap-y-1">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            className="bg-transparent border border-gray-600 w-full text-sm px-2 py-1.5 rounded-lg outline-none focus:border focus:border-secondary text-gray-900 resize-none"
            {...register("description", { required: true })}
            rows={5}
            maxLength={500}
          ></textarea>
        </div>
        <div className="flex flex-col mb-3 gap-y-1">
          <label className="text-sm" htmlFor="amount">
            Amount
          </label>
          <input
            className="bg-transparent border border-gray-600 w-full text-sm px-2 py-1.5 rounded-lg outline-none focus:border focus:border-secondary text-gray-900"
            type="number"
            {...register("amount", { required: true })}
          />
        </div>
        <PrimaryButton type="submit">Create</PrimaryButton>
      </form>
    </main>
  );
};

export default NewContent;
