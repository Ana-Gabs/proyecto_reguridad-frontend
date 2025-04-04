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
                        <strong>Alumno:</strong> TSU. Ana Gabriela Contreras Jiménez
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
