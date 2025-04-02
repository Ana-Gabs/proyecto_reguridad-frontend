const WEBSERVICE_IP =
  process.env.REACT_APP_WEBSERVICE_IP || "https://proyecto-seguridad-backend2.onrender.com";

if (!process.env.REACT_APP_WEBSERVICE_IP) {
  console.warn(
    "Advertencia: La variable de entorno REACT_APP_WEBSERVICE_IP no está definida. Usando la URL predeterminada: " +
      WEBSERVICE_IP
  );
}

export default WEBSERVICE_IP;
