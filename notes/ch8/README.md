# ch8. 국제화

애플리케이션이 다른 언어, 지역, 문화적 콘텍스트에 맞게 손쉽게 지역화될 수 있게 설계하고 개발하는 프로세스

## 8-1. 코드에서 텍스트와 콘텐츠를 분리하라

### 애플리케이션의 쉬운 번역을 위한 준비사항

사용자가 보는 텍스트 문자열을 코드에서 분리해 외부 리소스 파일이나 DB에 저장하기

- 예시: 텍스트 문자열을 하드코딩 대신 en.json 파일에 키로 분류해 저장

```js
{
  "greeting": "Hello, World!"
}
```

- 추후 프랑스어 번역본을 만드려면, en.json 을 바탕으로 fr.json 을 만들면된다

## 8-2. 서드파티 지역화 라이브러리를 활용하라

대표적으로 react-i18next 라이브러리가 유명

## 8-3. 동적 로딩

- 사이트의 기본 언어가 한국어라면, 영어 번역 파일인 en.json 파일을 동적으로 로딩하는 것이 성능에 도움이 될 수 있다
- useEffect를 활용해 언어 변경을 감지하고, 바뀐 언어의 json 파일을 로딩하는 방식을 사용할 수 있다

## 8-4. 여러 언어에서의 복수형 처리하기

- ICU 문법을 사용하면 각 언어의 복수형에 따른 메시지를 효과적으로 관리할 수 있다
  - ICU: 국제화 및 지역화 콘텍스트에서 메시지를 구현하고 형식을 지정하기 위한 표준화된 방법
- 참고: https://react.i18next.com/misc/using-with-icu-format

## 8-5. 날짜, 시간, 숫자 형식 나타내기

- 날짜는 locale에 따라 다른 형식을 갖는 경우가 많다
- 라이브러리나 프로그래밍 언어의 내장 기능을 사용해 날짜, 시간, 숫자를 locale에 맞게 설정할 수 있다
- JavaScript의 경우, Intl 객체를 활용해 locale별 날짜, 시간, 숫자의 형식을 나타낼 수 있다
- 예시(날짜 형식 지정)

```js
const date = new Intl.DateTimeFormat("ko-KR").format(new Date());
console.log(date); // 2025. 7. 28.

// option을 전달할 수도 있다
const longDate = new Intl.DateTimeFormat("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());
console.log(longDate); // 2025년 7월 28일 월요일
```

- 예시(숫자 형식 지정)

```js
const number = 53_010_301;
console.log(number); // 53010301

const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
console.log(formattedNumber); // 53,010,301
```

- 예시(통화 형식 지정)

```js
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(100);

console.log(usd); // "$100.00"

const krw = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
}).format(100);

console.log(krw); // "₩100"
```

## 8-6. 오른쪽에서 왼쪽으로 쓰는 언어를 고려하라

### RTL(Right To Left) 언어

- 아랍어, 히브리어, 우르두어와 같이 오른쪽에서 왼쪽으로 쓰는 언어들은 레이아웃, CSS 스타일, 텍스트 정렬에 관해 별도로 고려해야 한다

텍스트 방향(dir)

- HTML의 dir 어트리뷰트를 사용하면 RTL 텍스트를 다룰 수 있다
- dir 어트리뷰트를 rtl 로 설정하거나 auto 로 설정하여 사용자 에이전트가 결정하게 하면 텍스트들이 URL 언어에 맞춰 올바르게 정렬됨을 보장할 수 있다
- src/pages/RtlTextPage.tsx 참고

텍스트 정렬(text-align)

- CSS의 text-align 프로퍼티에서 left, right 대신, start, end를 사용하면 문서방향을 기준으로 자동 정렬된다
- 예) dir="rtl" 일 때, text-align: start 이면 오른쪽 기준 정렬

폰트

- 언어에 따라 폰트가 지원되지 않을 수 있으므로 대체 폰트를 제공해야 한다
- 예시

```css
body {
  font-family: "Noto", "Monotype SST";
}
/* 아랍어 콘텐츠(RTL)에 대한 폰트 스택 */
body[lang="ar"] {
  font-family: "Noto Naskh Arabic", "Tahoma";
}
```

CSS logical property로 레이아웃 통제

- margin right 대신 margin inline end 를 사용하면 텍스트 방향에 상관없이 레이아웃의 일관성이 유지된다
- src/pages/RtlTextPage.tsx 참고
