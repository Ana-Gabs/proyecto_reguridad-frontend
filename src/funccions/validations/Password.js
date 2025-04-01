import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export function isValidPassword(password) {
    let passwordError = '';

    if (password === '') {
        passwordError = 'La contraseña no puede estar vacía';
    }
    if (!password.match(/[A-Z]/)) {
        passwordError = 'Debe haber al menos una letra mayúscula';
    }
    else if (!password.match(/\d/)) {
        passwordError = 'Debe haber al menos un número';
    }
    else if (/(ab|bc|cd|de|ef|fg|gh|hi|ij|jk|kl|lm|mn|no|op|pq|qr|rs|st|tu|uv|vw|wx|xy|yz|zy|yx|xw|wv|vu|ut|ts|sr|rq|qp|po|on|nm|ml|lk|kj|ji|ih|hg|gf|fe|ed|dc|cb|ba|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqp|qpo|pon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba|AB|BC|CD|DE|EF|FG|GH|HI|IJ|JK|KL|LM|MN|NO|OP|PQ|QR|RS|ST|TU|UV|VW|WX|XY|YZ|ZY|YX|XW|WV|VU|UT|TS|SR|RQ|QP|PO|ON|NM|ML|LK|KJ|JI|IH|HG|GF|FE|ED|DC|CB|BA|ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ|ZYX|YXW|XWV|WVU|VUT|UTS|TSR|SRQ|RQP|QPO|PON|ONM|NML|MLK|LKJ|KJI|JIH|IHG|HGF|GFE|FED|EDC|DCB|CBA)/.test(password)) {
        passwordError = 'No se permiten secuencias consecutivas de letras';
    }
    else if (/(012|123|234|345|456|567|678|789|89|98|67|76|45|54|23|32|01|10|987|876|765|654|543|432|321|210)/.test(password)) {
        passwordError = 'No se permiten números consecutivos';
    }
    else if (!password.match(/[!@#$%^&*(),.?":{}|<>[\]+]/)) {
        passwordError = 'Debe contener al menos un carácter especial';
    }
    else if (password.length < 8) {
        passwordError = 'La contraseña debe tener al menos 8 caracteres';
    }

    return passwordError || null; 
}

export function isPasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden';
    }
    return null;
}

export function PasswordField({ label, name, value, onChange, error, helperText }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <TextField
                type={showPassword ? 'text' : 'password'}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                fullWidth
                error={error}
                helperText={helperText}
            />
            <IconButton
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </Box>
    );
}