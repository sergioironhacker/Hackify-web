const OnlyHackLogo = ({ width = 24, height = 24 }) => {
  return (
    <img
      src="https://cdn-icons-png.flaticon.com/128/5241/5241009.png"
      alt="OnlyHack Logo"
      width={width}
      height={height}
      style={{ filter: 'brightness(0) invert(1)' }} // Aplica filtro para hacer el ícono blanco
    />
  );
};

export default OnlyHackLogo;