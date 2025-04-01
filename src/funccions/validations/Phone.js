// Función para validar números de teléfono
export function isValidPhoneNumber(phoneNumber) {
    const phoneNumberPattern = /^[0-9]{10}$/; 
    return phoneNumberPattern.test(phoneNumber) ? null : 'El número de teléfono debe tener 10 dígitos';
}
