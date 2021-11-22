import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Fun() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CheckCircleOutlineIcon sx={{ color: "green", transform: "scale(2.4)" }} />
        </Box>
        <Box>
          <Typography mt={2}>メールアドレス認証が終わりました。</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
