import React from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import * as gb from "styles/globalConsts";
import { Link } from "react-router-dom";
import { AuthContext } from "components/auth/Auth";
// import * as cookies from "utils/cookies";
import { submitSignOut } from "api/authApi";
import { styled } from "@mui/material/styles";

export default function Fun() {
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    // console.log(`current: ` + currentUser?.email);
    // console.log(cookies.getCookie("accessToken"));
  }, []);

  const onClickLogout = React.useCallback(async () => {
    try {
      await submitSignOut();
      setCurrentUser(undefined);
      window.open("/", "_self");
    } catch (error) {
      console.log("ログアウト　失敗");
    }
  }, [setCurrentUser]);

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
          <ToolbarButton
            variant="outlined"
            color="inherit"
            sx={{ border: "none" }}
            onClick={() => window.open("/", "_self")}
          >
            ホーム
          </ToolbarButton>
          <ToolbarButton
            variant="outlined"
            color="inherit"
            sx={{ border: "none" }}
            onClick={() => window.open("/", "_self")}
          >
            技術スタック
          </ToolbarButton>
          <ToolbarButton
            variant="outlined"
            color="inherit"
            sx={{ border: "none" }}
            onClick={() => window.open("/", "_self")}
          >
            作ってみた機能
          </ToolbarButton>
          <Box sx={{ flexGrow: 1 }}></Box>
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
            sx={{ mx: 1, display: { xs: "none", md: "flex" } }}
          >
            <MenuIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const ToolbarButton = styled(Button)`
  font-weight: 700;
`;
