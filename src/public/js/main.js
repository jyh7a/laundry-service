// elements
const body = document.getElementsByTagName("body")[0];
const logo = document.querySelector(".logo");
const home_btn = document.querySelector(".home-btn");
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

// 신청하기 버튼 클릭
const addEventOnServiceUpdateBtns = () => {
  const service_update_btns = document.querySelectorAll(".service-update > a");

  for (const service_update_btn of service_update_btns) {
    service_update_btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const serviceId = e.currentTarget.attributes[0].value.replace(
        "/services/",
        ""
      );

      if (window.confirm("정말 신청하시겠습니까?")) {
        // 확인 버튼을 클릭한 경우 수행할 작업
        const res = await axios
          .patch(`/api/bosses/services/${serviceId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            if (response?.status === 200) {
              serviceInit();
              // window.location.href = "/services";
            }
          })
          .catch(function (error) {
            if (error?.response?.data?.message) {
              alert(error.response.data.message);
            }
            console.log(error.message);
          });
      } else {
        // 취소 버튼을 클릭한 경우 수행할 작업
      }
    });
  }
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
const setPageInfo = (userInfo) => {
  // 유저 타입이 1 === 사장님이면
  // body 태그에 boss 클래스를 붙여준다.
  if (userInfo?.userType === 1) {
    body.classList.add("boss");
  }

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
const getService = async (serviceId, userType = 0) => {
  try {
    let url = null;
    if (userType === 0) {
      url = `/api/customers/services/${serviceId}`;
    } else {
      url = `/api/bosses/services/${serviceId}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return 0;
  }
};

// create table template
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

// create service template
const createServiceCard = (body, data, userType, options = {}) => {
  let hmtl = "";
  const { status: _status = null } = options;

  data.map((item) => {
    let status = getStatus(item.status);

    if (userType === 0) {
      hmtl += `
        <div class="service-card">
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
        </div>
    `;
    } else if (userType === 1) {
      if (_status === 0 || _status === null) {
        hmtl += `
        <div class="service-card">
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
            <div class="service-update cp text-align-ct">
              <a href="/services/${item.id}">👉 신청하기</a>
            </div>
            <div class="service-status-text">
              <span>진행상황:&nbsp;</span>${status}
            </div>
          </div>
        </div>
        `;
      } else if (_status === 1) {
        hmtl += `
        <div class="service-card">
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
            <div class="service-update cp text-align-ct">
              <a href="/services/${item.id}">👉 상태 업데이트</a>
            </div>
            <div class="service-status-text">
              <span>진행상황:&nbsp;</span>${status}
            </div>
          </div>
        </div>
        `;
      } else if (_status === 2) {
        hmtl += `
        <div class="service-card">
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
              <a href="/services/${item.id}">👉 상세 보기</a>
            </div>
            <div class="service-update cp text-align-ct">
              <a href="/services/${item.id}">👉 서비스 완료</a>
            </div>
            <div class="service-status-text">
              <span>진행상황:&nbsp;</span>${status}
            </div>
          </div>
        </div>
        `;
      }
    }
  });

  body.innerHTML = hmtl;
};

// create content-nav
const createServiceContentNav = (userType) => {
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
        <div class="create-form btn">
            <a href="/services/form">서비스 신청 테스트</a>
          </div>
        </div>
      <div class="right">
        <div class="service-status btn" data-value="1 all">
          <a>전체</a>
        </div>
        <div class="service-status btn" data-value="2 pending">
          <a href="/services?status=pending">대기중</a>
        </div>
        <div class="service-status btn" data-value="3 inprogress">
          <a href="/services?status=inprogress">진행중</a>
        </div>
        <div class="service-status btn" data-value="4 completed">
          <a href="/services?status=completed">완료</a>
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

// home-btn click
home_btn?.addEventListener("click", function (e) {
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
        e.preventDefault();
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
        let status = null;
        if (e.target.href.includes("pending")) {
          status = 0;
        } else if (e.target.href.includes("inprogress")) {
          status = 1;
        } else if (e.target.href.includes("completed")) {
          status = 2;
        }
        console.log({ status });
        createServiceCard(contentBody, services, userType, { status });
        addEventOnServiceUpdateBtns();
      });
    }
  }
};

// service init
const serviceInit = async () => {
  const userInfo = await getUserInfo();
  console.log({ userInfo });
  const isLogin = !!userInfo;
  console.log({ isLogin });

  if (isLogin === false) {
    return (window.location.href = "/");
  }

  // create content-nav
  createServiceContentNav(userInfo.userType);

  // 유저 정보가 있으면
  // 해당 사용자의 모든 서비스 요청

  const serviceStatusObj = JSON.parse(
    localStorage.getItem("serviceStatus")
  ) || {
    num: 0,
    type: "all",
  };
  const services = await getServices(serviceStatusObj.type, userInfo.userType);

  console.log(services);
  // 서비스 카드를 그려준다
  if (services.length >= 0) {
    createServiceCard(contentBody, services, userInfo.userType);
  }

  createHeaderButton(isLogin);
  getElemets(addEvnetStatusBtn, userInfo.userType);
  setPageInfo(userInfo);

  // 신청하기 버튼 클릭
  addEventOnServiceUpdateBtns();
};
