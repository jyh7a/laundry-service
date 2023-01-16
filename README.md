# Link list

- 과제 요구사항 - <https://www.notion.so/teamsparta/221230-4-58854b5f72d84d13aa7dcd67b922b81c>
- ERD - <https://drawsql.app/teams/sparta-12/diagrams/laundry-service>
- api 명세 -
- 변수명 직기 - <https://www.curioustore.com/#>!/

<br/>

# ERD

## <a href="https://ryulstudy.tistory.com/48" target="_blank">ERD 그리기</a>

## <a href="https://ryulstudy.tistory.com/48" target="_blank">ERD 참고</a>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbFVl6V%2FbtqOMpd69TD%2F9I2U6iIPsEMJeNuYNkbIH0%2Fimg.png">

<br>

## 테이블 스키마

<br>

### Users

| name            | type | desc |
| ---             | ---  |  --- |
| id              | bigint unsigned | 아이디                            |
| point           | bigint unsigned | 포인트 (손님 - 1,000,000P , 사장님 - 0P)  |
| nickname        | varchar(255)    | 닉네임                            |
| phoneNumber     | varchar(255)    | 전화번호                           |
| address         | varchar(255)    | 집주소                            |
| laundryPicture  | varchar(255)    | 섹탁물 사진                        |
| laundryRequest  | TEXT            | 섹탁물 요청 사항                    |
| userType        | int unsigned    | 0 - 손님, 1 - 사장님               |
| createdAt       | datetime        | 유저 생성 시간                      |
| updatedAt       | datetime        | 유저 업데이트 시간                   |

<br>

### Orders

| name              | type | desc |
| ---               | ---  |  --- |
| id                | bigint unsigned | 아이디                            |
| userId            | bigint unsigned | 손님 아이디(외래키)                  |
| laundryServiceId  | bigint unsigned | 서비스 아이디(외래키)                 |
| shopId            | bigint unsigned | 가게 아이디(외래키)                  |
| status            | int unsigned    | 주문상태 <br>0 - 대기중(Default), 1 - 수거중, 2 - 수거 완료, 3 - 배송 중, 4 - 배송 완료 |
| due_date          | datetime        | 손님이 요청한 세탁 마감일               |
| createdAt         | datetime        | 주문 생성 시간                       |
| updatedAt         | datetime        | 주문 업데이트 시간                    |

<br>

### laundry_service

| name              | type | desc |
| ---               | ---  |  --- |
| id                | bigint unsigned | 아이디                      |
| name              | varchar(255)    | 서비스 이름(일반 서비스)        |
| point             | int unsigned    | 포인트  10,000p 차감         |
| createdAt         | datetime        | 세탁 서비스 생성 시간          |
| updatedAt         | datetime        | 세탁 서비스 업데이트 시간       |

<br>

### shops

| name              | type | desc |
| ---               | ---  |  --- |
| id                | bigint unsigned   | 아이디       |
| name              | varchar(255)      | 가게 이름     |
| phoneNumber       | varchar(255)      | 가게 전화번호  |
| location          | varchar(255)      | 가게 위치     |
| userId            | bigint unsigned   | 사장님 ID     |
| laundryServiceId  | bigint unsigned   | 세탁 서비스 ID(Default - 1)    |
| createdAt         | datetime          | 가게 생성 시간                  |
| updatedAt         | datetime          | 가게 업데이트 시간               |


## <a href="https://drawsql.app/teams/sparta-12/diagrams/laundry-service" target="_blank">Laundry service ERD</a>
