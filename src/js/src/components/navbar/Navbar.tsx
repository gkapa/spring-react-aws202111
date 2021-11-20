import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import { globalConsts } from "styles/globalConsts";
import { Link } from "react-router-dom";

export default function fun() {
  return (
    <Box>
      <AppBar id="navbar-appbar" sx={{ backgroundColor: "#FCFAD4", alignItems: "center", color: "black" }}>
        <Toolbar id="navbar-toolbar" sx={{ width: 1, maxWidth: globalConsts.maxNavbarWidth }}>
          <Link to="/">
            <Box component="img" sx={{ maxHeight: { xs: 28, md: 44 }, mx: 2 }} src="/navbar/logo-han.jpg" alt="logo" />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button variant="contained" color="inherit" sx={{ background: "gray" }}>
            ログイン
          </Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
