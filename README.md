
---

# 始めに 

このreadmeは、現在公開中のポートフォリオサイトの構成についてご紹介する文書です。  
実際の動作などは、履歴書に記入しているURLのサイトをご参照して頂ければ幸いです。

---

# 目次

- [フロントエンド (React)](#フロントエンド-react)
- [バックエンド (Spring)](#バックエンド-spring)
- [インフラ (AWS)](#インフラ-aws)
- [備忘録](#備忘録)

---

# フロントエンド (React)
* ディレクトリ構成
```
project/src/main
└── src
   ├── api
   ├── atoms
   ├── blocks
   ├── components
   |  ├── auth
   |  ├── card
   |  ├── form
   |  └── googleMap
   ├── layouts
   |  ├── footer
   |  ├── main
   |  └── navbar
   ├── pages
   |  ├── auth
   |  ├── home
   |  ├── implement
   |  ├── notFound
   |  ├── skill
   |  └── template
   ├── styles
   └── utils
```

* フレームワーク、言語  
VScode + nodeJs(v14.18.0) + CRA + Typescript  
https://create-react-app.dev/docs/adding-typescript/  

* ライブラリ、状態管理  
CSSライブラリ: mui(旧material-ui) https://mui.com/getting-started/usage/  
CSSスタイル: styled-components (SCSS)  
状態管理: useContext  
フォーム作成: yup https://www.npmjs.com/package/yup https://dev.classmethod.jp/articles/mui-v5-rhf-v7/  
cookie管理: react-cookie  
アクセストークンdecode: jwt-decode  
ヘッダー修正: react-helmet-async  
google maps api: react-google-maps/api https://react-google-maps-api-docs.netlify.app/

---
# バックエンド (Spring)

* ディレクトリ構成
```
project/src/js
├── java
|  └── com
|     └── carma
|        └── hanppopen
|           ├── config
|           |  └── jwt
|           ├── controller
|           ├── domain
|           |  ├── exception
|           |  └── service
|           └── infra
|              ├── compositeKey
|              ├── dto
|              ├── entity
|              └── repository
└── resources
   ├── static
   └── templates
```

* フレームワーク、言語  
IntelliJ IDEA (CE 2021.2.2), Java 11

---

# インフラ (AWS)

* 配布  
Elastic Beanstalk

* DB  
Postgres 12.8  
live: AWS RDS  
local: Docker  
DB接続ツール: DBeaver

---

# 備忘録
以下からは、環境構築及びREADME.md修正用の備忘録です。

- #### フォルダ構成修正方法
```
## tree-cli インストール & 確認
npm install -g tree-cli     
treee --version

## spring ディレクトリ構成
cd src/main
treee -l 4 -d --ignore '' -o outtree.txt
del outtree.txt

## react ディレクトリ構成
cd src/js
treee -l 4 -d --ignore "/node_modules, /build, /public" -o outtree.txt && explorer outtree.txt
del outtree.txt
```

- #### Spring 環境構築  
```
TBD
```

- #### React 環境構築
```
TBD
```

- #### build-配布方法
```
## 詳しいビルド設定は、pom.xmlを参考
mvn clean install -P prod
## /target/han-ppopen-0.0.1-SNAPSHOT.jar ファイルを AWS EB environmentに Upload and deploy
## エラー時は、EB => (Environment name) => Logs => Request Logs でログを確認すること
```

- #### AWS  
RDS 設定方法
```
TBD
```

Elastic Beanstalk 設定方法
```
Elastic Beanstalk => Getting started
=> Create a web app
=> Application name: () => (appname)
=> Application tags: (key, value) => (environment, demo), (appl.ication_name, environment)
=> Platform: Java, Application code: Sample application
=> Create application .... ColudFormation => Stacks => Stack details => Events から確認可能
=> XXXxxxxx-env.eba-xmxxz.ap-northeast-1.elasticbeanstalk.com のようなページが作成される
=> RDSの inbound　ルールに EBを追加 (しないと、SpringのComplieエラー)

*** EC2 ローカル変数設定
Environment => Configuration => Modify software => Environment properties
## 現在の設定を記載
GRADLE_HOME       /usr/local/gradle
M2                /usr/local/apache-maven/bin
M2_HOME           /usr/local/apache-maven

*** ドメイン追加後、ロードバランサー設定
Environment => Configuration => Modify Application Load Balancer => Listeners
## 現在の設定を記載
Port: 443
Protocol: HTTPS
SSL certificate: 発行された認証書洗濯

```

Route53 定方法
```
Hosted zones から ドメイン設定
=> ドメイン購入後、ACM(AWS Certificate Manager) から 認証書発行必須
=> ACM 登録時、ドメインと、*.ドメインでレコード追加後、Route53に CNAME レコード追加
=> また、Spring SecurityのsetAllowedOriginsを設定しないと、CORSを解決できない。
```

#### google maps api  
```
TBD

*** 配布を公開する時のキーは、必ずアクセス権を公開先urlに制限すること。
```