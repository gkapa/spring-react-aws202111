import React from "react";
import { Box } from "@mui/material";

import { HomeContext } from "./HomeMain";

export default function Fun() {
  const tCtx = React.useContext(HomeContext);

  return (
    <Box>
      <h1>{tCtx}</h1>
    </Box>
  );
}
