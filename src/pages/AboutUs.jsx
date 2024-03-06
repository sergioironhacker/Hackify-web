import AboutUsLogo from '../assets/AboutUsLogo';

const AboutUsPage = () => {
  return (
    <div className="p-4 text-green-400">
      <h1 className="text-3xl font-bold mb-4 text-green-500">Acerca de OnlyHack</h1>
      <div className="mb-6 text-green-500">
        <p className="mb-4 text-green-500">
          En OnlyHack, estamos dedicados a romper las barreras financieras que impiden que las ideas brillantes se conviertan en realidad. Nuestra empresa se especializa en respaldar proyectos innovadores que desafían el status quo y abren nuevos horizontes en diversas industrias.
        </p>
        <p className="mb-4 text-green-500">
          Nuestro enfoque se centra en apoyar a emprendedores con ideas disruptivas que no cuentan con los recursos financieros necesarios para llevarlas a cabo por sí mismos. Creemos que cada idea tiene el potencial de cambiar el mundo, y estamos aquí para asegurarnos de que incluso las más ambiciosas no se queden en el camino debido a la falta de financiamiento.
        </p>
       {/*  <p className="mb-4">
          En OnlyHack, nos enorgullece ofrecer una plataforma transparente y segura donde emprendedores e inversores pueden conectarse, colaborar y hacer realidad proyectos que de otro modo podrían haberse quedado en el olvido. Creemos en el poder de la innovación para impulsar el progreso económico y social, y estamos comprometidos a hacer nuestra parte para hacer que eso suceda.
        </p>
        <p className="mb-4">
          Únete a nosotros en nuestro viaje para democratizar el acceso al capital y transformar ideas en acciones. Con tu apoyo, podemos hacer que el futuro sea más brillante y más inclusivo para todos. ¡Juntos, podemos hacer posible lo imposible con OnlyHack!
        </p> */}
      </div>
      <div className="flex justify-center"> 
        <AboutUsLogo />
      </div>
    </div>
  );
}

export default AboutUsPage;
