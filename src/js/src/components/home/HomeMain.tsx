import React from "react";
import { Box } from "@mui/material";
import HomeChild from "components/home/HomeChild";

import { testApi } from "api/authApi";
import { isFunctionDeclaration } from "typescript";

export const HomeContext = React.createContext(7);

export default function Fun() {
  const [foo, setFoo] = React.useState(7);

  React.useEffect(() => {
    console.log("cookie:");
    console.log(document.cookie);
    test();
  }, []);

  const test = React.useCallback(async () => {
    try {
      testApi();
    } catch (error) {}
  }, []);

  return (
    <Box>
      <h1>Hello, Wolrd!</h1>
      <HomeContext.Provider value={foo}>
        <HomeChild></HomeChild>
      </HomeContext.Provider>
    </Box>
  );
}
