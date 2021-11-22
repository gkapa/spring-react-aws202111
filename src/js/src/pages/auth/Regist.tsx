import React from "react";
import Box from "@mui/material/Box";
import RegistCard from "components/card/RegistCompleteCard";
import Spinner from "atoms/Spinner";

import { getRegistResult } from "api/authApi";

export default function Fun() {
  const [isFetched, setIsFetched] = React.useState(false);

  React.useEffect(() => {
    initData();
  }, []);

  const initData = React.useCallback(async () => {
    try {
      await getRegistResult();
      setIsFetched(true);
    } catch (error) {
      window.open("/NotFound", "_self");
    }
  }, []);

  return <Box>{isFetched ? <RegistCard></RegistCard> : <Spinner></Spinner>}</Box>;
}
