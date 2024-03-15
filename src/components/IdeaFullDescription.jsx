
const IdeaFullDescription = ( {idea} ) => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Toda la información sobre {idea.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: idea.fullDescription }} />
        </div>
    );
  };
  
  export default IdeaFullDescription;
  