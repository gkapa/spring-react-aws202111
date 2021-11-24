import React from "react";
import * as cookies from "utils/cookies";
import jwt_decode from "jwt-decode";

interface ICurrentUser {
  email: "";
  username: "";
}

interface IAuthContext {
  currentUser: ICurrentUser | null | undefined;
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: undefined
});

export default function Fun(props: any) {
  const [currentUser, setCurrentUser] = React.useState<ICurrentUser | null | undefined>(undefined);

  React.useEffect(() => {
    initUser();
  }, []);

  const initUser = React.useCallback(async () => {
    try {
      const isValid = await cookies.isAccessTokenValid();
    } catch (error) {}
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{props.children}</AuthContext.Provider>;
}
