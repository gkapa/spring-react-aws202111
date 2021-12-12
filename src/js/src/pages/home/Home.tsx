import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import SkillIntroBox from "blocks/SkillIntroBox";
import { Helmet } from "react-helmet-async";
import { app } from "styles/globalConsts";

export default function Fun() {
  React.useEffect(() => {
    const introHeight = document.querySelector<HTMLElement>("#homeIntroWrapperBox")!.offsetHeight;
    document.querySelector<HTMLElement>("#homeIntroBgBox")!.style.height = `${introHeight}px`;
  }, []);

  return (
    <>
      <Helmet>
        <title>ホーム{app.title}</title>
      </Helmet>
      <Box id="homeBox">
        <IntroCard id="introCard" sx={{ minHeight: { xs: "50vh", md: "70vh" } }}>
          <Box>
            <IntroTypo sx={{ textAlign: "left", ml: 4, fontSize: { xs: "3.4rem", md: "4.4rem" } }}>
              HAN SAHYEON
            </IntroTypo>
            <IntroTypo sx={{ textAlign: "right", ml: 4, fontSize: { xs: "3.4rem", md: "4.4rem" } }}>
              WEB DEVELOPER
            </IntroTypo>
          </Box>
        </IntroCard>
        <Box sx={{ mx: 2, py: 8 }} id="homeIntroWrapperBox">
          <HomeIntroBgBox id="homeIntroBgBox" sx={{}} />
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              ウェブ開発者のハンです。こちらのページでは、私の技術スタックを活用し、作成可能な物を紹介しております。
              また、このサイトは、以下の構成で作成されています。
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SkillIntroBox title="React" td="left">
                <p>フロントエンドは、Typescript + Reactで作成されています。</p>
              </SkillIntroBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <SkillIntroBox title="Spring" td="right">
                <p>バックエンド部分は、Java Springで作成しました。</p>
              </SkillIntroBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <SkillIntroBox title="AWS" td="left">
                <p>インフラは、AWSを使い配布しています。</p>
              </SkillIntroBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <SkillIntroBox title="Others" td="right">
                <p>
                  上記を含めたその他詳しい情報は、<Link href="/_/skill">こちら</Link>をご参照ください。
                </p>
              </SkillIntroBox>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

const textStrokeColor = "lightblue";

const IntroCard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: url(/static/background/coo-circle.png);
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
`;

const IntroTypo = styled(Typography)`
  color: rgba(76, 0, 0, 0.3);
  font-weight: 700;
  text-shadow: 1px 1px 0 ${textStrokeColor}, -1px 1px 0 ${textStrokeColor}, 1px -1px 0 ${textStrokeColor},
    -1px -1px 0 ${textStrokeColor}, 0px 1px 0 ${textStrokeColor}, 0px -1px 0 ${textStrokeColor},
    -1px 0px 0 ${textStrokeColor}, 1px 0px 0 ${textStrokeColor}, 2px 2px 0 ${textStrokeColor},
    -2px 2px 0 ${textStrokeColor}, 2px -2px 0 ${textStrokeColor}, -2px -2px 0 ${textStrokeColor},
    0px 2px 0 ${textStrokeColor}, 0px -2px 0 ${textStrokeColor}, -2px 0px 0 ${textStrokeColor},
    2px 0px 0 ${textStrokeColor}, 1px 2px 0 ${textStrokeColor}, -1px 2px 0 ${textStrokeColor},
    1px -2px 0 ${textStrokeColor}, -1px -2px 0 ${textStrokeColor}, 2px 1px 0 ${textStrokeColor},
    -2px 1px 0 ${textStrokeColor}, 2px -1px 0 ${textStrokeColor}, -2px -1px 0 ${textStrokeColor};
`;

const HomeIntroBgBox = styled(Box)`
  position: absolute;
  display: relative;
  z-index: -1;
  width: 100vw;
  max-width: 100%;
  left: 50%;
  height: 100px;
  transform: translate(-50%, -64px);
  background: black;
`;
