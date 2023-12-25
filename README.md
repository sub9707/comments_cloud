# 트러블 슈터

<p align="center"><img src="./ReadME/Logo.png" height="300px" width="300px" ></p>

### 개인 에러 관리 + 공유 웹 서비스

📌 프로젝트 기간 : 2023. 09 ~ 2023.12 (진행 중)<br />
📌 프로젝트 진행자 : [김승섭](https://github.com/sub9707) <br />
📌 요약 <br />
개발을 진행하면서 발생한 에러, 오류 등을 스스로 기록하고 관리하고, 이용자 간 공유를 통해 여러 에러를 다른 사용자들과 해결하거나 도움을 주고받는 웹 서비스.

**📌 기술적 목표**

- redux를 활용한 여러 전역 state 관리(modal, theme, user 정보 등)
- React 앱 최적화 방안 적용하기 (Lazy Import, use-hook-form 등)
- JWT 활용한 보안 방안 적용 (cookie와 redux store에 access/refresh token 저장)
- node js를 활용한 서버 개발과 API 구성 (풀스택 역량 강화)
- Styled-Component를 활용한 스타일링 구현
- BootStrap을 포함, 순수 CSS를 활용해 반응형 디자인 구현

  <br />
  <br />

# 📜 목차

- [📝 주요 기능](#📝-주요-기능)
  - [✨ 나만의 노트](#✨-나만의-노트)
  - [✨ 모두의 노트](#✨-모두의-노트)
  - [✨ 성장하는 노트](#✨-성장하는-노트)
- [📝시작하기](#📝시작하기)
  - [요구사항](#요구사항)
  - [Client [React.ts]](#client-reactts)
  - [Server [Node.js]](#server-nodejs)
- [📝 배포 정보](#📝-배포-정보)
  - [배포 방식](#배포-방식)
- [📝기술 스택](#📝기술-스택)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [📝화면구성](#📝화면구성)
- [📝백엔드 API](#📝백엔드-api)
  - [사용된 기술 스택](#사용된-기술-스택)
  - [백엔드 API 명세서](#백엔드-api-명세서)
- [진행 예정 사항](#진행-예정-사항)
  <br />
  <br />

# 📝 주요 기능

### ✨ 나만의 노트

**내가 작성하는 나만의 에러노트**

- 공개-비공개로 숨기거나 공유
- 상황-원인-해결과정-결과로 세분화하여 기록
- 다양한 필터로 필요한 노트만 골라서 확인
- 내 에러만 검색하고 관리

### ✨ 모두의 노트

**다른 사람과 생각과 노트를 공유해요**

- 공개된 게시물을 확인하며 참고
- 기간별 인기있는 게시물 랭킹
- 에러 게시물을 검색하여 참고
- 댓글과 좋아요로 이용자 간 소통

### ✨ 성장하는 노트

**점점 성장하는 나의 노트를 한 눈에**

- 캘린더로 작성 횟수와 주기를 확인
- 최근 작성한 노트와 인기 노트 확인
- 활동 내역에 따라 경험치 부여 (개발예정)
- 좋아요를 누른 게시물을 확인

<br/>
<br/>
<br/>

# 📝시작하기

### 요구사항

빌드와 실행에 필요한 요구사항입니다.

- [Node.js v18.17.1](https://nodejs.org/en)
- [Npm 10.1.0](https://www.npmjs.com/)
- [MariaDB 10.5](https://mariadb.org/)

## Client [React.ts]

```
npm i
npm run dev
npm run build
```

## Server [Node.js]

```
npm i
npm start
```

<br/>
<br/>

# 📝 배포 정보

<div style="display: flex; justify-content: center;" align="center">

| 구분       | 주소                                                              |
| ---------- | ----------------------------------------------------------------- |
| 웹서비스   | https://comments-cloud.vercel.app/                                |
| 프론트엔드 | https://comments-cloud-r2er1d4at-sub9707.vercel.app/              |
| 백엔드     | https://port-0-trouble-shooter-71t02clq3dokrn.sel4.cloudtype.app/ |

</div>

### 배포 방식

<div style="display: flex; justify-content: center;" align="center">

| 구분                   | 명칭                                   |
| ---------------------- | -------------------------------------- |
| 프론트엔드             | [Vercel](https://vercel.com/)          |
| 백엔드 - Database 배포 | [CloudType](https://app.cloudtype.io/) |

</div>

<br/>
<br/>
<br/>

# 📝기술 스택

## Frontend

<div style="display: flex; justify-content: center;" align="center">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel&logoColor=white">
</div>

## Backend

<div style="display: flex; justify-content: center;" align="center">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/jsonwebtokens-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
<img src="https://img.shields.io/badge/nodedotjs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white">
</div>

<br/>
<br/>
<br/>
<br/>
<br/>

# 📝화면구성

| 로그인 & 회원가입                                       | 메인페이지                                             |
| ------------------------------------------------------- | ------------------------------------------------------ |
| <img src="./ReadME/login.png" width="370" height="270"> | <img src="./ReadME/main.png" width="370" height="270"> |

| 서비스 소개                                               | 공지사항                                                 |
| --------------------------------------------------------- | -------------------------------------------------------- |
| <img src="./ReadME/Service.png" width="370" height="270"> | <img src="./ReadME/Notice.png" width="370" height="270"> |

| 나의 에러노트                                             | 모두의 에러노트                                             |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| <img src="./ReadME/MyError.png" width="370" height="270"> | <img src="./ReadME/Community.png" width="370" height="270"> |

| 에러 상세                                                   | 개인 프로필                                               |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| <img src="./ReadME/ErrorView.png" width="370" height="270"> | <img src="./ReadME/Profile.png" width="370" height="270"> |

| 관리자 메인                                                  | 관리자 유저관리                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| <img src="./ReadME/NoticeMain.png" width="370" height="270"> | <img src="./ReadME/AdminUser.png" width="370" height="270"> |

| 관리자 게시판 관리                                           | 관리자 공지관리                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| <img src="./ReadME/AdminBoard.png" width="370" height="270"> | <img src="./ReadME/AdminNotice.png" width="370" height="270"> |

<br/>

# 📝백엔드 API

### 사용된 기술 스택

- 언어: Javascript
- 프레임워크: Express
- 데이터베이스: MariaDB

### 백엔드 API 명세서

| 분류   | 링크                                                                                       |
| ------ | ------------------------------------------------------------------------------------------ |
| Notion | [노션링크](https://shiny-stone-2f9.notion.site/API-aa5f2e3079ad4c3fba9a470cc97f6e61?pvs=4) |

<br/>

# 진행 예정 사항

- 모바일 환경 반응형 디자인
- 활동 내용에 따른 경험치 및 레벨 시스템
