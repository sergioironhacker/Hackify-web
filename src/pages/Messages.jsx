import MessagingComponent from '../pages/MessagingComponent'; // Importa el componente de mensajería

function Messages({ user }) {
  return (
    <div>
      <MessagingComponent user={user} />
    </div>
  );
}

export default Messages;