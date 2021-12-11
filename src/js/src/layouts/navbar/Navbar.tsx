import React from "react";
import { AppBar, Toolbar, Box, Button, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AuthContext } from "components/auth/Auth";
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

export const ToolbarButtonInfos: { id: string; link: string; tx: string; icon: string }[] = [
  { id: "navHomeBtn", link: "/", tx: "ホーム", icon: "home" },
  { id: "navSkillBtn", link: "/_/skill", tx: "技術スタック", icon: "skill" },
  { id: "navImplBtn", link: "/_/impl", tx: "作ってみた機能", icon: "impl" }
];

export default function Fun() {
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);
  const [isSidebarOn, setIsSidebarOn] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    for (const info of ToolbarButtonInfos) {
      document.querySelector(`#${info.id}`)?.classList.remove("navBtnEffect");
    }

    if (location.pathname === "/") {
      for (const info of ToolbarButtonInfos) {
        if (info.link === "/") {
          document.querySelector(`#${info.id}`)?.classList.add("navBtnEffect");
        }
      }
    } else if (/^\/_\/.+/.test(location.pathname)) {
      for (const info of ToolbarButtonInfos) {
        if (info.link !== "/" && new RegExp(`^${info.link}.*`).test(location.pathname)) {
          document.querySelector(`#${info.id}`)?.classList.add("navBtnEffect");
        }
      }
    }
  }, [location]);

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
        <Toolbar id="navbar-toolbar" sx={{ width: 1, maxWidth: theme.layout.maxNavbarWidthPx }}>
          <RouterLink to="/">
            <Box
              component="img"
              sx={{ maxHeight: { xs: 28, md: 44 }, mx: 2 }}
              src="/static/navbar/logo-han.jpg"
              alt="logo"
            />
          </RouterLink>
          {ToolbarButtonInfos.map((info) => {
            return (
              <RouterLink to={info.link} key={info.tx}>
                <ToolbarButton id={info.id} variant="text">
                  {info.tx}
                </ToolbarButton>
              </RouterLink>
            );
          })}
          <Box sx={{ flexGrow: 1 }}></Box>
          {currentUser ? (
            <Button
              variant="contained"
              color="inherit"
              sx={{ background: theme.navbar.buttonColor, display: { xs: "none", md: "flex" } }}
              onClick={() => onClickLogout()}
            >
              ログアウト
            </Button>
          ) : (
            <RouterLink to="/auth/signIn">
              <Button
                variant="contained"
                color="inherit"
                sx={{ background: theme.navbar.buttonColor, display: { xs: "none", md: "flex" } }}
              >
                ログイン
              </Button>
            </RouterLink>
          )}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 1 }}
            onClick={() => setIsSidebarOn(true)}
          >
            {currentUser ? (
              <Avatar sx={{ background: "purple" }}>{currentUser.username.replace(/^(.{2}).*/, "$1")}</Avatar>
            ) : (
              <MenuIcon sx={{ fontSize: 36 }} />
            )}
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

  button.navBtnEffect {
    &:before {
      content: "";
      position: absolute;
      display: block;
      z-index: -1;
      width: 100%;
      height: 100%;

      background: #bfcadc;
      border-radius: 60% 25% 90% 24%;
      transform: rotate(6deg);
      opacity: 0.5;

      animation: navbarButtonAnime 1s ease 0.2s infinite alternate;
      @keyframes navbarButtonAnime {
        to {
          opacity: 0.8;
        }
      }
    }
  }
`;
