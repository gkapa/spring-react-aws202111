import React from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUpForm, submitSignUpForm } from "api/authApi";
import { SignUpContext } from "pages/auth/SignUp";

const schema = yup.object({
  email: yup.string().required("必須項目です").email("有効なメールアドレスを入力してください"),
  username: yup.string().required("必須項目です").min(2, "お名前は2文字以上を入力してください"),
  password: yup.string().required("必須項目です").min(6, "パスワードは6文字以上を入力してください")
  // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/, "パスワード弱いよ")
});

export default function Fun() {
  const { setIsSignUpCompleted } = React.useContext(SignUpContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ISignUpForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ISignUpForm> = React.useCallback(
    async (data) => {
      if (Object.keys(errors).length > 0) return;
      try {
        await submitSignUpForm(data);
        setIsSignUpCompleted(true);
      } catch (error: any) {
        if (error.errorCode) {
          switch (error.errorCode) {
            case "U001":
              setError("email", { type: "manual", message: error.message });
              break;
            case "U002":
              setError("email", { type: "manual", message: error.message });
              break;
            default:
              console.error("unknown error code");
          }
        } else {
          (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
            if (!error[key]) return;
            setError(key, { type: "manual", message: error[key] });
          });
        }

        console.log(error);
      }
    },
    [errors, setError, setIsSignUpCompleted]
  );

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
            label="お名前"
            {...register("username")}
            error={"username" in errors}
            helperText={errors.username?.message}
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
            会員登録
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
