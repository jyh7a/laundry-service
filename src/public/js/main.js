// utils
const numberWithCommas = (integer) => {
  return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// header button create
const createHeaderButton = (isLogin = false) => {
  const headerButton = document.querySelector(".header-button");
  const pathname = window.location.pathname;

  if (isLogin) {
    headerButton.innerHTML = `
      <div class="btn logout-btn"><a href="/api/logout">로그아웃</a></div>
    `;

    return;
  }

  if (pathname === "/signup") {
    headerButton.innerHTML = `
      <div class="btn login-btn"><a href="/login">로그인</a></div>
    `;
  } else if (pathname === "/login") {
    headerButton.innerHTML = `
      <div class="btn signup-btn"><a href="/signup">회원 가입</a></div>
    `;
  } else {
    headerButton.innerHTML = `
      <div class="btn login-btn"><a href="/login">로그인</a></div>
      <div class="btn signup-btn"><a href="/signup">회원 가입</a></div>
  `;
  }
};

// 유저 정보 요청(필수 정보만)
const getUserInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/info`);
    return response.data;
  } catch (error) {
    return 0;
  }

  // 기존 코드
  // await axios
  //   .get(`http://localhost:3000/api/users/info`)
  //   .then(function (response) {
  //     if (response?.status === 200) {
  //       return response.data;
  //     }
  //   })
  //   .catch(function (error) {
  //     if (error?.response?.data?.message) {
  //       alert(error.response.data.message);
  //     }
  //     console.log(error.message);
  //   });
};

// 유저 정보 요청
const getUser = async (nickname) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${nickname}`
    );
    return response.data;
  } catch (error) {
    return 0;
  }

  // axios
  //   .get(`http://localhost:3000/api/users/${nickname}`)
  //   .then(function (response) {
  //     if (response?.status === 200) {
  //       return response.data;
  //     }
  //   })
  //   .catch(function (error) {
  //     if (error?.response?.data?.message) {
  //       alert(error.response.data.message);
  //     }
  //     console.log(error.message);
  //   });
};

// 해당 유저의 모든 서비스 정보 요청
const getServices = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/services}`);
    return response.data;
  } catch (error) {
    return 0;
  }
};

// create user table template
const createUserTable = (table, data) => {
  console.log(table, data);
  const point = numberWithCommas(data.point);
  const userType = data.userType === 0 ? "손님" : "사장님";
  table.innerHTML = `
   <tr>
    <td>사진</td>
    <td> 
      <img class="user-img"
      src=${data.userImage}
      alt="유저이미지"/>
    </td>
    </tr>
    <tr>
      <td>닉네임</td>
      <td>${data.nickname}</td>
    </tr>
    <tr>
      <td>포인트</td>
      <td>${point}P</td>
    </tr>
    <tr>
      <td>전화번호</td>
      <td>${data.phoneNumber}</td>
    </tr>
    <tr>
      <td>주소</td>
      <td>${data.address}</td>
    </tr>
    <tr>
      <td>유저 타입</td>
      <td>${userType}</td>
    </tr>
    <tr>
      <td>신청한 세탁서비스</td>
      <td>${data.servicesCount}개</td>
    </tr>
    <tr>
      <td>작성한 리뷰</td>
      <td>${data.reviewsCount}개</td>
    </tr>
    <tr>
      <td>가입날짜</td>
      <td>${data.createdAt}</td>
    </tr>
  `;
};
