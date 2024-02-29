const UserIcon = ({ width = 24, height = 24 }) => {
  return (
    <img
      src="https://cdn-icons-png.flaticon.com/128/8148/8148808.png"
      alt="User Icon"
      width={width}
      height={height}
      style={{ filter: 'brightness(0) invert(1)' }} // Aplica filtro para hacer el ícono blanco
    />
  );
};

export default UserIcon;