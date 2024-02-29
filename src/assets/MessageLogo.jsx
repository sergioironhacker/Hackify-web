function MessageLogo({ width = 24, height = 24 }) {
  return (
    <img
      src="https://cdn-icons-png.flaticon.com/128/542/542689.png"
      alt="Message Logo"
      width={width}
      height={height}
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  );
}

export default MessageLogo;