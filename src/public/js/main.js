// elements
const logo = document.querySelector(".logo");
const sidebar = document.querySelector(".sidebar");
const sidebarList = sidebar?.getElementsByTagName("li");
const contnetNav = document.querySelector(".content-nav");
const contentBody = document.querySelector(".content-body");

let serviceStatus = null;

// utils
// 리눅스, 윈도 패스 변환
const getElemets = (cb, value) => {
  serviceStatus = document.querySelectorAll(".service-status");
  cb(value);
};

const numberWithCommas = (integer) => {
  return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// get status
const getStatus = (status) => {
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

  return status;
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
    const response = await axios.get(`/api/users/info`);
    return response.data;
  } catch (error) {
    return 0;
  }

  // 기존 코드
  // await axios
  //   .get(`/api/users/info`)
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
    const response = await axios.get(`/api/users/${nickname}`);
    return response.data;
  } catch (error) {
    return 0;
  }

  // axios
  //   .get(`/api/users/${nickname}`)
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
const getServices = async (status = "all", userType = 0) => {
  try {
    let response = null;
    if (userType === 0) {
      response = await axios.get(`/api/customers/services?status=${status}`);
    } else {
      response = await axios.get(`/api/bosses/services?status=${status}`);
    }

    return response.data;
  } catch (error) {
    return 0;
  }
};

// 해당 유저의 선택된 서비스 정보 요청
// 고객인지 사장님인지는 서버에서 판단
const getService = async (serviceId) => {
  try {
    const response = await axios.get(`/api/services/${serviceId}`);
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
    let status = getStatus(item.status);

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
          <a href="/services/${item.id}">👉 상세보기</a>
        </div>
        <div class="service-status-text">
          <span>진행상황:&nbsp;</span>${status}
        </div>
      </div>
    </div>`;
  });

  body.innerHTML = hmtl;
};

// create content-nav
const createContentNav = (userType) => {
  // userType
  // 0 - 고객
  // 1 - 사장님
  let html = "";
  if (userType === 0) {
    html = `
      <div class="left">
        <div class="create-form btn">
          <a href="/services/form">서비스 신청</a>
        </div>
      </div>
      <div class="right">
        <div class="service-status btn" data-value="1 all">
          <a>전체</a>
        </div>
        <div class="service-status btn" data-value="2 inprogress">
          <a>진행중</a>
        </div>
        <div class="service-status btn" data-value="3 completed">
          <a>완료</a>
        </div>
      </div>
    `;
  } else {
    html = `
      <div class="left">
      </div>
      <div class="right">
        <div class="service-status btn" data-value="1 all">
          <a>전체</a>
        </div>
        <div class="service-status btn" data-value="2 pending">
          <a>대기중</a>
        </div>
        <div class="service-status btn" data-value="3 inprogress">
          <a>진행중</a>
        </div>
        <div class="service-status btn" data-value="4 completed">
          <a>완료</a>
        </div>
      </div>
    `;
  }

  contnetNav.innerHTML = html;
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
const addEvnetStatusBtn = (userType) => {
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
        const services = await getServices(serviceStatusObj.type, userType);
        createServiceCard(contentBody, services);
      });
    }
  }
};
