function CreateIdeaIcon({ width = 24, height = 24 }) {
  return (
    <img
      src="https://cdn-icons-png.flaticon.com/128/632/632391.png"
      alt="Idea Icon"
      width={width}
      height={height}
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  );
}

export default CreateIdeaIcon;
