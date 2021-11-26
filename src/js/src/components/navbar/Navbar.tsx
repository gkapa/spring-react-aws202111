import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as gb from "styles/globalConsts";
import { Link } from "react-router-dom";
import { AuthContext } from "components/auth/Auth";
import * as cookies from "utils/cookies";
import { submitSignOut } from "api/authApi";

export default function Fun() {
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log(`current: ` + currentUser?.email);
    console.log(cookies.getCookie("accessToken"));
  }, [currentUser]);

  const onClickLogout = React.useCallback(async () => {
    try {
      await submitSignOut();
      setCurrentUser(undefined);
      window.open("/", "_self");
    } catch (error) {
      console.log("ログアウト　失敗");
    }
  }, [currentUser]);

  return (
    <Box>
      <AppBar
        id="navbar-appbar"
        sx={{ position: "relative", backgroundColor: "#FCFAD4", alignItems: "center", color: "black" }}
      >
        <Toolbar id="navbar-toolbar" sx={{ width: 1, maxWidth: gb.theme.maxNavbarWidth }}>
          <Link to="/">
            <Box component="img" sx={{ maxHeight: { xs: 28, md: 44 }, mx: 2 }} src="/navbar/logo-han.jpg" alt="logo" />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {currentUser ? (
            <Button variant="contained" color="inherit" sx={{ background: "#ffe082" }} onClick={() => onClickLogout()}>
              ログアウト
            </Button>
          ) : (
            <Link to="/auth/signIn">
              <Button variant="contained" color="inherit" sx={{ background: "#ffe082" }}>
                ログイン
              </Button>
            </Link>
          )}
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
