import React from "react";
import { Box, FormControl, Stack, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInForm, submitSignInForm } from "api/authApi";
import * as cookies from "utils/cookies";

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

  const onSubmit: SubmitHandler<ISignInForm> = React.useCallback(async (data) => {
    try {
      const payload = await submitSignInForm(data);
      cookies.setAccessToken(payload.accessToken);
      window.open("/", "_self");
    } catch (error) {}
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <Stack spacing={3} sx={{ width: "80%", mx: "auto" }}>
        <TextField
          required
          label="メールアドレス"
          type="email"
          {...register("email")}
          error={"email" in errors}
          helperText={errors.email?.message}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          {...register("password")}
          error={"password" in errors}
          helperText={errors.password?.message}
        />
        <Button type="submit" color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
          ログイン
        </Button>
      </Stack>
    </Box>
  );
}
