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
    }, [amount, id]);

  return (
    <div>
      <h1>Pago realizado con éxito!</h1>
      <p>Has pagado {amount} €</p>
    </div>
  );
};

export default PaymentSuccess;
