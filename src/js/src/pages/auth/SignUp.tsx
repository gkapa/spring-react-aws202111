import React from "react";
import SignUpForm from "components/form/SignUpForm";
import { Stack, Box, Typography } from "@mui/material";

export default function Fun() {
  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h4" component="div" color="primary" sx={{ ml: 12 }}>
          新規会員登録
        </Typography>
        <hr style={{ background: "#1976D2", marginBottom: "36px" }}></hr>
        <SignUpForm></SignUpForm>
      </Stack>
    </Box>
  );
}
