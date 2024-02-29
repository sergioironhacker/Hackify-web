function CreateIdeaIcon({ width = 24, height = 24 }) {
  return (
    <img
      src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png"
      alt="Pencil Icon"
      width={width}
      height={height}
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  );
}

export default CreateIdeaIcon;