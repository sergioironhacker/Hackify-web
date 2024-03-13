import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { createContribution } from "../services/IdeaService";

const PaymentSuccess = () => {
  const { id, amount } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const makeContribution = async () => {
      try {
        await createContribution(id, amount);
      } catch (error) {
        console.error("Error al realizar la contribución", error);
      }
    };
    makeContribution();
    setTimeout(() => {
      navigate(`/ideas/${id}`)
    }, 3000);
  }, [amount, id, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Pago realizado con éxito!</h1>
      <p>Has pagado {amount} €</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="#4CAF50">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    </div>
  );
};

export default PaymentSuccess;
