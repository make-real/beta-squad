import { Loader } from "./Loader";

const Button = ({ children, text, className, loading, ...res }) => {
  let styleClasses = `
    ${!text && "bg-[#C595C6]"}
    ${text && "text-gray-400 hover:text-[#C595C6]"}
    cursor-pointer
    relative
    w-fit
    mt-3
    px-6
    py-2
    text-sm
    text-white
    rounded-lg
   ${!text ? "hover:bg-[#d2a6d3]" : "hover:bg-gray-100"}
   ${" " + className}
  `;
  return (
    <button disabled={loading} {...res} className={styleClasses}>
      {loading ? <Loader dark /> : <h6>{children}</h6>}
    </button>
  );
};

export default Button;
