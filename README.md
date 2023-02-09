# Notion List

- 1월 26(목) - ERD(수정), API, 추가 모듈 설치(https://www.notion.so/teamsparta/1-26-ERD-API-6845736f8a58437ca4b0c018580e2bc9)

<br/>

# Link list

- 과제 요구사항 - <https://www.notion.so/teamsparta/221230-4-58854b5f72d84d13aa7dcd67b922b81c>
- ERD - <https://drawsql.app/teams/sparta-12/diagrams/laundry-service>
- api 명세 -
- 변수명 직기 - <https://www.curioustore.com/#>!/

<br/>

# 링크 말고는 Notion에 업데이트!

<br/>
# ERD

## <a href="https://ryulstudy.tistory.com/48" target="_blank">ERD 그리기</a>

## <a href="https://ryulstudy.tistory.com/48" target="_blank">ERD 참고</a>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbFVl6V%2FbtqOMpd69TD%2F9I2U6iIPsEMJeNuYNkbIH0%2Fimg.png">

<br>

## 테이블 스키마

<br>

### Users

| name        | type            | desc                                     |
| ----------- | --------------- | ---------------------------------------- |
| id          | bigint unsigned | 아이디                                   |
| password    | varchar(255)    | 패스워드                                 |
| point       | bigint unsigned | 포인트 (손님 - 1,000,000P , 사장님 - 0P) |
| nickname    | varchar(255)    | 닉네임                                   |
| phoneNumber | varchar(255)    | 전화번호                                 |
| address     | varchar(255)    | 집주소                                   |
| userType    | int unsigned    | 0 - 손님, 1 - 사장님                     |
| createdAt   | datetime        | 유저 생성 시간                           |
| updatedAt   | datetime        | 유저 업데이트 시간                       |

<br>

### Orders

| name           | type            | desc                                                                                    |
| -------------- | --------------- | --------------------------------------------------------------------------------------- |
| id             | bigint unsigned | 아이디                                                                                  |
| laundryImage   | varchar(255)    | 세탁물 사진                                                                             |
| laundryRequest | TEXT            | 세탁물 요청 사항                                                                        |
| userId         | bigint unsigned | 손님 아이디(외래키)                                                                     |
| shopId         | bigint unsigned | 가게 아이디(외래키)                                                                     |
| status         | int unsigned    | 주문상태 <br>0 - 대기중(Default), 1 - 수거중, 2 - 수거 완료, 3 - 배송 중, 4 - 배송 완료 |
| due_date       | datetime        | 손님이 요청한 세탁 마감일                                                               |
| createdAt      | datetime        | 주문 생성 시간                                                                          |
| updatedAt      | datetime        | 주문 업데이트 시간                                                                      |

<br>

### Shops - DELETE

| name        | type            | desc               |
| ----------- | --------------- | ------------------ |
| id          | bigint unsigned | 아이디             |
| name        | varchar(255)    | 가게 이름          |
| phoneNumber | varchar(255)    | 가게 전화번호      |
| location    | varchar(255)    | 가게 위치          |
| userID      | bigint unsigned | 사장님 ID          |
| createdAt   | datetime        | 가게 생성 시간     |
| updatedAt   | datetime        | 가게 업데이트 시간 |

<br>

## <a href="https://drawsql.app/teams/sparta-12/diagrams/laundry-service" target="_blank">Laundry service ERD</a>

<br>

# 모듈 설치

## Dependencies

- express, cookie-parser, dotenv, jsonwebtoken, sequelize, mysql2

  ```
  npm i express cookie-parser dotenv jsonwebtoken sequelize mysql2
  ```

## Dev dependencies

- sequelize-cli

  ```
  npm i sequelize-cli
  ```

<br>

# Sequlize init, create migrations, models

- 시퀄라이즈 셋팅

  ```
  sequelize init
  ```

- dbconfig 셋팅

  ```javascript
  require("dotenv").config();
  const env = process.env;

  const development = {
    username: env.MYSQL_AWS_USERNAME,
    password: env.MYSQL_AWS_PASSWORD,
    database: env.MYSQL_AWS_DATABASE,
    host: env.MYSQL_AWS_HOST,
    dialect: "mysql",
  };
  const test = {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  };
  const production = {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  };

  module.exports = { development, test, production };
  ```

- dbconfig 셋팅

  ```javascript
  PORT=3000
  MYSQL_AWS_USERNAME=root
  MYSQL_AWS_PASSWORD=12345678
  MYSQL_AWS_DATABASE=laundry_service
  MYSQL_AWS_HOST=127.0.0.1
  JWT_SECRET_KEY=secret
  ```

- models/index.js 셋팅

  ```javascript
  const config = require(__dirname + "/../config/config.js")[env];
  ```

- sequlize db:create - 디비생성(이떄 mysql2 모듈 설치 안 하면 에러)

  ```bash
  sequelize db:create
  ```

- migration, model 생성

  - Users

    ```bash
    sequelize model:generate --name Users --attributes password:string,point:bigint,nickname:string,phoneNumber:string,address:string,userType:bigint
    ```

  - Services

    ```bash
    sequelize model:generate --name Services --attributes nickname:string,userId:bigint,phoneNumber:string,address:string,laundryImage:string,laundryRequest:text,point:bigint,status:bigint
    ```

  - Reviews

    ```bash
    sequelize model:generate --name Reviews --attributes userId:bigint,serviceId:bigint,comment:text,rating:bigint
    ```

- sequelize db:migrate

  ```bash
  sequelize db:migrate
  ```

# 참고 자료

- Layered Pattern - https://han-py.tistory.com/443
-
