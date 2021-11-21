import React from "react";
import { Box, FormControl, Stack, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

interface ISignInForm {
  email: string;
  name: string;
  password: string;
}

export default function Fun() {
  return (
    <Box id="signInForm" sx={{ my: 3 }}>
      <FormControl sx={{ display: "flex", width: "80%", mx: "auto" }}>
        <Stack spacing={3}>
          <TextField required label="メールアドレス" type="email" />
          <TextField required label="お名前" />
          <TextField required label="パスワード" type="password" />
          <Button color="primary" variant="contained" size="large">
            作成
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
