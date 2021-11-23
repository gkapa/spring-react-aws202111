import React from "react";
import { Box } from "@mui/material";

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

  return <AuthContext.Provider value={{ currentUser }}>{props.children}</AuthContext.Provider>;
}
