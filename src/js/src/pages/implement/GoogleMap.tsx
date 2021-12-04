import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import ImplGoogleMap from "components/googleMap/ImplGoogleMapWrapper";
import SkillIntroBox from "blocks/SkillIntroBox";

import { styled } from "@mui/material/styles";

interface IGoogleMapContext {
  isOriginOn: boolean;
  setIsOriginOn: any;
  isDestOn: boolean;
  setIsDestOn: any;
  markerDistance: string | undefined;
  setMarkerDistance: any;
}

export const GoogleMapContext = React.createContext<IGoogleMapContext>({
  isOriginOn: false,
  setIsOriginOn: () => {},
  isDestOn: true,
  setIsDestOn: () => {},
  markerDistance: undefined,
  setMarkerDistance: () => {}
});

export default function Fun() {
  const [isOriginOn, setIsOriginOn] = React.useState(true);
  const [isDestOn, setIsDestOn] = React.useState(false);
  const [markerDistance, setMarkerDistance] = React.useState<string | undefined>(undefined);

  const onClickToggleOrigin = React.useCallback(() => {
    if (isOriginOn) return;
    setIsOriginOn(true);
    setIsDestOn(false);
  }, [isOriginOn]);

  const onClickToggleDest = React.useCallback(() => {
    if (isDestOn) return;
    setIsOriginOn(false);
    setIsDestOn(true);
  }, [isDestOn]);

  return (
    <GoogleMapContext.Provider
      value={{ isOriginOn, setIsOriginOn, isDestOn, setIsDestOn, markerDistance, setMarkerDistance }}
    >
      <WrapperBox>
        <SkillIntroBox title="Google Maps Api" td="left">
          マップで二つの点を設定すると、距離を表示するよう機能です。
        </SkillIntroBox>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4} sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <Button
                  className="markerToggleBox"
                  size="large"
                  onClick={() => onClickToggleOrigin()}
                  variant={isOriginOn ? "contained" : "outlined"}
                >
                  出発点設定
                </Button>
              </Grid>
              <Grid item xs={6} md={12}>
                <Button
                  className="markerToggleBox"
                  size="large"
                  onClick={() => onClickToggleDest()}
                  variant={isDestOn ? "contained" : "outlined"}
                >
                  到着点設定
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={{ textAlign: "center", color: "red" }}>
                  {markerDistance && <Typography variant="h2">{markerDistance}km</Typography>}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <ImplGoogleMap />
          </Grid>
        </Grid>
      </WrapperBox>
    </GoogleMapContext.Provider>
  );
}

const WrapperBox = styled(Box)`
  .markerToggleBox {
    width: 100%;

    font-family: "Lato";
    font-weight: 700;
    font-size: 1.2em;
  }
`;
