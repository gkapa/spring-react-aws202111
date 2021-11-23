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
    const now = Date.now().valueOf() / 1000;
    const token = cookies.getAccessToken();
    const decodedToken: any = jwt_decode(token);
    if (decodedToken.exp < now) {
      console.log(`token is still valid`);
      console.log(now - decodedToken.exp);
    } else {
      console.log(`token is NOT valid`);
    }
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{props.children}</AuthContext.Provider>;
}
