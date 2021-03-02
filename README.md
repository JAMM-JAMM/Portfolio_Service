# 웹프로젝트-레이서포트폴리오-심재민

## 소개: 자신의 포트폴리오를 업로드하고 다른 사람의 포트폴리오를 검색하여 확인할 수 있는 서비스

### 레이서 포트폴리오 서비스(2.23)
- 1. 필수 기능 구현
    - 1. 로그인
        - 사용자로부터 아이디(이메일)와 비밀번호 정보를 입력받아 로그인 합니다. 
        - 아이디와 비밀번호는 필수 입력 사항 입니다.
        - 로그인한 유저에 대해 session(Token)으로 관리해야 합니다.
    - 2. 회원가입
        - 사용자로부터 아이디(이메일), 비밀번호, 이름 정보를 입력받아 회원가입합니다. 
        - 비밀번호와 비밀번호 확인의 값이 일치해야 합니다.
- 2. 더 완성도 있는 서비스를 위한 선택 기능 구현
    - 1. 로그인
        - 비밀번호는 다음의 링크1, 링크2에 맞추어 최소 8자리 이상의 길이로 입력 받아야 합니다.
        - 아이디는 이메일 형식으로만 입력 받아야 합니다.
    - 2. 회원가입
        - 아이디는 이메일 형식으로만 정보를 입력 받아야 합니다. 
        - 이름은 한글, 영문으로만 입력 받아야 합니다. 
        - 비밀번호는 다음의 링크1, 링크2에 맞추어 영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상 또는 3종류 이상을 조합하여 최소 8자리 이상의 길이로 구성합니다.  

### 레이서 포트폴리오 서비스(2.24)
- 1. 필수 기능 구현
    - 1. 로그아웃
        - 현재 로그인한 사용자에 대해 로그아웃 한다.
        - 로그아웃한 유저를 현재 session에서 제거해야 한다.
    - 2. 내 포트폴리오 보기, 수정, 업로드, 삭제
        - 학력: 학교이름, 전공 정보를 text 형식으로 입력받는다. 학위에 대한 사항은 radio button을 통해 입력받는다.
        - 수상 이력: 수상 내역과 상세내역을 text 형식으로 입력받습니다.
        - 프로젝트: 프로젝트 이름과 상세내역을 txt 형식으로 입력받습니다. 프로젝트 수행기간은 datepicker를 활용해 날짜(년월일)를 입력받습니다.
        - 자격증: 자격증 이름, 공급기관을 text 형식으로 입력받습니다. 취득일자는 datepicker를 활용해 날짜(년월일)를 입력받습니다.
- 2. 더 완성도 있는 서비스를 위한 선택기능을 구현한다.
    - 필수 기능을 다 구현 하신 후 시간이 남으신 분들은 선택기능을 구현하세요
    - 1. 내 포트폴리오 보기, 수정, 업로드, 삭제
        - 모든 정보는 validation 되어야 한다.
        - 프로필 이미지를 클릭하여 업로드 및 재업로드 할 수 있어야 한다.
### 레이서 포트폴리오 서비스(2.25)
- 1. 필수 기능 구현
    - 1. 내 포트폴리오 보기, 수정, 업로드, 삭제
        - 학력: 학교이름, 전공 정보를 text 형식으로 입력받는다. 학위에 대한 사항은 radio button을 통해 입력받는다.
        - 수상 이력: 수상 내역과 상세내역을 text 형식으로 입력받습니다.
        - 프로젝트: 프로젝트 이름과 상세내역을 txt 형식으로 입력받습니다. 프로젝트 수행기간은 datepicker를 활용해 날짜(년월일)를 입력받습니다.
        - 자격증: 자격증 이름, 공급기관을 text 형식으로 입력받습니다. 취득일자는 datepicker를 활용해 날짜(년월일)를 입력받습니다.
    - 2. 다른 유저 정보 검색
        - 다른 모든 유저의 정보를 네트워크 화면에 로딩합니다. (페이지네이션 없이 모든 정보를 출력합니다.)
        - 유저 정보에서 정보보기 클릭 시, 다른 유저의 정보를 볼 수 있는 "유저 정보보기" 페이지로 이동합니다.
- 2. 더 완성도 있는 서비스를 위한 선택기능을 구현한다.
    - 필수 기능을 다 구현 하신 후 시간이 남으신 분들은 선택기능을 구현하세요
    - 1. 내 포트폴리오 보기, 수정, 업로드, 삭제
        - 모든 정보는 validation 되어야 합니다.
        - 모든 정보는 validation 되어야 합니다.
    - 2. 다른 유저 정보 검색
        - 이름을 입력하여 검색하며 최소 2글자 이상을 입력해야합니다.
        - 검색 결과가 없을 시, 화면에 "검색 결과가 없습니다." 라는 메세지를 출력합니다.
        - 2글자 미만의 이름을 입력하고 검색 시 alert 창과 함께 "검색어는 최소 2글자 이상 입력해야 합니다." 메세지 출력합니다.

## azure vm 접속하기
- 터미널 창에 ssh azure@~를 써서 아이디와 비밀번호를 쳐서 접속한다.
- git clone 깃랩 주소
- 가상환경 구축하기
- requirements.txt를 install
- mysql 설치; sudo apt-get install mysql

## azure에서 nginx로 배포하기
- cd web-project
- cd client
- sudo apt-get install nginx
- npm run build
- sudo vim /etc/nginx/sites-enabled/default
    - 수정: i
    - 저장하지 않고 종료: ESC + :q! + enter
    - 저장하고 종료: ESC + :wq + enter
- ```server {
    listen 80;
    root /home/azure/web-project/client/build
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
    location /api {
        include proxy_params;
        proxy_pass http://locatehost:5000;
    }
 }
 ```
 - sudo systemctl reload nginx: nginx 재시작
 - sudo systemctl status nginx: nginx 상태
 - 기존 url ~:5000/ + api/를 추가해준다.
 - App.py의 api 주소 앞에 /api를 추가해준다.
 - react 파일을 수정한 후에 nginx에 다시 배포해주기 위해서는 npm run build를 새로 해줘야 반영이 됨
    - sudo systemctl stop nginx: nginx 배포 종료
    - sudo systemctl start nginx: nginx 배포 시작
 - App.py 를 수정해줬을 때, 변경사항을 반영해주기 위해서 gunicorn에 다시 배포해줘야 함
    - ps aux | grep gunicorn: gunicorn에서 실행되는 파일을 모두 보여준다
    - 실행중인 서버를 종료시키고 싶을 때, kill -9 'PID'를 입력
    - ps gunicorn App:app -Db 0.0.0.0:5000: server 파일을 데모 버전으로 배포하고 싶을 때 사용하는 명령어
    - gunicorn App:app -b 0.0.0.0:5000: 일시적으로 server를 열어주는 명령어 꼭 종료시켜줘야 함