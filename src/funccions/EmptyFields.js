export function validarCamposVacios(formData, setShowAlert, setEmptyFields) {
    // Verificar qué campos del formulario están vacíos
    const camposVacios = Object.entries(formData).filter(([key, value]) => value === '').map(([key]) => key);

    if (camposVacios.length > 0) {
        // Mostrar el alerta
        setShowAlert(true);
        // Establecer los campos vacíos en el estado
        setEmptyFields(camposVacios);
        // Ocultar el alerta después de 5 segundos
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    } else {
        // Limpiar los campos vacíos si todos están llenos
        setEmptyFields([]);
    }

    return camposVacios.length > 0;
}