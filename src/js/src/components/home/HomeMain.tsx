import React from "react";
import { Box } from "@mui/material";
import HomeChild from "components/home/HomeChild";

export const HomeContext = React.createContext(0);

export default function Fun() {
  const [foo, setFoo] = React.useState(7);

  React.useEffect(() => {
    console.log("cookie:");
    console.log(document.cookie);
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