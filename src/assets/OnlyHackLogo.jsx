

const OnlyHackLogo = ({ width = 200, height = 50, fill = "#fff" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 200 50">
      <text x="0" y="40" fill={fill} fontSize="40px" fontWeight="bold">OnlyHack</text>
    </svg>
  );
};

export default OnlyHackLogo;