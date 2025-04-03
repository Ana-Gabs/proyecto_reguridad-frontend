import React from "react";
import Header from "../components/common/Header"; 
import S1Level from "../components/graphics/s1Level";
import S1Status from "../components/graphics/s1Status";
import S1Time from "../components/graphics/s1Time";
import "../styles/Logs.css"; 

const Logs = () => {
  return (
    <>
      <Header />
      <div className="logs-container">
        <h2 className="logs-title">Gráficos de Logs</h2>
        
        <div className="grid-container">
          <div className="chart-box">
            <h3>Logs por Nivel</h3>
            <S1Level />
          </div>
          <div className="chart-box">
            <h3>Logs por Nivel</h3>
            <S1Level />
          </div>

          <div className="chart-box">
            <h3>Logs por Estado</h3>
            <S1Status />
          </div>
          <div className="chart-box">
            <h3>Logs por Estado</h3>
            <S1Status />
          </div>

          <div className="chart-box">
            <h3>Tiempo de Respuesta</h3>
            <S1Time />
          </div>
          <div className="chart-box">
            <h3>Tiempo de Respuesta</h3>
            <S1Time />
          </div>
        </div>
      </div>
    </>
  );
};

export default Logs;
