import React from "react";
import { Box } from "@mui/material";

export const HomeContext = React.createContext(7);

export default function Fun() {
  React.useEffect(() => {}, []);

  return (
    <Box>
      <h1>Hello, Wolrd!</h1>
    </Box>
  );
}
