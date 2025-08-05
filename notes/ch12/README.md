# ch.12 테스팅

- 테스팅: 애플리케이션이 기대한 대로 작동하고 모든 기능적/비기능적 요구사항을 만족함을 보장하는 것

## 12-1. 단위 테스트

단위 테스트(unit test)

- 애플리케이션의 (코드베이스와 격리된) 개별 컴포넌트 또는 기능 검증에 초점
- 각 컴포넌트 혹은 함수를 검증
- Jest, React Testing Library 을 대표적으로 사용
  - Jest: JavaScript 테스팅 프레임워크. mocking, code corverage, parallel test execution 등 유용한 여러 기능을 제공
  - React Testing Library: 리액트 컴포넌트 테스팅에 특화된 경량 라이브러리. 사용자 경험에 초점을 맞춘 테스트 작성 가능

### 단위 테스트 작성 예시: 간단한 카운터 페이지

필요한 라이브러리

- `jest` - JavaScript 테스팅 프레임워크 (테스트 실행기)
- `@jest/globals` - Jest 전역 함수들 (`describe`, `test`, `expect` 등) 제공
- `@types/jest` - Jest의 TypeScript 타입 정의
- `jsdom` - Node.js에서 DOM API 제공 (브라우저 환경 모방)
- `jest-environment-jsdom` - Jest에서 jsdom 환경 사용 설정
- `@testing-library/react` - React 컴포넌트 렌더링 및 테스트 유틸리티
- `@testing-library/dom` - DOM 요소 쿼리 및 상호작용 유틸리티
- `@testing-library/jest-dom` - DOM 관련 Jest matcher 확장
- `@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`, `babel-jest` - JSX/TypeScript 코드를 Node.js에서 실행 가능하도록 변환
- `ts-node` - TypeScript 설정 파일 (`jest.config.ts`) 실행 지원

설정 파일

- `jest.config.ts` - Jest 테스트 환경 설정
- `.babelrc` - JSX/TypeScript 변환 설정
- `src/setupTests.ts` - 테스트 전역 설정 (Jest DOM matcher 등록)

테스트 진행 과정

1. **테스트 파일 생성** - `CounterPage.test.tsx` 파일 작성
2. **테스트 환경 설정**
   - `render()`: React 컴포넌트를 가상 DOM에 렌더링
   - `screen`: 렌더링된 요소들에 접근하기 위한 쿼리 제공
3. **요소 선택 및 검증**
   - `screen.getByText()`: 텍스트로 요소 찾기
   - `screen.getByRole()`: 역할(role)로 요소 찾기
   - `expect().toBeInTheDocument()`: 요소가 DOM에 존재하는지 검증
4. **사용자 상호작용 시뮬레이션**
   - `fireEvent.click()`: 클릭 이벤트 발생
   - 상태 변화 후 UI 업데이트 확인
5. **테스트 실행** - `pnpm test` 명령어로 모든 테스트 실행

테스트 작성

- src/pages/CounterPage.tsx 참고
- count 값은 span 엘리먼트 내부에 올바르게 표시되며 기본값은 0이다
- count 값은 + 버튼 클릭 시 1 증가한다
- count 값은 - 버튼 클릭 시 1 감소한다

### 정리, 동작, 확인 패턴 (AAA 패턴)

- 단위 테스트를 명확하고 간결한 형태로 구조화하기 위해 널리 받아들여지는 접근법
- 테스트를 정리(arrange), 동작(act), 확인(assert) 의 3단계로 나눈다

1. 정리(arrange)

- 테스트 대상 컴포넌트 혹은 시스템의 초기 단계 설정
- 특정 props를 사용해 컴포넌트를 렌더링하거나, mock 객체를 만들거나 필요한 의존성들을 초기화

2. 동작(act)

- 동작을 수행하거나 사용자 인터랙션 또는 시스템 운영을 시뮬레이션하는 이벤트를 트리거
- 클릭이나 키 입력, 함수 호출, 컴포넌트 상태 업데이트 같은 이벤트 트리거 동작

3. 확인(assert)

- 이전 단계의 동작이 기대한대로 작동했는지 확인
  - assertion을 사용해서 특정 조건이 True인지 확인 
- 어떤 요소가 DOM 안에 존재하는지 확인하거나, 업데이트된 상태값을 기대 결과와 비교하거나, 특정 함수가 적절한 인수와 함께 호출되었는지 검증
