import axios from "axios";

const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP || "http://localhost:3001";

// Función para registrar un usuario
export const registerUser = async (email, password) => {
    try {
        const response = await axios.post(`${WEBSERVICE_IP}/register`, { email, password });
        return response.data;  // Retorna los datos recibidos (por ejemplo, el secreto para MFA)
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al registrar usuario.");
    }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${WEBSERVICE_IP}/login`, { email, password });
        return response.data;  // Retorna la respuesta del backend (token o indicación de MFA)
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al iniciar sesión.");
    }
};

// Función para verificar el código OTP
export const verifyOTP = async (email, otp) => {
    try {
        const response = await axios.post(`${WEBSERVICE_IP}/verify-otp`, { email, token: otp });
        return response.data;  // Retorna el resultado de la verificación OTP
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al verificar el código OTP.");
    }
};
