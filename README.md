# 🤩 레이서 포트폴리오 서비스
![1](https://user-images.githubusercontent.com/70768269/122634892-dbfc4f80-d11b-11eb-8461-99e5772d7c6b.png)

## 개발 기간

2021년 2월 23일 ~ 2021년 3월 6일

## 프로젝트 종류

개인 프로젝트(1명)

## 담당 역할

Front-end, Back-end

## 프로젝트 소개

자신의 포트폴리오를 업로드하고 **보기, 수정, 삭제, 등록**을 할 수 있고 다른 사람의 포트폴리오를 **검색**하여 확인할 수 있는 서비스입니다.

## 주요 사용 기술

- **Flask**
- **MySQL**
- **Javascript**
- **React.js Functional Components + Hook**
- **React Bootstrap**
- **Material-UI**
- **Azure VM (OS: Ubuntu 18.04)**
- **Nginx, Gunicorn**

## 기능 소개

### 1. 메인 페이지
![Untitled](https://user-images.githubusercontent.com/70768269/122634896-e1f23080-d11b-11eb-9680-f997a7815650.png)
![Untitled-2](https://user-images.githubusercontent.com/70768269/122635012-5cbb4b80-d11c-11eb-8677-10b4c6806636.png)

- 메인 화면에 포트폴리오 웹 서비스의 소개 및 가이드를 슬라이드 형식으로 구현하여 접근성을 높였습니다.
- 왼쪽 상단의 'Racer Portfolio Service' 버튼을 누르면 메인 페이지로 이동합니다.
- 로그인하지 않은 사용자에 대해서 'MyPortfolio', 'Network' 서비스 화면으로 이동하지 않고, 로그인 화면으로 이동하도록 구현하였습니다.

### 2. 로그인 페이지
![Untitled-3](https://user-images.githubusercontent.com/70768269/122635017-5e850f00-d11c-11eb-9cbc-32125bed553b.png)

- 사용자로부터 아이디(이메일)와 비밀번호 정보를 입력받아 로그인
- 아이디(이메일)과 비밀번호는 필수 입력 사항입니다.
- 아이디는 이메일 형식이어야 합니다.
- 로그인한 유저에 대해 client ↔ server 간에 유저의 id에 기반한 jwt token으로 관리

### 3. 회원가입 페이지
![Untitled-4](https://user-images.githubusercontent.com/70768269/122635023-62b12c80-d11c-11eb-8b59-42bdf83a6a00.png)

- 사용자로부터 아이디(이메일), 비밀번호, 이름 정보를 입력받아서 회원가입합니다.
- 아이디는 이메일 형식, 이름은 한글 또는 영문으로만 입력받아야 합니다.
- 비밀번호와 비밀번호 확인의 값이 일치해야 합니다

### 4. MyPortfolio 페이지
![Untitled-5](https://user-images.githubusercontent.com/70768269/122635025-6644b380-d11c-11eb-9706-fdc8e885ea39.png)
![Untitled-6](https://user-images.githubusercontent.com/70768269/122635028-693fa400-d11c-11eb-8b64-3b09cc393fb3.png)

- 내 포트폴리오 보기, 수정, 업로드, 삭제를 할 수 있습니다.
- 학력(Academic Background)

    — 학교이름, 전공 정보를 text 형식으로 입력받습니다.  학위에 대한 사항은 radio button을 통해 입력받습니다.

- 수상 이력

    — 수상 내역과 상세내역을 text 형식으로 입력받습니다.

- 프로젝트

    — 프로젝트 이름과 상세내역을 txt 형식으로 입력받습니다

    — 프로젝트 수행기간은 datepicker를 활용해 날짜(년월일)를 입력받습니다.

- 자격증: 자격증 이름, 공급기관을 text 형식으로 입력, 취득일자는 datepicker를 활용해 날짜(년월일)를 입력받습니다.

### 5. Network (Search) 페이지
![Untitled-7](https://user-images.githubusercontent.com/70768269/122635032-6b096780-d11c-11eb-8ffc-6a3305edad78.png)

- 다른 모든 유저의 정보를 네트워크 화면에서 페이지네이션 없이 모든 정보를 출력합니다.
- 유저 정보에서 정보보기 클릭시, 다른 유저의 정보를 볼 수 있는 "유저정보보기" 페이지로 이동합니다.
    - 내 포트폴리오 보기 페이지와 같이 대상 유저의 학력, 수상 이력, 프로젝트, 자격증 정보를 표시
- 이름을 입력하여 검색하며 최소 2글자 이상을 입력해야합니다.
- 검색 결과가 없을 시, 화면에 "검색 결과가 없습니다." 라는 메세지를 출력합니다.
- 2글자 미만의 이름을 입력하고 검색 시 alert 창과 함께 "검색어는 최소 2글자 이상 입력해야 합니다." 메세지 출력합니다.

## 유지 보수 내용 및 일정

**Back-end**

- [x]  Blueprint를 이용하여 기능 별 module 분리하기
- [ ]  DB 변경 (MySQL → MongoDB, mongoengine ORM)
- [ ]  Marshmallow 라이브러리 사용하여 Serialization, Deserialization, Validation 추가 구현
- [ ]  Flask-rests 라이브러리 사용하여 swagger documentation 추가 구현
    - 추후 Front-end refactoring을 위한 API 문서화 작업
- [ ]  Oauth 2.0 (Google or Kakao) 추가 구현
