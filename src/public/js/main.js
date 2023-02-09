// elements
const logo = document.querySelector(".logo");
const sidebar = document.querySelector(".sidebar");
const sidebarList = sidebar?.getElementsByTagName("li");
const serviceStatus = document.querySelectorAll(".service-status");
const contentBody = document.querySelector(".content-body");

// utils
const numberWithCommas = (integer) => {
  return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// set pageInfo(use localStorage)
const setPageInfo = () => {
  const laundryMenuNum = parseInt(localStorage.getItem("laundryMenu"), 10) || 0;
  const serviceStatusObj = JSON.parse(
    localStorage.getItem("serviceStatus")
  ) || {
    num: 0,
    type: "all",
  };

  if (sidebarList?.length > 0) {
    // li 돌면서 active 삭제하는 로직
    for (let i = 0; i < sidebarList.length; i++) {
      sidebarList[i].classList.remove("active");
    }
    sidebarList[laundryMenuNum].classList.add("active");
  }

  if (serviceStatus?.length > 0) {
    // serviceStatus 돌면서 active 삭제하는 로직
    for (let i = 0; i < serviceStatus.length; i++) {
      serviceStatus[i].classList.remove("active");
    }
    serviceStatus[serviceStatusObj.num].classList.add("active");
  }
};

// create pageInfo(use localStorage)
const createPageInfo = ({ laundryMenu, serviceStatus }) => {
  // laundryMenu
  // 0 - 유저, 1 - 서비스, 2 - 리뷰
  if (laundryMenu) {
    localStorage.setItem("laundryMenu", laundryMenu - 1);
  }

  // all, inprogress, completed
  if (serviceStatus) {
    localStorage.setItem("serviceStatus", serviceStatus);
  }
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
const getUser = async ({ nickname }) => {
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
// 고객인지 사장님인지는 서버에서 판단
const getServices = async (status = "all") => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/services?status=${status}`
    );
    return response.data;
  } catch (error) {
    return 0;
  }
};

// create user table template
const createUserTable = (table, data) => {
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

// create user service template
const createServiceCard = (body, data) => {
  let hmtl = "";

  data.map((item) => {
    let status = item.status;
    switch (status) {
      case 0:
        status = "대기중";
        break;
      case 1:
        status = "수거중";
        break;
      case 2:
        status = "수거완료";
        break;
      case 3:
        status = "배송중";
        break;
      case 4:
        status = "배송완료";
        break;
    }

    hmtl += `<div class="service-card">
      <div class="service-top flex-box align-items-ih">
        <div class="service-img">
          <img src="${item.laundryImage}" alt="세탁물 이미지" />
        </div>
        <div class="service-id">
          <span>주문번호:&nbsp;</span>${item.id}
        </div>
        <div class="service-request">
          <span>요청사항:&nbsp; </span>${item.laundryRequest}
        </div>
      </div>
      <div class="service-bottom flex-box">
        <div class="service-detail cp text-align-ct">
          <a href="/services/detail?serviceId=${item.id}">👉 상세보기</a>
        </div>
        <div class="service-status-text">
          <span>진행상황:&nbsp;</span>${status}
        </div>
      </div>
    </div>`;
  });

  body.innerHTML = hmtl;
};

// logo click
logo?.addEventListener("click", function (e) {
  createPageInfo({ laundryMenu: 1 });
});

// sidebar click
sidebar?.addEventListener("click", function (e) {
  const value = parseInt(e.target.dataset.value, 10);
  createPageInfo({ laundryMenu: value });
});

// service status click
if (serviceStatus.length > 0) {
  for (let i = 0; i < serviceStatus.length; i++) {
    serviceStatus[i].addEventListener("click", async function (e) {
      let [num, type] = this.dataset.value.split(" ");
      num -= 1;
      const serviceStatus = JSON.stringify({ num, type });
      createPageInfo({ serviceStatus });
      setPageInfo();

      // axios 요청
      const serviceStatusObj = JSON.parse(
        localStorage.getItem("serviceStatus")
      ) || {
        num: 0,
        type: "all",
      };
      const services = await getServices(serviceStatusObj.type);
      createServiceCard(contentBody, services);
    });
  }
}
