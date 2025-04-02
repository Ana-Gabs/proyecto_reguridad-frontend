import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Box, Button, TextField } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { PasswordField } from "../funccions/validations/Password";
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
    const [step, setStep] = useState("login");
    const [secretUrl, setSecretUrl] = useState("");

    const handleBackClick = () => navigate(-1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const res = await axios.post(`${WEBSERVICE_IP}/register`, {
                email: formData.emailOrUsername,
                password: formData.password,
            });
            setSecretUrl(res.data.secret);
            setStep("qr");
        } catch (error) {
            setMensaje("Error al registrar usuario.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
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
            setMensaje("Error al iniciar sesión.");
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
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
            setMensaje("Error al verificar OTP.");
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
                        <Grid item xs={12} sm={12} md={10} lg={1} container justifyContent="center" alignItems="center" direction="column">
                            <TextField
                                label="Usuario / Correo"
                                name="emailOrUsername"
                                value={formData.emailOrUsername}
                                onChange={handleChange}
                                fullWidth
                                error={!!errores.credentials}
                                helperText={errores.credentials}
                            />
                        </Grid>

                        <Grid item xs={12} sm={10} md={8} lg={3}>
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
                            <Grid item xs={12} sm={6}>
                                <Button type="submit" variant="contained" className="MuiButton-contained" fullWidth>
                                    Iniciar sesión
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" className="MuiButton-contained" fullWidth onClick={handleRegister}>
                                    Registrarse
                                </Button>
                            </Grid>
                        </Grid>
                        {mensaje && <p className="mensaje">{mensaje}</p>}
                    </form>
                )}

                {step === "qr" && secretUrl && (
                    <div style={{ textAlign: "center" }}>
                        <QRCodeSVG value={secretUrl} />
                        <p>Escanea este QR con Google Authenticator</p>
                        <Button variant="contained" onClick={() => setStep("login")}>
                            Regresar
                        </Button>
                    </div>
                )}

                {step === "otp" && (
                    <form onSubmit={verifyOTP}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Verificar
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
