import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { PasswordField } from "../funccions/validations/Password"; // Assuming the custom password field is here.
import "../styles/Login.css";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
        otp: "",  // Agregamos el campo OTP aquí
    });
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});  // Los errores se gestionarán por campo
    const [step, setStep] = useState("login"); // Paso actual (login o otp)
    const [isLoading, setIsLoading] = useState(false); // Cargando

    const handleBackClick = () => navigate(-1); // Volver al paso anterior

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validación de los campos del formulario
    const validateForm = () => {
        let valid = true;
        let errors = {};

        // Validación para login
        if (step === "login") {
            if (!formData.emailOrUsername.trim()) {
                errors.emailOrUsername = "Este campo es obligatorio.";
                valid = false;
            }
            if (!formData.password.trim()) {
                errors.password = "La contraseña es obligatoria.";
                valid = false;
            }
        }

        // Validación para OTP
        if (step === "otp" && !formData.otp.trim()) {
            errors.otp = "El código OTP es obligatorio.";
            valid = false;
        }

        setErrores(errors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Validar antes de enviar la solicitud

        setIsLoading(true);
        setMensaje("");
        setErrores({});

        try {
            const res = await axios.post(`${WEBSERVICE_IP}/users/login`, {
                emailOrUsername: formData.emailOrUsername,
                password: formData.password,
            });

            if (res.data.requiresMFA) {
                setStep("otp"); // Cambiar al paso OTP
            } else if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/home"); // Redirigir si el login fue exitoso
            }
        } catch (error) {
            setIsLoading(false);
            setMensaje("Error al iniciar sesión.");
            console.error(error);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; 
    
        setMensaje("");   
        setErrores({});     
    
        try {
            const res = await axios.post(`${WEBSERVICE_IP}/users/verify-otp`, {
                email: formData.emailOrUsername,
                token: formData.otp,
            });
    
            if (res.data.success) {
                localStorage.setItem("token", res.data.token); 
                navigate("/home"); 
            } else {
                setMensaje("Código OTP incorrecto.");
            }
        } catch (error) {
            setMensaje("Error al verificar OTP.");
            console.error(error);
        } finally {
            setIsLoading(false);  
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-header">
                <Button onClick={handleBackClick}>Back</Button>
            </div>

            <Box className="login-box">
                <div className="intro-text">
                    <Typography variant="h4">¡Bienvenido de nuevo!</Typography>
                    <Typography variant="h6" className="subtitulo-letrero">Inicia sesión para continuar</Typography>
                </div>

                {step === "login" && (
                    <form onSubmit={handleLogin}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column">
                            <TextField
                                label="Correo o Usuario"
                                name="emailOrUsername"
                                value={formData.emailOrUsername}
                                onChange={handleChange}
                                fullWidth
                                error={!!errores.emailOrUsername}
                                helperText={errores.emailOrUsername}
                            />
                            <PasswordField
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errores.password}
                                helperText={errores.password}
                            />
                        </Grid>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24} /> : "Iniciar sesión"}
                                </Button>
                            </Grid>
                        </Grid>
                        {mensaje && <Typography className="mensaje">{mensaje}</Typography>}
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={verifyOTP}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item>
                                <TextField
                                    label="Código OTP"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errores.otp}
                                    helperText={errores.otp || mensaje}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} direction="column" justifyContent="flex-end" alignItems="center">
                            <Grid size>
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24} /> : "Verificar"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}

                <div style={{ padding: "10px", textAlign: "center" }}>
                    <Typography variant="body1" className="subtitulo-letrero">
                        ¿No tienes cuenta? <a href="/register">Regístrate</a>
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default Login;
