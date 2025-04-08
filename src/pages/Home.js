// ./pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Header from '../components/common/Header';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Box className="home-container">
                <Box className="home-box">
                    <div className="intro-text">
                        <h1>Bienvenido a mi Proyecto de Seguridad</h1>
                    </div>

                    <Typography className="subtitulo-letrero">
                        <strong>Alumno:</strong> TSU. Ana Gabriela Contreras Jiménez XD
                    </Typography>
                    <Typography className="subtitulo-letrero">
                        <strong>Matrícula:</strong> 2022371069
                    </Typography>
                    <Typography className="subtitulo-letrero">
                        <strong>Grupo:</strong> IDGS 11
                    </Typography>
                    <Typography className="subtitulo-letrero">
                        <strong>Docente:</strong> M.C.C. Emmanuel Martínez Hernández
                    </Typography>
                    <Typography className="subtitulo-letrero">
                        <strong>Programa:</strong> En el siguiente programa se puede apreciar una aplicación conectada con dos servidores distintos, para ver a través de las gráficas la diferencia entre un servidor sin rate limit y uno que sí lo tiene.
                    </Typography>

                    <Box className="home-buttons">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/logs')}
                        >
                            Ver Logs
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/login');
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Home;
