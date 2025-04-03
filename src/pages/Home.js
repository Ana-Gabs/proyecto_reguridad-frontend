import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Header from '../components/common/Header';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenido a mi Proyecto de Seguridad
                </Typography>

                <Typography variant="h6">
                    <strong>Alumno:</strong> TSU. Ana Gabriela Contreras Jiménez
                </Typography>
                <Typography variant="h6">
                    <strong>Matrícula:</strong> 2022371069
                </Typography>
                <Typography variant="h6">
                    <strong>Grupo:</strong> IDGS 11
                </Typography>
                <Typography variant="h6">
                    <strong>Docente:</strong> M.C.C. Emmanuel Martínez Hernández
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
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
        </>
    );
};

export default Home;
