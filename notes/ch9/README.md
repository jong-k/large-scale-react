# ch9. 코드 조직화하기

잘 조직화된 코드베이스는 잘정리된 도서관과 같다

- 필요한 코드가 예상 가능한 위치에 존재하여 개발자들이 쉽게 찾기 가능
- 시간이 지남에 따라 코드베이스의 유지보수성, 확장성을 높이고 협업을 증진하는데 도움이 된다

## 9-1. 폴더와 파일 구조

- 잘 조직화된 폴더와 파일 구조는 대규모 리액트 애플리케이션을 유지하는데 필수적이다

### 루트 수준 폴더

src/

- 애플리케이션의 본체가 위치
- 컴포넌트, 애셋, 유틸리티, 구성 파일 등

public/

- 애플리케이션에 필요하지만 빌드 프로세스에 반드시 필요하지 않은 정적 파일들
- index.html 파일, 이미지 및 웹서버로부터 직접 제공되는 코드가 아닌 파일들

tests/

- 테스팅 구성 파일들

build/ (또는 dist/ 처럼 다른 이름)

- 빌드 도구에 의해 생성된 파일 및 배포를 위해 컴파일된 코드
- JS 번들 파일, 최적화된 이미지, 컴파일된 CSS 등

docs/

- 아키텍쳐 의사 결정, 컴포넌트 사용 가이드 등의 문서
- 애플리케이션의 중요한 부분, 아키텍쳐 다이어그램, API 사용 가이드 등의 markdown 파일

### src/ 디렉토리

- 애플리케이션의 소스코드 파일이 위치

src/ 디렉토리 내부 콘텐츠

- components/: 기능 혹은 도메인에 의해 조직화된 모든 재사용 가능한 컴포넌트
- pages/: 개별 라우트를 나타내는 최고 수준 컴포넌트
- hooks/: 재사용 가능한 로직(데이터 페칭 또는 상태 관리)을 캡슐화한 커스텀 훅
- services/: 외부 서비스(API 클라이언트 또는 다른 통합)
- store/: (전역 상태 관리) 중앙 집중화된 상태 관리 설정 및 액션, 리듀서, 미들웨어 등 (Redux 기준)
- utils/: 유틸리티 함수와 공통 헬퍼 모듈
- assets/: 정적 애셋(이미지, 아이콘, 폰트, 스타일 등)
- constants/: 상수(API 엔드 포인트, config 값 또는 Enum 등)
- types/: TypeScript 코드베이스를 위한 공통 타입 및 인터페이스

### 기능/도메인 기반 조직화

/src 디렉토리 내부를 기능/도메인에 따라 조직화할 수도 있다

- 예시: src/features/ 아래에 Authentication, UserProfile 등의 기능 기반으로 조직화

```
src/
  features/
    Authentication
      components/
        LoginForm.tsx
        SignUpForm.tsx
      hooks/
        useAuth.ts
      services/
        authService.ts
    UserProfile
      components/
        ProfileCard.tsx
      hooks/
        useUserProfile.ts
  ...
```

## 9-2. 명명 규칙

컴포넌트

- 파스칼 케이스 사용
- 예: SideBar.tsx

훅

- 커스텀 훅의 접두사로 use 사용하고 이후 이름에 카멜 케이스 사용
- 예: useFetchData.ts

서비스

- 카멜 케이스 사용하고 서비스나 도메인 이름 포함
- 예: authService.ts

유틸리티

- 카멜 케이스 사용하고 유틸리티의 목적을 설명
- 예: arrayHelper.ts

## 9-3. Barrel Export

- 한 모듈의 여러 export를 하나의 편리한 모듈로 집약하여 다른 부분에서 import를 단순화
- barrel export를 적용하려면, 컴포넌트를 default export 대신 named export 해야 함
- 예시

```tsx
// .../Authentication/components/index.ts
export { LoginForm } from "./LoginForm.tsx";
export { SignUpForm } from "./SignUpForm.tsx";
```

- import 단순화

```tsx
// .../Authentication/Authentication.tsx

// before
// import { LoginForm } from "./components/LoginForm";
// import { SignUpForm } from "./components/SignUpForm";

// after
import { LoginForm, SignUpForm } from "./components";
```

성능 문제

- barrel export는 깔끔하고 통합된 import를 가능하게 해주지만, 파일 갯수가 너무 커지지 않게 주의해야 함
- barrel export가 너무 많아지면, 애플리케이션 성능이나 빌드 문제를 야기할 수 있음

## 9-4. 그밖의 Best Practice

### 코드 모듈화

- 컴포넌트, 함수, 서비스들을 작고 재사용 가능한 모듈로 나누기
- DRY 원칙을 지키면서 코드를 쉽게 테스트하고 리팩터링할수 있게 해줌

React 컴포넌트 관점

- 규모가 작고 해당 작업에 집중하는 컴포넌트를 만들어야 한다
- 컴포넌트 상태와 로직을 캡슐화
  - hook을 사용하여 가독성을 높일 수 있음

### 명확한 관심사의 분리

- 관심사의 분리(Separation of Concerns): 각 모듈, 컴포넌트, 함수가 구별된 책임을 갖게 하는 것

SoC 달성 전략

1.계층화된 아키텍쳐를 갖추기

- Container/Presentational 패턴 등을 활용하여, 코드를 프레젠테이션, 로직, 데이터 등으로 계층화
- 프레젠테이션: 컴포넌트, 로직: 훅이나 유틸 함수, 데이터: 상태 관리 도구 혹은 API 호출

  2.사이드 이펙트를 피하기

- 함수 혹은 컴포넌트의 사이드 이펙트를 피하고, 반드시 필요한 경우에는 명시하기
- 순수 함수를 사용하여 테스트 이점 누리기

  3.외부 의존성 분리하기

- 외부 서비스 혹인 API를 컴포넌트에서 직접 호출하는 대신 서비스 계층이나 어댑터 사용하기
- 유지보수하기가 쉬워져서 나중에 외부 서비스를 쉽게 변경할 수 있다

### 프레젠테이션 로직과 데이터 페칭 로직을 분리

- 컴포넌트 내에서 직접 데이터를 페칭하지 않고, 데이터 페칭을 전담하는 커스텀 훅 만들기

### CSS

- 스타일의 범위를 특정 컴포넌트로 한정하여 예기치 못한 사이드 이펙트 방지
- 공통 디자인 패턴을 위한 재사용 가능한 CSS 클래스 혹은 스타일 컴포넌트 만들기

### 단위 테스트와 통합 테스트 구현

- 테스트 가능한 코드를 작성하려면 컴포넌트나 함수가 단일 책임을 가져야 함
  - 이 과정에서 컴포넌트가 함수가 모듈화됨
- 테스트를 통해 버그를 조기에 잡아내고 애플리케이션이 기대한 대로 작동함을 보장할 수 있음

### 정기적인 리팩터링

code smell 을 식별하고 수정

- 코드베이스에서 복잡한 컴포넌트, 중복된 코드, 강결합된 컴포넌트 등을 찾아 수정하기

점진적 개선

- 대규모 리팩터링 보다는 일상 업무와 병행하는 작고, 점진적인 개선이 좋다
