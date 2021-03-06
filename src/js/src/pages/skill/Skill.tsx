import React from "react";
import { Box, Stack, Link } from "@mui/material";
import TitleBox from "blocks/TitleBox";
import SkillIntroBox from "blocks/SkillIntroBox";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { app } from "styles/globalConsts";

export default function Fun() {
  return (
    <>
      <Helmet>
        <title>技術スタック{app.title}</title>
      </Helmet>
      <Box sx={{ my: 4, mx: 2 }}>
        <TitleBox title="技術スタック">本サイト作成、または実務で使用したスキルリストです。</TitleBox>
        <Stack spacing={4}>
          <SkillIntroBox title="React" td="left">
            <Box>
              Typesciprt CRAを元に、このページを作成しています。
              <br />
              大本のコードの作成方法は、
              <Link href="https://www.udemy.com/course/fullstack-development-springboot/" target="_blank">
                udemy講義
              </Link>
              、
              <Link href="https://github.com/gkapa/nextjspp" target="_blank">
                過去に弄ってみたページ
              </Link>
              を参考に作成しました。
              <br />
              <br />
              言語: Tyepscript (es6)
              <br />
              フレームワーク: vscode
              <br />
              CSSライブラリ: mui (material-ui)
              <br />
              CSSスタイル: styled-components (CSS in JS)
              <br />
              状態管理: useContext
              <Link href="https://qiita.com/akifumiyoshimu/items/88fb13959a2184174473" target="_blank">
                (参考したページ(1))
              </Link>
              <Link href="https://qiita.com/mtitg/items/3f1b6e61cee2f01f04a8" target="_blank">
                (2)
              </Link>
              <br />
              フォーム作成: yep
              <Link href="https://dev.classmethod.jp/articles/mui-v5-rhf-v7/" target="_blank">
                (参考したページ)
              </Link>
              <br />
              その他使用経験スキル: redux, jquery, bootstrap
            </Box>
            <IconBox></IconBox>
          </SkillIntroBox>
          <SkillIntroBox title="Java Spring" td="right">
            <Box>
              バックエンドはJava Springで作成しています。
              <br />
              <br />
              フレームワーク: IntelliJ IDEA CE, Eclipse
              <br />
              Java バージョン: 11 <br />
              DBアクセス: JPA <br />
              ログイン管理: Spring Security + JWT{" "}
              <Link href="https://returnbliss.tistory.com/15" target="_blank">
                (参考したページ(1))
              </Link>
              <Link href="https://soon-devblog.tistory.com/9" target="_blank">
                (2)
              </Link>
              <Link href="https://myunji.tistory.com/466" target="_blank">
                (3)
              </Link>
              <br />
              その他使用経験スキル: thymeleaf, doma
            </Box>
            <IconBox></IconBox>
          </SkillIntroBox>
          <SkillIntroBox title="AWS" td="left">
            <Box>
              サーバーはAWSで構築しています。
              <br />
              <br />
              配布: Elastic Beanstalk
              <Link href="https://www.udemy.com/course/fullstack-development-springboot/" target="_blank">
                (参考講義)
              </Link>
              <br />
              DB管理: RDS
              <Link href="https://www.udemy.com/course/fullstack-development-springboot/" target="_blank">
                (参考講義)
              </Link>
              <br />
              メール転送(Spring連動): SES
              <Link href="https://www.youtube.com/watch?v=IsGLDE7i6tg" target="_blank">
                (参考したページ(1))
              </Link>
              <Link
                href="https://www.tutorialsbuddy.com/send-email-using-amazon-ses-in-java-spring-boot-example"
                target="_blank"
              >
                (2)
              </Link>
              <br />
            </Box>
            <IconBox></IconBox>
          </SkillIntroBox>
          <SkillIntroBox title="RDBMS" td="right">
            <Box>
              DBはpostgresで作成しました。 <br />
              <br />
              本番: AWS RDS
              <br />
              ローカル: dockerコンテナ
              <br />
              DB管理ツール: DBeaver CE
              <br />
              その他使用経験DB: Mysql、MariaDB、MS SQL Server、Oracle
              <br />
              その他使用経験DB管理ツール: Mysql Workbench、SSMS、A5M2
            </Box>
            <IconBox></IconBox>
          </SkillIntroBox>
          <SkillIntroBox title="その他" td="left">
            <Box>
              開発環境: Windows
              <br />
              使用経験言語：JavaScript, TypeScript, Java, C++, Python, バッチスクリプト, その他スクリプト言語
              <br />
              プロジェクト管理: Git, Bitbucket
              <br />
              社内業務管理ツール: Slack, Backlog, Docbase
            </Box>
            <IconBox></IconBox>
          </SkillIntroBox>
        </Stack>
      </Box>
    </>
  );
}

const IconBox = styled(Box)``;
