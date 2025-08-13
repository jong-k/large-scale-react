# ch.15 타입스크립트

- 런타임 이전에 (컴파일 타임에) 타입을 체크하는 자바스크립트의 슈퍼셋

## 15-1. 타입 안전성

### 정적 타이핑

변수에 대해 고정된 데이터 타입 강제

- JavaScript: X (약 타입 언어)
  - 장점: 유연한 코드 작성 가능
  - 단점: 버그 발생
- TypeScript: O (강 타입 언어)
  - 장점: 쉬운 유지보수, 안전성, 예측 가능성, 코드 이해가 쉬움

## 15-2. 빌드 도구와 타입스크립트

- 타입스크립트 자체는 브라우저가 이해하지 못하기 때문에 유효한 자바스크립트로 컴파일 과정 필요
- Vite나 Webpack같은 빌드 도구가 컴파일 과정을 수행
  - esbuild나 ts-loader 를 활용하여 JS -> TS 트랜스파일링
- Vite, Next.js 같은 React 프레임워크는 기본적으로 TypeScript를 지원하여, 별도로 Webpack이나 Vite 에서 TS 설정할 필요 없음
  - tsconfig.json 만 만들어주면 됨

## 15-3. 구성과 린팅

### tsconfig.json

- 타입스크립트 애플리케이션의 루트에 생성
- 타입스크립트 컴파일러가 프로젝트를 컴파일하는데 사용하는 옵션 안내

```js
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "jsx": "react",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true, // 생성된 코드에서 ES6 스타일 import/export 를 허용
    "skipLibCheck": true, // 선언 파일(.d.ts)에 대한 타입 체킹을 스킵
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 15-4. 리액트 + 타입스크립트

### children 타이핑

- 리액트에서 children은 jsx 엘리먼트를 props로 받아 렌더링할 때 사용한다
- children prop은 React.ReactNode 로 쉽게 타이핑할 수 있다
  - React.ReactNode: 모든 유효한 리액트 jsx 엘리먼트로 렌더링 가능한 것들을 포함
  - 예) 문자, 숫자, 배열, 프래그먼트, jsx 등
- 또는 React.ReactElement 를 사용하여 더 엄격하게 타이핑할 수도 있다
  - React.ReactElement: 오직 jsx 엘리먼트에만 사용할 수 있다
- 예시

```tsx
interface HotWrapperProps {
  children: [React.ReactElement]; // 배열 형태로 타입 지정도 가능
}

export default function HotWrapper({ children }: HotWrapperProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
      }}
    >
      {children}
    </div>
  );
}
```

### 제네릭 컴포넌트

- 제네릭(generic): 단일 타입이 아닌 다양한 타입에 대해 작동하는 재사용 가능한 함수를 만드는 기능

- 예시: 테이블 컴포넌트에 제네릭 타입을 props로 사용하여 다양한 형태의 데이터 활용

```tsx
/* 제네릭 컴포넌트의 T 타입에 다양한 타입이 올 수 있음
예1.
interface UserData {
  id: string;
  name: string;
  email: string;
  age: number;
}

예2.
interface ProductData {
  id: string;
  name: string;
  price: number;
}
*/
interface DataTableProps<T> {
  data: Array<T>;
}

export default function DataTable<T extends object>({
  data,
}: DataTableProps<T>) {
  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col as string}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: T, index: number) => (
          <tr key={index}>
            {columns.map((col, idx) => (
              <td key={idx}>{String(item[col as keyof T])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## 15-5. 선언 파일들

- 타입스크립트로 프로젝트를 진행중인데, 필요한 라이브러리가 JavaScript로만 작성되어 있다면 그냥 사용할 수 없다
- 타입스크립트 선언 파일(.d.ts)을 사용하면 문제를 해결할 수 있다

선언 파일(declaration file)

- .d.ts 확장자를 가짐
- 타입을 선언하기만 하고 구현은 없음
- 라이브러리의 함수, 클래스, 변수에 관한 타입 정보 포함

타입을 갖지 않는 라이브러리를 임포트해서 사용하는 경우, 커스텀 선언 파일을 만들거나, DefinitelyTyped 저장소에서 선언 파일을 임포트할 수 있다

DefinitelyTyped

- JavaScript 라이브러리에 대해 TypeScript 선언 파일을 제공하며, 바로 임포트해서 사용할 수 있다
- 커뮤니티에 의해 관리되며 누구나 타입 정의를 추가하거나 개선할 수 있다
- 예) @types/react 라이브러리

커스텀 선언 파일

- 새로운 .d.ts 파일을 만들어 누락된 JavaScript 구현에 대한 타입을 작성한다
- tsconfig.json 파일의 include 옵션이 커스텀 선언 파일 경로를 포함하게 한다

## 15-6. API 결과에 타입 자동 생성

- API 요청, 응답값의 타입을 자동 생성하면 수작업이 줄어들어 유지보수가 쉬워진다
- API로부터 타입을 자동으로 생성하는 여러 도구들이 있다

### GraphQL

- GraphQL은 강타입 언어로, 스키마(데이터) 구조가 이미 잘 정의되어 있다
- GraphQL 스키마 예시

```gql
type User {
  id: ID!
  name: String!
}

type Query {
  getUser(id: ID!): User
}

type Mutation {
  createUser(name: String!): User!
}
```

- GraphQL Code Generator 를 사용하면 지정된 스키마를 기준으로 타입을 생성해준다
- 자동 생성한 타입 예시

```ts
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getUser?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser?: Maybe<User>;
};

export type QueryGetUserArgs = {
  id: Scalars["ID"];
};

export type MutationCreateUserArgs = {
  name: Scalars["String"];
};
```

### REST API

- API가 OpenAPI 같은 명세를 사용하여 기술되어 있다면, 이를 사용해 타입을 생성할 수 있다

OpenAPI

- JSON, YAML 포맷을 사용해 RESTful API를 기술하는 표준적인 방식
- 엔드포인트, 요청, 응답 타입 등의 정보를 포함해 기술한다
- 예시: YAML 포맷의 OpenAPI 3.1.0 명세

```yaml
openapi: 3.1.0
info:
  title: User API
  version: 1.0.0
paths:
  /user:
    get:
      operationId: getUser
      parameters:
        - name: id
          in: query
          schema:
            type: string
          responses:
            "200":
              description: Successful response
    post:
      operationId: createUser
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
        responses:
          "201":
            description: User created
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
```

- openapi-generator 를 활용하면 OpenAPI 명세로부터 타입을 자동 생성할 수 있다
- 예시

```ts
export interface User {
  id: string;
  name: string;
}

export interface GetUserParameters {
  id: string;
}

export interface CreateUserBody {
  name: string;
}
```

### gRPC

- 고성능 오픈소스 원격 프로시저 호출(remote procedure call, RPC) 프레임워크이며, 구글이 처음 개발
- 전송에 HTTP/2를 사용하고, 인터페이스 기술로는 Protocol Buffer(protobuf)를 사용
- protobuf는 언어에 구애받지 않는 binary 직렬화 포맷이며 구글이 개발

gRPC Web

- 브라우저 클라이언트용으로 gRPC를 자바스크립트로 구현
- ts-proto 라이브러리를 사용하면 protobuf(.proto 파일)로 타입을 자동 생성할 수 있다
