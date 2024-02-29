function UserIcon({ width = 24, height = 24, color = "#ffffff" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2c2.21 0 4 2.239 4 5s-1.79 5-4 5-4-2.239-4-5 1.79-5 4-5z"></path>
        <path d="M12 14c3.33 0 6 2.686 6 6H6c0-3.314 2.67-6 6-6z"></path>
      </svg>
    );
  }
  
  export default UserIcon;
  