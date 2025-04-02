import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Box, Button, TextField, CircularProgress } from "@mui/material";
import { PasswordField } from "../funccions/validations/Password"; // Assuming the custom password field is here.
import "../styles/Login.css";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP || "http://localhost:3001";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
        otp: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});
    const [step, setStep] = useState("login"); // To handle login or OTP step
    const [isLoading, setIsLoading] = useState(false); // To manage loading state

    const handleBackClick = () => navigate(-1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMensaje("");
        
        try {
            const res = await axios.post(`${WEBSERVICE_IP}/login`, {
                email: formData.emailOrUsername,
                password: formData.password,
            });

            if (res.data.requiresMFA) {
                setStep("otp");
            } else if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/home");
            }
        } catch (error) {
            setIsLoading(false);
            setMensaje("Error al iniciar sesión. Verifique sus credenciales.");
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMensaje("");

        try {
            const res = await axios.post(`${WEBSERVICE_IP}/verify-otp`, {
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
            setIsLoading(false);
            setMensaje("Error al verificar OTP.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <Button onClick={handleBackClick}>Back</Button>
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
                                label="Usuario / Correo"
                                name="emailOrUsername"
                                value={formData.emailOrUsername}
                                onChange={handleChange}
                                fullWidth
                                error={!!errores.credentials}
                                helperText={errores.credentials}
                            />
                            <PasswordField
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errores.credentials}
                                helperText={errores.credentials}
                            />
                        </Grid>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid>
                                <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24} /> : "Iniciar sesión"}
                                </Button>
                            </Grid>
                        </Grid>
                        {mensaje && <p className="mensaje">{mensaje}</p>}
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={verifyOTP}>
                        <Grid container spacing={3}>
                            <Grid>
                                <TextField
                                    label="Código OTP"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} direction="column" justifyContent="flex-end" alignItems="center">
                            <Grid>
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24} /> : "Verificar"}
                                </Button>
                            </Grid>
                        </Grid>
                        {mensaje && <p className="mensaje">{mensaje}</p>}
                    </form>
                )}

                <div style={{ padding: "10px", textAlign: "center" }}>
                    <h5 className="subtitulo-letrero">
                        ¿No tienes cuenta? <a href="/register">Regístrate</a>
                    </h5>
                </div>
            </Box>
        </div>
    );
};

export default Login;
