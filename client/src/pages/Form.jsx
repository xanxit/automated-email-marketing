
import Box from "../components/Box";

const Form = () => {
  return (
    <div className="flex flex-col relative">
      <h1 className="absolute -top-2 left-10 md:left-36 text-black font-bold text-2xl md:text-4xl pt-2">
        Fill in all the information
      </h1>
      <div className="pt-20 flex flex-col justify-center items-center">
        <Box />
      </div>
      <button className="absolute -bottom-16 right-16 md:right-40 bg-send hover:bg-indigo-700 rounded-3xl text-white text-lg w-28 px-3 py-2 text-center cursor-pointer">
        Send
      </button>
    </div>
  );
};

export default Form;
