import React from "react";
import Box from "@mui/material/Box";
import EmailVerificationCompleteCard from "components/card/EmailVerificationCompleteCard";
import Spinner from "atoms/Spinner";
import { getRegistResult } from "api/authApi";
import { Helmet } from "react-helmet-async";
import { app } from "styles/globalConsts";

export default function Fun() {
  const [isFetched, setIsFetched] = React.useState(false);

  const initData = React.useCallback(async () => {
    try {
      await getRegistResult();
      setIsFetched(true);
    } catch (error) {
      window.open("/NotFound", "_self");
    }
  }, []);

  React.useEffect(() => {
    initData();
  }, [initData]);

  return (
    <>
      <Helmet>
        <title>会員登録{app.title}</title>
      </Helmet>
      <Box>{isFetched ? <EmailVerificationCompleteCard></EmailVerificationCompleteCard> : <Spinner></Spinner>}</Box>
    </>
  );
}
