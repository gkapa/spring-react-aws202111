import React from "react";
import { Box } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import ImplGoogleMapContent from "./ImplGoogleMapContent";

export default function Fun() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "default",
    libraries: ["geometry"]
  });

  React.useEffect(() => {}, []);

  return <Box>{isLoaded && <ImplGoogleMapContent />}</Box>;
}
