import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;
const S1Level = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${WEBSERVICE_IP}/logs/level`) 
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.keys(data).map((key) => ({
          level: key,
          count: data[key],
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="level" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default S1Level;

/*import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;

const S1Level = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`${WEBSERVICE_IP}/logs/level`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.keys(data).map((key) => ({
          level: key,
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
        <XAxis dataKey="level" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default S1Level;
*/