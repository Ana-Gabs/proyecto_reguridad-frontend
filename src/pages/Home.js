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
                <Typography variant="h4">Bienvenido al Home</Typography>
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
        </>
    );
};

export default Home;
