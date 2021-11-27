import React from "react";
import SignInForm from "components/form/SignInForm";
import { Stack, Box, Typography } from "@mui/material";

export default function Fun() {
  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h4" component="div" color="primary" sx={{ ml: 12 }}>
          ログイン
        </Typography>
        <hr style={{ background: "#1976D2", marginBottom: "36px" }}></hr>
        <SignInForm></SignInForm>
      </Stack>
    </Box>
  );
}
