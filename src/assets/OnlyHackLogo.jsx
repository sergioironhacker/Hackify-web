const OnlyHackLogo = ({ width = 24, height = 24, fill = "#ffffff" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
      <path d="M11 13v2h2v-2zm0-6v4h2V7z"/>
    </svg>
  );
};

export default OnlyHackLogo;
