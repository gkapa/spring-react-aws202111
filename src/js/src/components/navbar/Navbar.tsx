import React from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import * as gb from "styles/globalConsts";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "components/auth/Auth";
// import * as cookies from "utils/cookies";
import { submitSignOut } from "api/authApi";
import { styled } from "@mui/material/styles";
import SideAnchor from "./SideAnchor";
import { theme } from "styles/globalConsts";

interface ISidebarContext {
  isSidebarOn: boolean;
  setIsSidebarOn: any;
}

export const SidebarContext = React.createContext<ISidebarContext>({
  isSidebarOn: false,
  setIsSidebarOn: () => {}
});

const ToolbarButton = styled(Button)`
  font-weight: 700;
  color: inherit;
`;

export const ToolbarButtonInfos: { link: string; tx: string; icon: string }[] = [
  { link: "/", tx: "ホーム", icon: "home" },
  { link: "/_/skill", tx: "技術スタック", icon: "skill" },
  { link: "/_/impl", tx: "作ってみた機能", icon: "impl" }
];

export default function Fun() {
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);
  const [isSidebarOn, setIsSidebarOn] = React.useState(false);

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
    <StyledBox>
      <SidebarContext.Provider value={{ isSidebarOn, setIsSidebarOn }}>
        <SideAnchor />
      </SidebarContext.Provider>
      <AppBar
        id="navbar-appbar"
        sx={{ position: "relative", backgroundColor: theme.navbar.bgColor, alignItems: "center", color: "black" }}
      >
        <Toolbar id="navbar-toolbar" sx={{ width: 1, maxWidth: gb.theme.maxNavbarWidth }}>
          <RouterLink to="/">
            <Box component="img" sx={{ maxHeight: { xs: 28, md: 44 }, mx: 2 }} src="/static/navbar/logo-han.jpg" alt="logo" />
          </RouterLink>
          {ToolbarButtonInfos.map((info) => {
            return (
              <RouterLink to={info.link} key={info.tx}>
                <ToolbarButton variant="text">{info.tx}</ToolbarButton>
              </RouterLink>
            );
          })}
          <Box sx={{ flexGrow: 1 }}></Box>
          {currentUser ? (
            <Button
              variant="contained"
              color="inherit"
              sx={{ background: theme.navbar.buttonColor }}
              onClick={() => onClickLogout()}
            >
              ログアウト
            </Button>
          ) : (
            <RouterLink to="/auth/signIn">
              <Button variant="contained" color="inherit" sx={{ background: theme.navbar.buttonColor }}>
                ログイン
              </Button>
            </RouterLink>
          )}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 1, display: { xs: "none", md: "flex" } }}
            onClick={() => setIsSidebarOn(true)}
          >
            <MenuIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </StyledBox>
  );
}

const StyledBox = styled(Box)`
  * {
    font-family: "Noto Sans JP", "Lato" !important;
  }
`;
