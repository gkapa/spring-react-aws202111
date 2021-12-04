import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { GoogleMapContext } from "pages/implement/GoogleMap";
// import { styled } from "@mui/material/styles";

export interface IPosition {
  lat: number;
  lng: number;
}

const mapDefaults = {
  center: {
    lat: 35.69575,
    lng: 139.77521
  },
  zoom: 14
};

export default function Fun() {
  const [originPos, setOriginPos] = React.useState<IPosition>();
  const [destPos, setDestPos] = React.useState<IPosition>();
  const { isOriginOn, isDestOn } = React.useContext(GoogleMapContext);
  const { setMarkerDistance } = React.useContext(GoogleMapContext);

  const onClickMap = React.useCallback(
    (e) => {
      const loc: IPosition = e.latLng.toJSON();

      if (isOriginOn) {
        setOriginPos({ ...loc });
      } else if (isDestOn) {
        setDestPos({ ...loc });
      } else {
        console.error("flag error");
      }
    },
    [isOriginOn, isDestOn]
  );

  React.useMemo(() => {
    if (originPos && destPos) {
      const p1 = new google.maps.LatLng({ ...originPos });
      const p2 = new google.maps.LatLng({ ...destPos });
      const distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
      setMarkerDistance(distance);
    }
  }, [originPos, destPos, setMarkerDistance]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "600px" }}
      center={mapDefaults.center}
      zoom={mapDefaults.zoom}
      onClick={(e) => onClickMap(e)}
    >
      {originPos && <Marker position={originPos} />}
      {destPos && <Marker position={destPos} />}
    </GoogleMap>
  );
}

// const StyledBox = styled(Box)``;
