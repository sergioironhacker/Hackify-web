const Input = ({ value, onChange, name, placeholder, type, label, error, onBlur }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 font-medium text-tw-primary">
        {label}
      </label>
      <input
        type={type} name={name} id={name} value={value} onChange={onChange} placeholder={placeholder}
        onBlur={onBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tw-primary focus:border-tw-primary block w-full p-2.5"
      />
      {error && <div className="mt-2 text-red-600">{error}</div>}
  </div>
  )
}
export default Input;