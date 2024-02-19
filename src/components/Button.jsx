import clsx from "clsx"

const Button = ({ type, onClick, text, disabled, extraClassName }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "text-white bg-tw-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center",
        extraClassName,
        { "opacity-50 pointer-events-none": disabled },
        { "hover:bg-blue-800": !disabled }
        )}
    >
        {text}
      </button>
  )
}

export default Button