import React from "react";
import * as cookies from "utils/cookies";
import jwt_decode from "jwt-decode";

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
  setCurrentUser: null
});

export default function Fun(props: any) {
  const [currentUser, setCurrentUser] = React.useState<ICurrentUser | null | undefined>(undefined);

  React.useEffect(() => {
    initUser();
  }, []);

  const initUser = React.useCallback(async () => {
    try {
      const decodedJwtToken = await cookies.getDecodedJwtTokenFromAccessToken();
      setCurrentUser({ ...decodedJwtToken });
    } catch (error) {
      setCurrentUser(undefined);
    }
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{props.children}</AuthContext.Provider>;
}
