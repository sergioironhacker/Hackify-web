import { useState, useEffect } from "react";

const IdeaDetailMain = ({ idea }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const timeLimit = new Date(idea.timeLimit).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = timeLimit - currentTime;
    return Math.max(0, timeDifference);
  }

  // Function to format the time remaining into hours, minutes, and seconds
  function formatTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)); // Calculate remaining days
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate remaining hours
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes
    const seconds = Math.floor((time % (1000 * 60)) / 1000); // Calculate remaining seconds
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    // Update the time remaining every second
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [idea.timeLimit]);

  return (
    <div className="bg-tw-background p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-tw-dark-gray">
        {idea.title}
      </h2>
      <p className="text-lg text-tw-dark-gray mb-4">{idea.description}</p>
      <p className="text-lg text-tw-dark mb-2">Localización: </p>
      <p className="text-lg text-green-400 mb-2">
        {idea.location.zipcode}, {idea.location.city}, {idea.location.country}{" "}
      </p>
      <p className="text-lg text-tw-dark mb-2">Cantidad recaudada:</p>
      <p className="text-3xl text-green-400 mb-2">
        {idea.contributionTotal} /{" "}
        <span className="font-bold">{idea.contributionMax}€</span>
      </p>
      <p className="text-lg text-tw-dark mb-2">Tiempo restante: </p>
      <p>
        <span className="text-3xl text-green-400 mb-2">
          {formatTime(timeRemaining)}
        </span>
      </p>
    </div>
  );
};

export default IdeaDetailMain;
