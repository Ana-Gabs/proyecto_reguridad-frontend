import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;

const S1Status = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`${WEBSERVICE_IP}/logs/status`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.keys(data).map((key) => ({
          status: key,
          count: data[key],
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  };

  useEffect(() => {
    fetchData(); // Cargar datos iniciales
    const interval = setInterval(fetchData, 5000); // Actualizar cada 5 segundos
    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#0088FE" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default S1Status;