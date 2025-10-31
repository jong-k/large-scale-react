# ch.17 사용자 중심 API 디자인

- API 디자인 시 중요한 요소

## 17-1. 일관성

- API를 더 쉽게 이해할 수 있게 하여 API를 이용하는 개발자의 인지 부하를 줄여준다

### 명명 규칙

<table>
  <tr>
    <th></th>
    <th>명명 규칙</th>
    <th>설명</th>
    <th style="color: red">Bad</th>
    <th style="color: green">Good</th>
  </tr>
  <tr>
    <td>1</td>
    <td>명확한 이름 사용</td>
    <td>혼란을 줄 수 있는 축약어 사용을 자제한다</td>
    <td>/u, /p</td>
    <td>/users, /products</td>
  </tr>
  <tr>
    <td>2</td>
    <td>소문자와 하이픈만 사용</td>
    <td>여러 단어로 구성된 리소스 이름에서는 소문자와 하이픈만 사용하는 것이 가독성에 좋고, 일반적인 URL 규칙을 준수한다</td>
    <td>/orderItems, /ShippingAddresses</td>
    <td>/order-items, /shipping-addresses</td>
  </tr>
  <tr>
    <td>3</td>
    <td>리소스 이름에는 명사를 사용</td>
    <td>리소스는 시스템의 엔티티들을 나타내므로 명사를 사용해야 한다. 리소스가 액션이 아닌 사물임을 명확하게 해준다.</td>
    <td>/getCustomers, /createOrder</td>
    <td>/customers, /orders</td>
  </tr>
  <tr>
    <td>4</td>
    <td>CRUD 이외 액션에는 동사 사용</td>
    <td>HTTP 메서드 GET, POST, PUT 등에 매핑되지 않는 조작에 대해서는 동사를 사용한다. 이는 대표적인 CRUD(create, read, update, delete) 조작과 구분되는 다른 특별한 액션임을 알게 해준다.</td>
    <td>/order-cancellation, /password-reset</td>
    <td>/orders/{orderId}/cancel, /users/{userId}/reset-password</td>
  </tr>
  <tr>
    <td>5</td>
    <td>단수/복수형 선택하여 일관적으로 표현</td>
    <td>리소스 이름을 표현할 때 단수/복수형을 정해 하나만 사용하기</td>
    <td>/customer, /orders, /product (단복수 혼합 사용)</td>
    <td>모두 단수 or 모두 복수</td>
  </tr>
</table>

예시)customer, order, product 도메인을 갖는 API

```
GET /customers
POST /customers
GET /customers/{customerId}
PUT /customers/{customerId}
DELETE /customers/{customerId}
GET /customers/{customerId}/orders
POST /customers/{customerId}/orders

GET /orders/{orderId}
PUT /orders/{orderId}
DELETE /orders/{orderId}
POST /orders/{orderId}/cancel

GET /products
GET /products/{productId}
GET /products/{productId}/reviews
POST /products/{productId}/reviews
```

### 리소스 구조

<table>
  <tr>
    <th></th>
    <th>리소스 구조화</th>
    <th>설명</th>
    <th>상세</th>
  </tr>
  <tr>
    <td>1</td>
    <td>계층을 사용해 관계 나타내기</td>
    <td>중첩된 리소스는 소속 혹은 조합을 나타낸다</td>
    <td>
      <p>/customers/{customerId}/addresses -> address가 customers에 속해 있음</p>
      <p>/orders/{orderId}/items -> items가 orders에 속해 있음</p>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>URL 최소화하기</td>
    <td>중첩은 유용하지만, URL이 너무 길어지는 것은 피해야 한다</td>
    <td></td>
  </tr>
  <tr>
    <td>3</td>
    <td>필터링, 정렬, 페이지네이션을 위해 매개 변수 사용하기</td>
    <td>쿼리 파라미터를 사용하여 base URL을 명확하게 유지하면서 유연한 쿼리를 만들 수 있다</td>
    <td>예) GET /products?category=electronics&sort=price&page=2&limit=20</td>
  </tr>
  <tr>
    <td>4</td>
    <td>유사한 리소스에 대해 일관성있는 패턴 사용하기</td>
    <td>두 리소스가 유사한 구조를 갖는다면 이들을 표현하는 방식에도 일관성을 유지한다</td>
    <td>
      <p>GET /users/${userId}/profile</p>
      <p>GET /companies/${companyId}/profile</p>
    </td>
  </tr>
</table>

예시)일관성있는 리소스 구조를 갖는 이커머스 API

```
/users
/users/{userId}
/users/{userId}/orders
/users/{userId}/addresses

/products
/products/{productId}
/products/{productId}/reviews

/orders
/orders/{orderId}
/orders/{orderId}/items
/orders/{orderId}/shipments

/categories
/categories/{categoryId}
/categories/{categoryId}/products
```

### 응답 형식

- 일관적인 응답 형식을 제공하면 개발자들이 API를 더 쉽게 이해할 수 있고, API 반환 데이터를 더 쉽게 파싱할 수 있다

모든 응답에 대해 일관성있는 구조를 사용하라

- 예시: 성공과 에러 응답에 대해 유사한 형식 사용

```json
// 성공 응답
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// 에러 응답
{
  "status": "error",
  "data": {
    "message": "User not found",
    "code": "NOT_FOUND"
  }
}
```

리소스에 대해 일관성있는 필드명을 사용하라

- 여러 리소스가 유사한 프로퍼티를 갖는다면 프로퍼티 이름을 통일하기
- 예시: 서로 다른 리소스에서 createdAt, updatedAt 통일

```json
// User
{
  "id": 123,
  "createdAt": "2023-07-01T12:00:00Z",
  "updatedAt": "2023-07-02T14:30:00Z",
  "name": "John Doe"
}

// Product
{
  "id": 456,
  "createdAt": "2023-06-15T09:00:00Z",
  "updatedAt": "2023-06-16T11:45:00Z",
  "name": "Smartphone X"
}
```

일관성있는 날짜와 시간 형식

- 예시: 모든 날짜와 시간 필드에 ISO 8601 UTC 표준 적용

```json
{
  "createdAt": "2023-07-01T12:00:00Z",
  "updatedAt": "2023-07-02T14:30:00Z",
  "scheduledFor": "2023-07-10T09:00:00+09:00" // UTC보다 9시간 빠른 한국 시간 표시
}
```

일관성있는 메타데이터 제공

- 예시: 페이지네이션 정보를 포함한 메타데이터

```json
{
  "status": "success",
  "data": [
    // 아이템 배열
  ],
  "metadata": {
    "page": 2,
    "perPage": 20,
    "totalItems": 157,
    "totalPages": 8
  },
  "requestId": "req_abc123"
}
```

## 17-2. 에러 핸들링

- 잘 디자인된 에러 응답은 개발자가 빠르게 이슈를 식별하고 해결하게 도와줘서 개발자 경험을 개선한다

### 적절한 HTTP 상태 코드 사용

- 2xx: 요청 성공
  - 200 OK
  - 201 Created
- 4xx: 클라이언트 에러
  - 400: Bad Request
  - 404: Not Found
- 5xx: 서버 에러
  - 500: Internal Server Error

### 상세한 에러 메시지 제공

- 무엇이 잘못되었는지, 어떻게 수정해야 하는지 충분한 정보를 제공해야 한다
- 민감한 정보들이 노출되지 않게 주의한다
- 예시: 에러 페이로드

```json
{
  "status": "error",
  "message": "Invalid email format",
  "code": "INVALID_EMAIL",
  "details": "Provided email 'johndoe@example' is missing a domain"
}
```

### 일관성있는 에러 메시지 구조 사용

- 에러 응답이 일관적이면 프로그래밍적으로 에러 응답을 파싱하고 에러를 처리할 수 있다

### 고유한 에러 코드 포함

- 가능하다면 각 에러에 대해 고유한 코드를 할당하라. 특정한 에러 시나리오를 쉽게 식별하고 처리할 수 있다.
- 예시: 잔액 부족(INSUFFICIENT_FUNDS)

```json
{
  "status": "error",
  "message": "Insufficient funds",
  "code": "INSUFFICIENT_FUNDS",
  "details": "Your account balance is $50, but the transaction requires $100"
}
```

### validation 에러 처리

- 여러 필드를 포함한 요청에 대해서는 모든 validation 에러를 한 번에 전달하라. 불필요한 API 호출을 막을 수 있다.
- 예시: 2개의 다른 필드에 대한 validation error

```json
{
  "status": "error",
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}
```

## 17-3. 문서화

### 명확한 개요(overview) 만들기

- API 목적, 주요 기능, 인증 메서드, Base URL, 버전 정보, 유스 케이스, 예시 시나리오 등을 포함
- 예시

```
Example E-commerce API를 사용하면 개발자들은 우리 제품 카탈로그, 주문 관리, 고객 데이터를 그들의 애플리케이션에 통합할 수 있다. 모든 API 요청의 Base URL은 https://api.example.com/v1 이며 인증을 위해서는 OAuth 2.0을 사용한다.
```

### 상세한 엔드포인트 문서

- HTTP 메서드, 전체 URL, 엔드포인트 목적, 요청 매개변수(url, query, header, body), 응답 형식 및 가능한 상태 코드를 포함
- 엔드포인트가 실제로 작동하는 방식을 포함

### 코드 샘플 포함

- API를 사용하는 방법

### 인증에 대한 설명

- API 키, 토큰을 받는 방법, 요청에 인증을 포함하는 방법 포함

## 17-4. 버저닝(Versioning)

- 새로운 기능과 개선사항을 도입하면서 하위 호환성을 유지할 수 있다

### 버저닝 전략

1.URL 버저닝

- Base URL에 버전 번호를 포함
- 가장 직관적이고 널리 사용되는 방식
- 예시

```
GET /v1/users/123
GET /v2/users/123
```

2.쿼리 파라미터 버저닝

- 요청 URL에 버전 번호를 포함
- Base URL을 깔끔하게 유지할 수 있지만, 놓치기 쉽고 캐싱 전략이 복잡해질 수 있다
- 예시

```
GET /users/123?version=1
GET /users/123?version=2
```

3.헤더 버저닝

- 커스텀 HTTP 헤더에 API 버전 지정
- 버전 관리와 URI를 분리할 수 있지만, 놓치기 쉽고 브라우저에서 테스트가 어려울 수 있다
- 예시

```
GET /users/123
Header: API-Version: 1
```

## 17-5. 보안

### 인증(Authentication)

- 사용자나 서비스의 신원을 검증하여 합법적인 사용자들만 API가 제공하는 데이터나 기능에 접근할 수 있게 해준다
- 예: 로그인에 성공하면 인증을 통과했다는 의미로 토큰 발급

아래 방법들을 주로 사용한다

- API 키: 간단한 애플리케이션에 사용
- OAuth 2.0: 위임된 접근을 요구하는 복잡한 시나리오에 사용
- JWT(JSON Web Token): 상태를 갖지 않는 인증에 사용
  - 예시: Node.js 서버에서 JWT를 사용하는 간단한 인증 엔드포인트

```js
// 인증 엔드포인트
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 사용자가 존재하고, 비밀번호가 올바른지 확인한다.
  const user = findUserByUsername(username);
  if (user && verifyPassword(password, user.hashedPassword)) {
    // JWT 토큰을 생성하고 전송한다.
    const token = generateJWT(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});
```

### 인가(Authorization)

- 사용자나 서비스가 액션을 수행하거나 데이터에 접근할 수 있는 올바른 권한을 가지고 있음을 보장한다
- 예: 유효한 토큰을 갖고 있는 사용자에게 protected route에 접근 허가
  - 예시: Node.js 서버의 protected route에 접근하기 위해 클라이언트는 요청에 토큰을 포함
  - 서버 미들웨어가 요청이 라우터에 접근하기 전에 토큰을 검증

```js
// 허가를 필요로 하는 보호된 라우트
app.get("/api/protected-resource", authenticateToken, (req, res) => {
  // 사용자가 필요한 권한을 갖고 있는지 확인한다.
  if (req.user.role === "admin") {
    // 보호된 리소스에 대한 접근을 제공한다.
    res.json({
      data: "This is sensitive information",
    });
  } else {
    res.status(403).json({
      error: "Insufficient permissions",
    });
  }
});

// JWT 토큰을 인증하기 위한 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "No token provided" });

  verifyJWT(token, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}
```

### 보안 헤더

- 서버에서 보안 헤더를 설정하면 클릭재킹, XSS(cross-site scripting) 공격, SQL injection 공격 등으로부터 API를 보호할 수 있다
- 헤더에 `Content-Security-Policy`, `Content-Type`, `Strict-Transport-Security` 같은 항목을 포함
- 예시

```js
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
});
```

### validation & sanitization

- validation: 입력되는 데이터가 기대하는 타입이나 값의 범위인지를 확인
- sanitization: 입력값의 특수문자를 제거하거나 순수 문자열로 변환해 입력값이 악성 코드일 경우 앱을 공격하는 것을 방지

### CORS

- 교차 출처 리소스 공유(CORS): 웹 페이지의 리소스를 자신의 origin이 아닌 다른 origin에서 요청되는 것을 허용하거나 제한하는 정책
- API와 모던 웹 애플리케이션(클라이언트)이 도메인 분리되는 경우가 많으므로 중요

### 레이트 리밋(rate limit)

- 레이트 리밋을 구현하여 API의 남용이나 DoS(서비스 거부) 공격 가능성을 방지할 수 있다
- 지정 시간 이내에 클라이언트가 요청할 수 있는 요청 횟수를 제한한다
