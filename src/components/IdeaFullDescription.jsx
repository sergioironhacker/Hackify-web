
const IdeaFullDescription = ( {idea} ) => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Toda la información sobre {idea.title}</h2>
        <p>{idea.fullDescription}</p>
      </div>
    );
  };
  
  export default IdeaFullDescription;
  