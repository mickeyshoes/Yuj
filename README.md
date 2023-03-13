# Yuj : Enhance your Yoga Experience
![](./image/yuj.png)
노트북만 있다면 어디서나 즐길 수 있는 온라인 요가 화상수업 플랫폼 :woman_technologist:

## Table of Contents

### 1. 프로젝트 개요 및 소개
### 2. 서비스 소개
### 3. 시스템 구성
### 4. 개발 과정
### 5. 빌드


### 1. 프로젝트 개요 및 소개
- 주제 선정 배경
    - 코로나로 인한 비대면 교육 플랫폼의 증가와 국내에서 웰니스(well-being + happiness) 열풍으로 인해 요가에 대한 수요가 높아졌습니다. 그러나 요가를 하기 위한 비대면 플랫폼의 한계(예약과 실시간 수업이 동시에 진행되는 플랫폼의 부재, 피드백을 받기 어려움)가 존재하여 이를 위한 플랫폼을 개발하게 되었습니다.
- 프로젝트 목표
    ![](./image/yuj-target.png)
- 멤버
    - <img src="./image/members.jpg" width="500" height="500">  
    - :technologist: 허재성 : 팀장, BE 리더
    - :technologist: 김인중 : PM, CI/CD 구축
    - :technologist: 오현규 : FE 리더, 디자인 총괄
    - :technologist: 배진호 : 프레젠테이션, 화면 구성
    - :technologist: 이호준 : DB 설계, WebRTC
    - :technologist: 임성민 : 인공지능, 서버 구성

### 2. 서비스 소개
#### 메인 화면
> 가장 먼저 접하게 되는 메인 화면입니다.
![메인](./image/main.png)
#### 강사 목록
> 강사의 목록을 조회할 수 있는 화면입니다. 간략한 소개와 평점을 확인할 수 있습니다.
![강사 목록](./image/%EA%B0%95%EC%82%AC%20%EB%AA%A9%EB%A1%9D.png)
#### 강의 목록
> 전체 강의 목록을 조회할 수 있습니다. 강의에 관련된 간략한 정보를 확인할 수 있습니다.
![강의 목록](./image/lecture_introduce.PNG)

#### 강의 수강(수강생 시점)
<!-- ![yuj-pose-detection-success](https://user-images.githubusercontent.com/49228132/219531818-207fd822-2ae2-4fa0-9790-d8f2c79b5bb0.gif) -->
<img src="https://user-images.githubusercontent.com/49228132/219531818-207fd822-2ae2-4fa0-9790-d8f2c79b5bb0.gif" width="65%" height="65%"/>

#### 강의 시작(강사 시점)
![]()
#### 마이 페이지
> 현재 학습하고 있는 강의 및 출석률, 스케줄 정보를 확인할 수 있습니다.
![마이 페이지](./image/%EB%A7%88%EC%9D%B4%20%ED%8E%98%EC%9D%B4%EC%A7%80.png)


### 3. 시스템 구성
![](./image/configuration2.png)
- FE
    - React 18
    - Redux 4.2.0
    - FullCalendar 6.0.3
    - ApexChart 3.36.3
    - Tensorflow.js 3.21.0
    - Tailwind CSS
    - Daisy UI
    - Material Icon
- BE
    - Spring boot 2.7.8
    - Gradle
    - Swagger
- DB
    - MySQL 8.0.32 
- Media
    - Openvidu 2.25.0
    - kurento 6.18.0
- Operation
    - Jenkins
    - Docker
    - NginX 1.22.1
    - AWS EC2(Ubuntu 22.04 LTS/ 4 Core, 16 GB)

### 4. 개발 과정

#### 요구사항 정의
![](./image/%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD.png)

#### 데이터 베이스 설계
<!-- ![](./image/yuj-erd.png) -->
<img src="./image/yuj-erd.png" width="65%" height="65%"/>

#### 깃 브랜치 전략
<!-- ![](./image/%EB%B8%8C%EB%9E%9C%EC%B9%98%EC%A0%84%EB%9E%B5.png) -->
<img src="./image/%EB%B8%8C%EB%9E%9C%EC%B9%98%EC%A0%84%EB%9E%B5.png" width="65%" height="65%"/>

####
