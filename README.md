# Axios Tutorial

#### Docs

[Axios Docs](https://axios-http.com/docs/intro)

#### Install

```sh
npm install axios
```

#### First Request

- import axios

- axios.get(url)
- axios.post(url)
- axios.patch/put(url)
- axios.delete(url)

- default get axios(url)

- returns a promise
- response data located in data property
- error in error.response

```js
import axios from 'axios';

const fetchData = async () => {
  try {
    // axios.get(), axios.post(),axios.put(), axios.delete()
    const response = await axios(url);

    console.log(response);
  } catch (error) {
    console.log(error.response);
  }
};
```

#### Headers
Accept 와 Content-Type 비교
- Accept : `브라우저`가 서버에게 자신이 처리할 수 있는 데이터 타입을 명시
- Content-Type : 현재 전송하는 데이터가 어떤 타입인지 명시 (`GET`에서는 무쓸모)


- second argument
- axios.get(url,{})

- third argument in requests with data
- axios.post(url,{data},{})

```js
const fetchDadJoke = async () => {
  try {
    const { data } = await axios(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    // console.log(data);
    setJoke(data.joke);
  } catch (error) {
    console.log(error.response);
  }
};
```

#### Post Request

- send data to the server
- axios.post(url, { data })
- more options (auth header) - axios.post(url, { data },{})

```js
try {
  const resp = await axios.post(url, { data });
} catch (error) {
  console.log(error.response.data);
}
```

#### Global Defaults

```js
// common 넣어도 되고 안넣어도 됨
// axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';
// 이후 axios instance 사용할 때 url 에는 공백을 넣든, 추가 query path를 넣으면 됨
axios.defaults.baseURL = 'https://api.example.com';

// common 넣어도 되고 안넣어도 됨
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers['Authorization'] = AUTH_TOKEN;

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

#### Custom Instance

```js
const authFetch = axios.create({
  baseURL: 'https://course-api.com',
  headers: {
    Accept: 'application/json',
  },
});
```

#### Interceptors

- global and custom

```js
authFetch.interceptors.request.use(
  (request) => {
    // request.headers.common['Accept'] = `application/json`;
    request.headers['Accept'] = `application/json`;

    console.log('request sent');
    // must return request
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    console.log('got response');
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 404) {
      // do something
      console.log('NOT FOUND');
    }
    return Promise.reject(error);
  }
);
```