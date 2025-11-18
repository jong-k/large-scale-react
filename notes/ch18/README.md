# ch.18 리액트의 미래

## 18-1. React v19에서 달라지는 것

- 새로운 훅과 API
- 리액트 컴파일러
- 리액트 서버 컴포넌트

## 18-2. 새로운 훅과 API

### 비동기 폼 제출

대부분의 웹 애플리케이션에서는 폼(Form)을 통해 사용자와 상호작용한다.

일반적인 흐름은 다음과 같다.

- 제출용 폼을 만들고
- 폼을 제출했을 때 수행할 비동기 업데이트를 처리한다.

이를 위해 필요한 구현 요소는 다음과 같다.

- 로컬 상태 변경 관리
- 사용자 입력 검증
- 폼 제출과 관련한 다양한 상태(로딩, 성공, 에러 상태 포함) 처리

useTransition

- 비동기 처리 결과로 시간이 걸릴 수 있는 상태 업데이트를 간편하게 처리한다.
- 비동기 처리 중의 로딩 인디케이터, 플레이스홀더 렌더링을 간편하게 관리할 수 있다.

useTransition을 활용한 폼 제출 상태 UI 관리

- TransitionPage.tsx

```tsx
import { useState, useTransition } from "react";

const submitForm = async () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
};

export default function TransitionPage() {
  const [formValue, setFormValue] = useState<{ name?: string; message?: string }>();
  const [isPending, startTransition] = useTransition();

  const formAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await submitForm();
        const name = ((e.target as HTMLFormElement).elements.namedItem("name") as HTMLInputElement)?.value;
        setFormValue({ name });
      } catch {
        setFormValue({ message: "에러 발생" });
      }
    });
  };

  return (
    <div>
      <h2>useTransition 테스트 페이지</h2>
      <form onSubmit={formAction} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label htmlFor="name">이름</label>
        <input id="name" />
        <button>검색</button>
      </form>
      {isPending && <h4>Loading...</h4>}
      {formValue?.message && <h4>{formValue.message}</h4>}
      {formValue?.name ? <h4>검색 결과: {formValue.name}</h4> : <h4>검색 결과가 없습니다.</h4>}
    </div>
  );
}
```

### useActionState 훅

- action: 비동기 transition을 사용하는 함수
- 폼 액션 결과에 기반하여 상태를 업데이트할 수 있다.

매개변수

- 액션 함수: 폼 액션(제출)이 트리거되면 실행된다.
- 초기 상태 객체: 사용자 인터랙션이 발생하기 이전의 상태

반환값

- 폼의 현재 상태
- 폼 액션을 트리거하는 함수
- 액션 진행 여부(대기 상태)

리팩토링: TransitionPage.tsx

- useTransition 및 불필요 state 대신 useActionState 훅 사용
- 부모 Form 의 상태 정보에 접근할 수 있는 useFormStatus 훅 사용

```tsx
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type State = {
  status: "success" | "error";
  name: string;
  message: string;
};

const submitForm = async () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
};

const action = async (currentState: State, formData: FormData): Promise<State> => {
  try {
    await submitForm();
    return { ...currentState, status: "success" as const, name: formData.get("name") as string, message: "" };
  } catch {
    return { ...currentState, status: "error" as const, name: "", message: "에러 발생" };
  }
};

export default function TransitionPage() {
  const [state, dispatch, isPending] = useActionState<State, FormData>(action, {
    status: "success",
    message: "",
    name: "",
  } as State);

  return (
    <div>
      <h2>useTransition 테스트 페이지</h2>
      <form action={dispatch} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label htmlFor="name">이름</label>
        <input id="name" name="name" disabled={isPending} />
        <Button text="검색" />
      </form>
      {isPending && <h4>Loading...</h4>}
      {state?.message && <h4>{state.message}</h4>}
      {state?.name ? <h4>검색 결과: {state.name}</h4> : <h4>검색 결과가 없습니다.</h4>}
    </div>
  );
}

function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? "🔄" : text}</button>;
}
```

## 18-3. 리액트 컴파일러

- 최적화 프로세스를 자동화해 리액트 애플리케이션 성능을 개선하는 것을 목표로 한다.
- 성능 튜닝을 개발자뿐만 아니라 프레임워크도 함께 책임진다.

### 메모이제이션

- 리액트 컴파일러가 컴포넌트 상태 및 props 사용을 분석하여 리렌더링 최적화
- fine-grained reactivity: 상태 변화가 DOM의 특정한 부분에만 영향을 주는지를 식별하고, 실제로 변경되는 부분에 의존하는 컴포넌트들만 리렌더링한다.

### 외부 함수 메모이제이션

- 연산 비용이 큰 외부 함수 호출(컴포넌트 내에서)을 메모이제이션한다.
- 다만 해당 함수 자체의 메모이제이션을 자동으로 구현해 주지는 않는다.
  - 따라서 함수 자체를 효율적으로 만들려면 별도로 메모이제이션을 구현하는 것이 좋다.
- 참고로 `useEffect` 의존성 배열에 대한 메모이제이션은 아직 지원되지 않으므로, 의존성 배열은 직접 꼼꼼히 관리해야 한다.

### 컴파일러의 핵심 가정

리액트 컴파일러의 최적의 성능을 보장하려면 아래 가정들을 지켜야 한다.

- 유효한 시맨틱 자바스크립트
- Nullable 값의 안전한 처리
  - 옵셔널 체이닝을 적극 활용해야 한다.
- 리액트 규칙 따르기
  - 컴포넌트와 훅은 순수해야 한다.
  - 컴포넌트는 멱등성(idempotence)을 가져야 한다.
  - props와 상태는 불변하게 다뤄져야 한다.

## 18-4. 리액트 서버 컴포넌트

- 서버 사이드 렌더링(SSR)을 리액트 아키텍처에 매끄럽게 통합할 수 있다.

### 서버 사이드 렌더링

SSR 작동 예시: 블로그 게시글 페이지에 접속할 때(/blog/:id)

- 브라우저가 특정 페이지를 서버에 요청
- 서버가 초기 요청 처리
  - 페이지의 HTML을 브라우저로 전송
  - 아직 세부적인 블로그 콘텐츠는 가져오지 않음
- 브라우저는 HTML을 받고, Hydration을 진행한 후, API 요청
  - 서버에서 렌더링된 HTML이 브라우저에 먼저 보여지고
  - Hydration으로 이벤트 핸들러, 인터랙션 등의 코드가 애플리케이션에 더해진다.
  - 이후 블로그 상세 데이터를 서버에 요청한다(id 활용).
- 브라우저는 컨텐츠를 동적으로 렌더링
  - API 요청으로부터 받은 데이터를 활용하여 페이지에 표시한다.
  - 이 단계에서는 클라이언트 사이드 렌더링을 사용한다.

### 리액트 서버 컴포넌트

- 상태를 갖지 않는 리액트 컴포넌트를 서버에서 실행되는 형태로 생성할 수 있다.
- 리액트 아키텍처에 서버 사이드 프로세싱을 더한다.
- 특정 계산과 데이터 페칭을 클라이언트에서 서버로 옮길 수 있다.
- 클라이언트에 전달되는 코드 양을 줄이고, 로딩 시간을 개선하면서 전체적인 애플리케이션 성능 개선

예: 블로그 게시글 페이지에 접속할 때(/blog/:id)

- 브라우저는 특정 페이지를 서버에 요청(기존과 동일)
- 서버는 리액트 서버 컴포넌트를 렌더링
  - 기존 HTML 대신 복잡한 요소(데이터 페칭 컴포넌트 포함)
  - 서버에서 컴포넌트 로직 실행, 데이터 페칭 후 렌더링
- 클라이언트는 서버에서 HTML 및 데이터 페칭 이뤄진 컨텐츠를 받음
  - 브라우저가 id를 가지고 서버에 추가 요청을 보낼 필요 없음
  - Hydration 발생
- 브라우저가 최종 컨텐츠 렌더링
  - 클라이언트 사이드 렌더링

서버 컴포넌트 특징

- 클라이언트 사이드 React API 접근 불가
  - 클라이언트 컴포넌트를 만들기 위해서는 파일 최상단에 "use client" 추가
- 비동기 서버 컴포넌트
  - 비동기로 작동할 수 있으며, 이를 활용해 데이터 페칭을 서버에서 실행
- use 훅으로 클라이언트 컴포넌트에서 서버 함수 실행
  - 서버 컴포넌트가 자식 클라이언트 컴포넌트에 props로 promise 내려주고,
  - 서버 함수를 props로 전달받은 클라이언트 컴포넌트에서 use 훅으로 실행

### 서버 액션

- 클라이언트 컴포넌트가 서버사이드 함수를 직접 호출할 수 있다

생성 방법

- 서버 컴포넌트 안에서 "use server" 지시자를 사용해 선언하고, props로 클라이언트 컴포넌트로 내려주거나
- "use server" 지시자를 사용한 별도 파일에서 선언한 함수를 import 한다

### RSC의 이익

성능 개선

- 복잡한 계산과 데이터 페칭을 서버 사이드에서 실행하여 클라이언트에 전달할 JS 코드 양을 줄여 빠른 초기 로딩 속도 효과를 얻을 수 있음
- 특히 느린 네트워크 환경이나 저사양 디바이스에서 효과가 있다

SEO 향상

- 컨텐츠가 이미 검색엔진에서 읽을 수 있는 상태임을 보장하여 검색엔진 가시성을 높임

데이터 페칭 단순화

- 클라이언트 사이드에서 데이터 페칭을 줄여 상태와 데이터 동기화를 관리하는 복잡성을 줄일 수 있다
