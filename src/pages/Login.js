import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Box, Button, TextField } from "@mui/material";
import { PasswordField } from "../funccions/validations/Password";
import "../styles/Login.css";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP || "http://localhost:3001";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setErrores({});

        if (!formData.emailOrUsername.trim() || !formData.password.trim()) {
            setMensaje("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch(`${WEBSERVICE_IP}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Guardar token y usuario en localStorage
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));

                navigate("/home");
            } else {
                // Manejar errores del backend
                setErrores(result.intDataMessage ? result.intDataMessage[0] : {});
                setMensaje(result.error || "Error al iniciar sesión.");
            }
        } catch (error) {
            setMensaje("Error de conexión. Inténtalo de nuevo más tarde.");
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

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <PasswordField
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errores.credentials}
                                helperText={errores.credentials}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Iniciar sesión
                            </Button>
                        </Grid>
                    </Grid>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                </form>

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
