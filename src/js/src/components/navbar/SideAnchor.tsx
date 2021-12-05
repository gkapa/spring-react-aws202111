import React from "react";
import { Drawer, Box, Button, ListItemText, ListItem, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "styles/globalConsts";
import { AuthContext } from "components/auth/Auth";
import { SidebarContext } from "./Navbar";
import { Link as RouterLink } from "react-router-dom";
import { ToolbarButtonInfos } from "./Navbar";
import { submitSignOut } from "api/authApi";
import HomeIcon from "@mui/icons-material/Home";
import HardwareIcon from "@mui/icons-material/Hardware";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export default function Fun() {
  const { isSidebarOn, setIsSidebarOn } = React.useContext(SidebarContext);
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  const onClickLogout = React.useCallback(async () => {
    try {
      await submitSignOut();
      setCurrentUser(undefined);
      window.open("/", "_self");
    } catch (error) {
      console.log("ログアウト　失敗");
    }
  }, [setCurrentUser]);

  const renderIcon = React.useCallback((icon) => {
    switch (icon) {
      case "home":
        return <HomeIcon />;
      case "skill":
        return <HardwareIcon />;
      case "impl":
        return <GroupWorkIcon />;
      default:
        return "x";
    }
  }, []);

  return (
    <Drawer
      anchor={"right"}
      open={isSidebarOn}
      // open={true}
      onClose={() => {
        setIsSidebarOn(false);
      }}
    >
      <WrapperBox>
        <InnerWrapper>
          {ToolbarButtonInfos.map((info) => {
            return (
              <RouterLink
                to={info.link}
                key={info.tx}
                onClick={() => {
                  setIsSidebarOn(false);
                }}
              >
                <ListItem button>
                  <ListItemIcon>{renderIcon(info.icon)}</ListItemIcon>
                  <ListItemText>{info.tx}</ListItemText>
                </ListItem>
              </RouterLink>
            );
          })}
          <hr style={{ width: "100%" }} />
        </InnerWrapper>
        <InnerWrapper>
          {currentUser ? (
            <ListItem button onClick={() => onClickLogout()}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText>ログアウト</ListItemText>
            </ListItem>
          ) : (
            <RouterLink
              to="/auth/signIn"
              onClick={() => {
                setIsSidebarOn(false);
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText>ログイン</ListItemText>
              </ListItem>
            </RouterLink>
          )}
        </InnerWrapper>
      </WrapperBox>
    </Drawer>
  );
}

const WrapperBox = styled(Box)`
  height: 100vh;
  padding: 40px 10px;
  background: ${theme.navbar.bgColor};
  display: flex;
  flex-flow: column nowrap;

  * {
    font-family: "Noto Sans JP", "Lato" !important;
    font-weight: 700 !important;
  }
`;

const InnerWrapper = styled(Box)`
  display: flex;
  flex-flow: column nowrap;

  color: black;
`;
