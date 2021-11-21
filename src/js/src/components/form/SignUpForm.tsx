import React from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInForm } from "api/authApi";

const schema = yup.object({
  email: yup.string().required("必須項目です").email("有効なメールアドレスを入力してください"),
  name: yup.string().required("必須項目です"),
  password: yup.string().required("必須項目です").min(6, "パスワードは6文字以上を入力してください")
  // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/, "パスワード弱いよ")
});

export default function Fun() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log("xxxxxxx");
    console.log(data);
  };

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
          label="お名前"
          {...register("name")}
          error={"name" in errors}
          helperText={errors.name?.message}
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
          作成
        </Button>
      </Stack>
    </Box>
  );
}
