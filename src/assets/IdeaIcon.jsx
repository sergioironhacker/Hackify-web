function IdeaIcon({ width = 24, height = 24, color = "#ffffff" }) {
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
        <path d="M12 22v-2M12 18V8M9 5l3-3 3 3M7.5 9h5M7.5 12h5M7.5 15h5"></path>
      </svg>
    );
  }
  
  export default IdeaIcon;
  