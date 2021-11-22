import React from "react";
import { Box, FormControl, Stack, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ISignInForm {
  email: string;
  name: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("必須項目です").email("有効なメールアドレスを入力してください"),
  password: yup.string().required("必須項目です").min(1, "正しいパスワードを入力してください")
});

export default function Fun() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInForm>({
    resolver: yupResolver(schema)
  });

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
