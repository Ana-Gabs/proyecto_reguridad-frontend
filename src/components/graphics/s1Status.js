import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const S1Status = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${WEBSERVICE_IP}/logs/status`) 
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.keys(data).map((key, index) => ({
          name: key,
          value: data[key],
          color: COLORS[index % COLORS.length],
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default S1Status;
