1. 이번 프로젝트는 실시간으로 서비스 상태가 업데이트가 되는 것이 핵심이며 상태 업데이트 현황에 따라 포인트가 움직여야 합니다.
제가 예시로 제시하는 세탁 서비스는 세탁을 맡기려는 손님과 세탁소 사장님이 주인인 서비스입니다.
서비스 플로우는 다음과 같습니다.
아래 서비스 플로우를 다 읽고 이에 맞는 rest api 및 erd를 그려주세요.

손님
    1. 회원가입 (이 때, 손님으로 회원가입) → 회원가입 완료시 1,000,000P 지급
    2. 로그인 / 로그아웃
    3. 세탁 서비스 신청하기
        1. 잔여 포인트가 10,000P 미만이면 세탁 서비스를 신청할 수 없습니다.
        2. 세탁 서비스를 신청할 시에 10,000P(세탁비)가 깎입니다.
        3. 세탁 서비스 신청할 때는 다음과 같은 정보들을 입력을 받아야 합니다.
            1. 손님 닉네임
            2. 손님 전화번호
            3. 손님 집 주소
            4. 손님 세탁물 사진
            5. 세탁 요청사항
    4. 내가 신청한 세탁 서비스 상태 파악
        1. `대기 중`
            1. 사장님 중 아무도 손님의 세탁물 수거를 신청하지 않은 상황
        2. `수거 중`
            1. 사장님 중 한 분이 세탁물 수거를 신청하여 수거를 하러 가는 상황
        3. `수거 완료`
            1. 사장님이 수거를 완료한 상황
        4. `배송 중`
            1. 사장님이 세탁을 완료하고 배송 중인 상황
        5. `배송 완료`
            1. 사장님이 손님의 집 앞으로 세탁물을 배송 완료한 상황
    5. 세탁 서비스 평점 및 리뷰 작성
        1. 해당 기능은 사용자가 선택적으로 작성 할 수 있어야 합니다. 의무는 아닙니다.

사장님
    1. 회원 가입 (이 때, 사장님으로 회원가입) → 회원 가입 시 0P 지급
    2. 로그인 / 로그아웃
    3. 손님들이 신청한 세탁물 조회
    4. 조회된 세탁물 중 하나를 세탁 진행
        1. 사장님이 2개 이상 “세탁 진행”을 할 수 없게끔 합니다. 오로지 하나만 세탁할 수 있습니다.
    5. 작업 중인 세탁물 상태 업데이트
        1. 사장님은 `수거 완료` → `배송 중` → `배송 완료`의 3단계로 세탁 상태를 업데이트 할 수 있습니다.
        2. 오로지 위에 나온 순서대로 세탁 상태를 업데이트 할 수 있으며 그 외의 상태 업데이트는 금지합니다.
        3. `배송 완료`를 누르면 10,000P를 입금 받습니다.
    6. 본인의 세탁 서비스 평점 및 리뷰 조회

========================================================================================================================

2. Create a laundry service app using nodejs express and referring to the layered architecture pattern.<br/>

3. I'm trying to make a laundry service app, please draw erd.

4. erd 참고 - <https://ryulstudy.tistory.com/48>

5. Create a user table, and create a db table so that the user has a nickname, phone number, home address, laundry picture, and laundry request. i use mysql database

    ```SQL
    CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nickname VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        home_address VARCHAR(255) NOT NULL,
        laundry_picture VARCHAR(255) NOT NULL,
        laundry_request TEXT NOT NULL,
        PRIMARY KEY (id)
    );
    ```

<br>

6. In the users table, we want to distinguish between guests and the boss with a specific value. What should be the column name?

    ```SQL
    CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nickname VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        home_address VARCHAR(255) NOT NULL,
        laundry_picture VARCHAR(255) NOT NULL,
        laundry_request TEXT NOT NULL,
        user_type ENUM('guest','boss') NOT NULL,
        PRIMARY KEY (id)
    );
    ```

    ```SQL
    CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nickname VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        home_address VARCHAR(255) NOT NULL,
        laundry_picture VARCHAR(255) NOT NULL,
        laundry_request TEXT NOT NULL,
        user_type TINYINT(1) NOT NULL,
        PRIMARY KEY (id)
    );
    ```

    ```SQL
    CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nickname VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        home_address VARCHAR(255) NOT NULL,
        laundry_picture VARCHAR(255) NOT NULL,
        laundry_request TEXT NOT NULL,
        user_type VARCHAR(10) NOT NULL,
        PRIMARY KEY (id)
    );
    ```

<br/>

7. I'm trying to build a laundry service app, how do I create a table? The tables think users, orders, laundry_services. Please also tell me the relationship between each table. The db uses mysql.

    ```SQL
    CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nickname VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        home_address VARCHAR(255) NOT NULL,
        user_type ENUM('guest','boss') NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE laundry_services (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        price FLOAT(10,2) NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE orders (
        id INT(11) NOT NULL AUTO_INCREMENT,
        user_id INT(11) NOT NULL,
        service_id INT(11) NOT NULL,
        status ENUM('pending','done') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (service_id) REFERENCES laundry_services(id)
    );
    ```

<br>

8. If your laundry service requires guests to complete their laundry by when, where would you add a date column?

    ```SQL
    ALTER TABLE orders
    ADD due_date DATE NOT NULL;
    ```

<br>
