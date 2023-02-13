## fetch, xhr 차이

"fetch"와 "XHR"은 두 가지 다른 방법으로 웹 브라우저에서 HTTP 요청을 보낼 수 있는 방법입니다.

"fetch"는 새로운 API이며 웹 브라우저에서 HTTP 요청을 보낼 때 사용하는 기능입니다. 새로운 기능으로 구조가 간결하고, 직관적이며, 프로미스 기반으로 작성할 수 있는 장점이 있습니다.

"XHR" (XMLHttpRequest)은 구식 API로서 웹 브라우저에서 HTTP 요청을 보낼 때 사용하는 기능입니다. 구조가 복잡하고 직관적이지 않지만, 제어가 용이하고, 자세한 정보를 제공할 수 있는 장점이 있습니다.

개발자 도구의 네트워크 탭에서는 어떤 페이지에서 보낸 HTTP 요청을 디버깅하기 위해서 사용할 수 있습니다. 요청을 보낼 때 사용한 방식에 따라 "fetch" 또는 "XHR"으로 표시될 수 있습니다.

## fetch 로 요청하기

axios는 비동기 HTTP 요청 라이브러리이며, XHR (XMLHttpRequest)를 사용하여 HTTP 요청을 보냅니다. XHR은 웹 브라우저에서 HTTP 요청을 보내는 API 입니다.

반면, fetch API는 최신 브라우저에서 제공하는 HTTP 요청 방식입니다. fetch API는 Promise 기반으로 동작하며, 더욱 간결한 코드로 HTTP 요청을 보낼 수 있습니다.

따라서, axios보다는 fetch API를 사용하는 것이 좋습니다.

```javascript
const res = await fetch("/api/login", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed");
    }
  })
  .then((data) => {
    window.location.href = "/users";
  })
  .catch((error) => {
    console.error(error);
  });
```
