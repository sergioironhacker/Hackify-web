import IdeaCard from "./IdeaCard";

const BookmarkedIdeas = ( {ideas} ) => {
    if (ideas && ideas.length === 0) {
        <p>You have no bookmarked ideas yet</p>
      }
    
    return (
        <div>
        {ideas.map(idea => (
          <IdeaCard {...idea} key={idea.data.id} isBookmarked showBookmarkButton={false} />
        ))}
      </div>
   
    );
};

export default BookmarkedIdeas;