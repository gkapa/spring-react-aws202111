import React from "react";
import SignUpForm from "components/form/SignUpForm";
import { Stack, Box, Typography } from "@mui/material";
import SignUpCompletedCard from "components/card/SignUpCompleteCard";

interface ISignUpContext {
  isSignUpCompleted: boolean;
  setIsSignUpCompleted: any;
}

export const SignUpContext = React.createContext<ISignUpContext>({
  isSignUpCompleted: false,
  setIsSignUpCompleted: () => {}
});

export default function Fun() {
  const [isSignUpCompleted, setIsSignUpCompleted] = React.useState(false);

  React.useEffect(() => {
    console.log({
      isSignUpCompleted: isSignUpCompleted
    });
  }, [isSignUpCompleted]);

  return (
    <SignUpContext.Provider value={{ isSignUpCompleted, setIsSignUpCompleted }}>
      <Box>
        {isSignUpCompleted ? (
          <SignUpCompletedCard></SignUpCompletedCard>
        ) : (
          <Stack spacing={3}>
            <Typography variant="h4" component="div" color="primary" sx={{ ml: 12 }}>
              新規会員登録
            </Typography>
            <hr style={{ background: "#1976D2", marginBottom: "36px" }}></hr>
            <SignUpForm></SignUpForm>
          </Stack>
        )}
      </Box>
    </SignUpContext.Provider>
  );
}
