import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const DATE = "20230812";

// 아재개그(영어) API
export const dadJokeInstance = axios.create({
  baseURL: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "application/json",
  },
});

// 영화진흥위원회 API
export const movieInstance = axios.create({
  baseURL:
    "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
  headers: {
    Accept: "application/json",
  },
});

// 요청 인터셉터
movieInstance.interceptors.request.use(
  (req) => {
    // console.log("여기는 인터셉터"); // req 보내기 전에 실행됨
    // 인터셉터를 통해 API 키 입력
    req.baseURL += `?key=${API_KEY}&targetDt=${DATE}`;
    return req;
  },
  (err) => {
    // 요청 오류가 있는 경우 작업 수행
    return Promise.reject(err);
  },
);

// 응답 인터셉터
movieInstance.interceptors.response.use(
  (res) => {
    console.log("응답 데이터를 인터셉터에서 표시", res);
    return res.data.boxOfficeResult.dailyBoxOfficeList as never;
  },
  (err) => {
    return Promise.reject(err);
  },
);
