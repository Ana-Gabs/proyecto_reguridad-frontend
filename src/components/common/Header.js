import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EventIcon from "@mui/icons-material/Event";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import GdayH16x9 from "../../assets/images/g_day-h-16x9.png";
import "../../styles/Header.css";
import "../../styles/variables.css";

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload
    return payload;
  } catch (error) {
    return null; // Token inválido
  }
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || (decoded.exp * 1000) < Date.now()) {
        setOpenSnackbar(true);
        localStorage.removeItem("token");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={GdayH16x9} alt="Logo_Gday" style={{ maxHeight: "60px", marginRight: "15px" }} />
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
            <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/register" startIcon={<EventIcon />}>
              REGISTRO
            </Button>
            <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/login" startIcon={<EventIcon />}>
              ACCESO
            </Button>
            <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/calendar" startIcon={<EventIcon />}>
              CALENDARIO
            </Button>
            <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/activities" startIcon={<ListAltIcon />}>
              ACTIVIDADES
            </Button>
            <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/notifications" startIcon={<NotificationsNoneIcon />}>
              NOTIFICACIONES
            </Button>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { xs: "inline", md: "none" },
              color: "var(--primary-color)",
              alignSelf: "center",
              height: "100%",
            }}
            onClick={toggleMenu}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {menuOpen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "flex-start",
            bgcolor: "white",
            padding: "10px",
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 1300,
          }}
        >
          <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/register" startIcon={<EventIcon />}>
            REGISTRO
          </Button>
          <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/login" startIcon={<EventIcon />}>
            ACCESO
          </Button>
          <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/calendar" startIcon={<EventIcon />}>
            CALENDARIO
          </Button>
          <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/activities" startIcon={<ListAltIcon />}>
            ACTIVIDADES
          </Button>
          <Button sx={{ color: "var(--primary-color)" }} component={Link} to="/notifications" startIcon={<NotificationsNoneIcon />}>
            NOTIFICACIONES
          </Button>
        </Box>
      )}

      {/* Snackbar para notificar que la sesión ha expirado */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
          Tu sesión ha expirado, serás redirigido al Login.
        </Alert>
      </Snackbar>
    </Box>
  );
}
