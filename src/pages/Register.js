import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Box, Button, TextField, CircularProgress } from '@mui/material';
import { validarCamposVacios } from '../funccions/EmptyFields';
import { AlertBox } from '../funccions/AlertBox';
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import { isValidPassword, isPasswordMatch, PasswordField } from '../funccions/validations/Password';
import '../styles/Register.css';

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP2;
//const WEBSERVICE_IP = "http://localhost:3001";
const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});
    const [emptyFields, setEmptyFields] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [step, setStep] = useState("register");
    const [qrUrl, setQrUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let newErrors = { ...errores };

        if (name === "password") {
            newErrors.passwordError = isValidPassword(value);
        } else if (name === "confirmPassword") {
            newErrors.confirmPasswordError = isPasswordMatch(formData.password, value);
        }

        setErrores(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setEmptyFields([]); // Limpiamos los campos vacíos
        setIsLoading(true); // Inicia el loader

        // Verificamos los campos vacíos
        const camposVacios = validarCamposVacios(formData, setShowAlert, setEmptyFields);

        // Validamos los errores de la contraseña y confirmación de contraseña
        const nuevosErrores = {
            passwordError: isValidPassword(formData.password),
            confirmPasswordError: isPasswordMatch(formData.password, formData.confirmPassword),
            emailError: formData.email ? "" : "El correo electrónico es obligatorio", // Añadido
            usernameError: formData.username ? "" : "El nombre de usuario es obligatorio", // Añadido
        };

        setErrores(nuevosErrores);

        // Si hay campos vacíos o errores de validación, detenemos el formulario
        if (camposVacios.length > 0 || nuevosErrores.passwordError || nuevosErrores.confirmPasswordError || nuevosErrores.emailError || nuevosErrores.usernameError) {
            setIsLoading(false); // Detener el loader
            setMensaje("Por favor, corrige los errores antes de enviar el formulario.");
            return;
        }

        try {
            // Registro del usuario
            const response = await axios.post(`${WEBSERVICE_IP}/users/register`, formData);

            if (response.status === 201) {
                setMensaje("Registro exitoso, por favor configura tu autenticación de dos factores.");
                setQrUrl(response.data.mfa_secret); // Asignamos la URL del secreto para 2FA
                setStep("mfa"); // Cambiar al paso de verificación de 2FA
            } else {
                setIsLoading(false);
                setMensaje(response.data.error || "Error al registrar usuario.");
            }
        } catch (error) {
            setIsLoading(false);
            setMensaje("Error de conexión. Inténtalo de nuevo más tarde.");
        }
    };


    const handleOtpVerification = async (e) => {
        e.preventDefault();
        setMensaje("");
    
        if (!formData.email || !formData.otp) {
            setMensaje("Debe ingresar el código OTP.");
            return;
        }
    
        console.log("Datos enviados a verify-otp:", { email: formData.email, token: formData.otp });
    
        try {
            const res = await axios.post(
                `${WEBSERVICE_IP}/users/verify-otp`,
                { email: formData.email, token: formData.otp },
                { headers: { "Content-Type": "application/json" } }
            );
    
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                setMensaje("Autenticación de dos factores exitosa, redirigiendo...");
                setTimeout(() => {
                    // Redirige al login después de 2 segundos
                    navigate("/login");
                }, 2000); // 2 segundos de espera antes de redirigir
            } else {
                setMensaje("Código OTP incorrecto.");
            }
        } catch (error) {
            setMensaje("Error al verificar OTP.");
            console.error(error);
        }
    };      
      
    return (
        <div className="registro-container">
            <div className="registro-header">
                <ArrowBackIcon className="back-arrow" onClick={handleBackClick} />
            </div>
            <Box className="registro-box">
                <div className="intro-text">
                    <h1>¡Empezar!</h1>
                    <h3 className="subtitulo-letrero">Regístrate para continuar</h3>
                </div>

                {step === "register" && (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center" columns={12}>
                            <Grid size={{ xs: 12, md: 10, lg: 6 }} >
                                <TextField
                                    label="Nombre de usuario"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    fullWidth
                                    error={emptyFields.includes("username") || !!errores.usernameError}
                                    helperText={emptyFields.includes("username") ? "Campo obligatorio" : errores.usernameError}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 10, lg: 6 }} >
                                <TextField
                                    label="Correo Electrónico"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    error={emptyFields.includes("email") || !!errores.emailError}
                                    helperText={emptyFields.includes("email") ? "Campo obligatorio" : errores.emailError}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 10, lg: 6 }} >
                                <PasswordField
                                    label="Contraseña"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errores.passwordError}
                                    helperText={errores.passwordError || (emptyFields.includes("password") ? "Campo obligatorio" : "")}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 10, lg: 6 }} >
                                <PasswordField
                                    label="Confirmar Contraseña"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!!errores.confirmPasswordError}
                                    helperText={errores.confirmPasswordError || (emptyFields.includes("confirmPassword") ? "Campo obligatorio" : "")}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }} >
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={24} /> : "Registrarse"}
                                </Button>
                            </Grid>
                        </Grid>
                        {mensaje && <p className="mensaje">{mensaje}</p>}
                    </form>
                )}

                {step === "mfa" && qrUrl && (
                    <div className="mfa-setup">
                        <h3>Configura la autenticación de dos factores</h3>
                        <QRCodeSVG value={qrUrl} />
                        <p>Escanea este código QR en tu aplicación de autenticación (Google Authenticator, etc.)</p>
                        <form onSubmit={handleOtpVerification}>
                            <TextField
                                label="Código OTP"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Verificar OTP
                            </Button>
                        </form>
                    </div>
                )}


                <div>
                    <h5 className="subtitulo-letrero">
                        ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
                    </h5>
                </div>
            </Box>
        </div>
    );
};

export default Registro;
