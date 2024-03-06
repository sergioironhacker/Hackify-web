import clsx from "clsx";

const Button = ({ type, onClick, text, disabled, extraClassName }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "text-white text-sm font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none",
        extraClassName,
        {
          "bg-green-400 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300": !disabled,
          "opacity-50 pointer-events-none bg-green-400": disabled
        }
      )}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
