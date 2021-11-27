import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Fun() {
  return (
    <Box sx={{ mt: 16, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CheckCircleOutlineIcon sx={{ color: "green", transform: "scale(2.4)" }} />
        </Box>
        <Box>
          <Typography variant="h6" mt={2}>
            メールアドレスに認証メールを送信しました。
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
