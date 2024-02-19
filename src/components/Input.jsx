

function Input({ type, placeholder, icon, name, onChange }) {
  return (
    <>
      <input type={type} name={name} onChange={onChange} className="form-style" placeholder={placeholder} />
      <i className={`input-icon ${icon}`}></i>
    </>
  );
}

export default Input;
