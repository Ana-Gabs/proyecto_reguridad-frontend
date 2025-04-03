import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;

const S1Time = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${WEBSERVICE_IP}/logs/time`) 
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.keys(data).map((key) => ({
          time: `${key}s`,
          count: data[key],
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#FF8042" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default S1Time;
