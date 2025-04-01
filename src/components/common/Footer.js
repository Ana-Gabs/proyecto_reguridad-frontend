import React from 'react';
import { Box, Container, Typography, Link, Fab, Grid } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import uteqLogo from '../../assets/images/uteq-h-16x9.png';
import '../../styles/variables.css';
import '../../styles/Footer.css';

function Footer() {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box component="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4} className="developer-info">
                        <Typography variant="h6" gutterBottom>
                            <br />
                            <GitHubIcon />
                            Developer La Puerta del Mañana
                        </Typography>
                        <Typography variant="body1">
                            <Link href="https://github.com/Gabs-Contreras" color="inherit">
                                GitHub
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={9} md={3} className="carousel-container">
                        <Carousel showThumbs={false} autoPlay infiniteLoop>
                            <div>
                                <img src={uteqLogo} alt="LOGO UTEQ" />
                            </div>
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={4} className="contact-info">
                        <Typography variant="h6" gutterBottom>
                            <br />
                            Contacto
                        </Typography>
                        <Typography variant="body1">
                            <EmailIcon />
                            Email: gday@lapuertadelmañana.com <br />
                            <PhoneIcon />
                            Teléfono: 442-456-7890
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Box className="footer-bottom">
                <Typography variant="body2">
                    {'Copyright © '}
                    <Link href="https://github.com/Gabs-Contreras" className="highlighted-link">
                        Developer La Puerta del Mañana
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
            <Fab
                color="primary"
                aria-label="scroll back to top"
                onClick={handleScrollTop}
                className="jump"
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Box>
    );
}

export default Footer;
