import React from "react";
import { Card, CardActions, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface IProps {
  title: string;
  image: string;
  linkTo: string;
  children: React.ReactNode;
}

export default function Fun(props: IProps) {
  const navigate = useNavigate();

  return (
    <StyledCard>
      <CardMedia component="img" height="140" image={props.image} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.children}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(props.linkTo)}
          sx={{ background: "rgba(0,0,0,0.1);", fontFamily: "Noto Sans JP", fontWeight: 700 }}
        >
          <PlayArrowIcon />
        </Button>
      </CardActions>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 36px rgba(40, 30, 40, 0.4);
`;
