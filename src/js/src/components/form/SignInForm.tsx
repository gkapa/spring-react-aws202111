import React from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInForm, submitSignInForm } from "api/authApi";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required("必須項目です").email("有効なメールアドレスを入力してください"),
  password: yup.string().required("必須項目です").min(1, "正しいパスワードを入力してください")
});

export default function Fun() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ISignInForm> = React.useCallback(async (data) => {
    try {
      await submitSignInForm(data);
      window.open("/", "_self");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <form onSubmit={() => handleSubmit(onSubmit)}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <hr style={{ background: "#1976D2", flexGrow: 1 }}></hr>

            <Typography sx={{ mx: 2 }}>
              <ArrowCircleDownIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              はじめてのご利用の方
            </Typography>
            <hr style={{ background: "#1976D2", flexGrow: 1 }}></hr>
          </Box>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="large"
            onClick={() => navigate("/auth/signUp")}
            sx={{ background: "#DF5D4F" }}
          >
            新規登録
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
