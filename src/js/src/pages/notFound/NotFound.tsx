import React from "react";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet-async";
import { app } from "styles/globalConsts";

export default function Fun() {
  return (
    <>
      <Helmet>
        <title>存在しないページです{app.title}</title>
      </Helmet>
      <Box>
        <h1>Page Not Found</h1>
      </Box>
    </>
  );
}
