import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AlumnosUteq from '../../assets/images/alumnos-uteq.png';
import '../../styles/variables.css';
import '../../styles/Banner.css';

export default function Banner() {
  return (
    <Box className="banner-container">
      <Box className="left-part">
        <Box className="text-container">
          <Typography variant="h4">
            Organiza tu Día <br />
            Completa tus Tareas <br />
            Sé Productivo
          </Typography>
          <Typography variant="h6">
            Gestiona tus actividades con facilidad.
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" className="button">
              Comienza Ahora
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        className="right-part"
        style={{ backgroundImage: `url(${AlumnosUteq})` }}
      />
    </Box>
  );
}
