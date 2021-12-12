import React from "react";
import * as cookies from "utils/cookies";
import { useLocation } from "react-router";

export interface ICurrentUser {
  email: string;
  username: string;
}

interface IAuthContext {
  currentUser: ICurrentUser | null | undefined;
  setCurrentUser: any;
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: undefined,
  setCurrentUser: () => {}
});

export default function Fun(props: any) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState<ICurrentUser | null | undefined>(undefined);

  const initUser = React.useCallback(async () => {
    try {
      const decodedJwtToken = await cookies.getDecodedJwtTokenFromAccessToken();
      setCurrentUser({ ...decodedJwtToken });
    } catch (error) {
      setCurrentUser(undefined);
    }
  }, []);

  React.useEffect(() => {
    initUser();
  }, [location.pathname, initUser]);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{props.children}</AuthContext.Provider>;
}
