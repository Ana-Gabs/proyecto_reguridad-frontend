
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

export function AlertBox({ showAlert, setShowAlert }) {
    const [alertOpacity, setAlertOpacity] = useState(1);

    useEffect(() => {
        let timer;
        if (showAlert) {
            setAlertOpacity(1);
            timer = setTimeout(() => {
                setAlertOpacity(0);
                setTimeout(() => {
                    setShowAlert(false);
                }, 500); // Duración de la transición de opacidad
            }, 4500); // Tiempo antes de comenzar la transición de opacidad
        }
        return () => clearTimeout(timer);
    }, [showAlert, setShowAlert]);

    return (
        showAlert && (
            <Box style={{ opacity: alertOpacity }}>
                <Alert variant="filled" severity="warning" onClose={() => setShowAlert(false)}>
                    Por favor, completa todos los campos.
                </Alert>
            </Box>
        )
    );
}