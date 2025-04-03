import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { PasswordField } from "../funccions/validations/Password"; // Assuming the custom password field is here.
import "../styles/Login.css";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;
//const WEBSERVICE_IP = "http://localhost:3001";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
        otp: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});
    const [step, setStep] = useState("login");
    const [isLoading, setIsLoading] = useState(false);

    const handleBackClick = () => navigate(-1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;
        let errors = {};

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

        if (step === "otp" && !formData.otp.trim()) {
            errors.otp = "El código OTP es obligatorio.";
            valid = false;
        }

        setErrores(errors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Empezar el estado de carga
        setMensaje(""); // Limpiar mensaje previo
        setErrores({});  // Limpiar errores previos

        try {
            const res = await axios.post(`${WEBSERVICE_IP}/users/login`, {
                emailOrUsername: formData.emailOrUsername,
                password: formData.password,
            });

            // Log para revisar la respuesta
            console.log(res.data);

            if (res.data.requiresMFA) {
                setStep("otp"); // Cambiar al paso OTP
            } else if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/home"); // Redirigir al home si el login fue exitoso
            }
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
            setIsLoading(false);  // Desactivar el estado de carga
            setMensaje("Error al iniciar sesión. Revisa la consola para más detalles.");
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setMensaje("");
        setErrores({});

        try {
            const res = await axios.post(`${WEBSERVICE_IP}/users/verify-otp`,
                {
                    email: formData.emailOrUsername,
                    token: formData.otp,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


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
                <ArrowBackIcon className="back-arrow" onClick={handleBackClick} />
            </div>

            <Box className="login-box">
                <div className="intro-text">
                    <h1>¡Bienvenido de nuevo!</h1>
                    <h3 className="subtitulo-letrero">Inicia sesión para continuar</h3>
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
                            <Grid size={{xs:12}}>
                            <PasswordField
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                error={!!errores.password}
                                helperText={errores.password}
                            />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={{}}>
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
                            <Grid size={{}}>
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
