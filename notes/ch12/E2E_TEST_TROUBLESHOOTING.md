# E2E 테스트 문제 해결 가이드

## 발생한 문제와 해결 과정

### 1. API 모킹 실패 문제

**문제 상황:**

- Playwright 테스트에서 `page.route("/api/counter-items", ...)`로 API를 모킹했지만 실제로는 작동하지 않음
- 테스트에서 모킹된 데이터("테스트 카운터1", "테스트 카운터2") 대신 기본 fallback 데이터("기본 카운터1")가 표시됨

**원인 분석:**

- 일반적인 경로 패턴 `/api/counter-items`가 모든 요청을 정확히 캐치하지 못함
- beforeEach에서 설정한 모킹이 개별 테스트에서 제대로 작동하지 않음

**해결 방법:**

```typescript
// 이전 코드 (작동하지 않음)
await page.route("/api/counter-items", async (route) => { ... });

// 해결된 코드 (작동함)
await page.route("**/api/counter-items", async (route) => {
  console.log("beforeEach: API route intercepted:", route.request().url());
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([
      { id: 1, name: "테스트 카운터1", count: 5 },
      { id: 2, name: "테스트 카운터2", count: 10 },
    ]),
  });
});
```

**핵심 포인트:**

- `**/api/counter-items` 패턴 사용으로 더 강력한 라우트 매칭
- console.log 추가로 실제 인터셉트 여부 확인
- beforeEach에서 PUT 요청도 함께 모킹

### 2. Playwright Strict Mode Violation 문제

**문제 상황:**

```
Error: strict mode violation: locator('text=Counter:') resolved to 2 elements
```

**원인 분석:**

- 두 개의 카운터가 렌더링되어 동일한 텍스트/버튼이 여러 개 존재
- Playwright의 strict mode에서는 단일 요소를 기대하는데 복수의 요소가 발견됨

**해결 방법:**

```typescript
// 이전 코드 (에러 발생)
await expect(page.locator("text=Counter:")).toBeVisible();
await expect(page.locator("button").filter({ hasText: "+" })).toBeVisible();

// 해결된 코드
await expect(page.locator("text=Counter:").first()).toBeVisible();
await expect(page.locator("button").filter({ hasText: "+" }).first()).toBeVisible();
```

### 3. DOM Selector 정확성 문제

**문제 상황:**

- 복잡한 필터링에도 불구하고 여전히 multiple elements 에러 발생
- HTML 구조를 정확히 파악하지 못해 잘못된 selector 사용

**실제 HTML 구조:**

```html
<div>
  <h2>Counter List</h2>
  <div>
    <h3>테스트 카운터1</h3>
    <div>Counter: <span>5</span></div>
    <button>+</button><button>-</button>
  </div>
  <div>
    <h3>테스트 카운터2</h3>
    <div>Counter: <span>10</span></div>
    <button>+</button><button>-</button>
  </div>
</div>
```

**해결 방법:**

```typescript
// 이전 코드 (부정확한 selector)
const firstCounterElement = page
  .locator("div")
  .filter({ hasText: "테스트 카운터1" })
  .filter({ hasText: "Counter:" })
  .locator("span");

// 해결된 코드 (정확한 selector)
const firstCounterDiv = page
  .locator("h3")
  .filter({ hasText: "테스트 카운터1" })
  .locator("..");
const firstCounterElement = firstCounterDiv.locator("span");
const firstPlusButton = firstCounterDiv
  .locator("button")
  .filter({ hasText: "+" });
```

**핵심 포인트:**

- h3 태그를 기준점으로 잡고 상위 div로 이동(`locator('..')`)
- 각 카운터의 컨테이너 div를 먼저 찾고, 그 안에서 필요한 요소들 탐색

### 4. API 실패 테스트 구현

**문제 상황:**

- API 실패 시나리오를 테스트하고 싶지만 beforeEach의 성공 모킹이 방해

**해결 방법:**

```typescript
test("should handle API failure and show fallback counter", async ({ page }) => {
  // beforeEach 모킹을 override하여 API 실패 시나리오 생성
  await page.unroute("**/api/counter-items");
  await page.route("**/api/counter-items", async route => {
    console.log("API failure test: Aborting request");
    await route.abort();
  });

  await page.goto("http://localhost:5173/counter");

  // API 호출이 실패하고 catch에서 기본값 설정이 완료될 때까지 대기
  await page.waitForTimeout(2000);

  // 기본 카운터가 표시되는지 확인
  await expect(page.locator("h3").filter({ hasText: "기본 카운터1" })).toBeVisible();
  await expect(page.locator("span").filter({ hasText: "0" })).toBeVisible();
});
```

**핵심 포인트:**

- `page.unroute()`로 기존 모킹 제거
- `route.abort()`로 실제 API 실패 상황 시뮬레이션
- 충분한 대기 시간으로 React state 업데이트 완료 보장

## 디버깅 기법

### 1. 실제 렌더링 상태 확인

```typescript
// 페이지 전체 HTML 출력
const pageContent = await page.content();
console.log("Page HTML:", pageContent);

// 특정 요소들의 텍스트 확인
const h3Elements = await page.locator("h3").all();
for (let i = 0; i < h3Elements.length; i++) {
  const text = await h3Elements[i].textContent();
  console.log(`H3[${i}] text:`, text);
}
```

### 2. API 인터셉트 확인

```typescript
await page.route("**/api/counter-items", async route => {
  console.log("API route intercepted:", route.request().url());
  // ... 모킹 로직
});
```

### 3. 요소 존재 여부 확인

```typescript
const countersExist = await page.locator("h3").first().isVisible();
if (countersExist) {
  const firstCounterName = await page.locator("h3").first().textContent();
  console.log("First counter name:", firstCounterName);
}
```

## 교훈

1. **API 모킹은 강력한 패턴 사용**: `**/path` 형식으로 모든 경우를 커버
2. **DOM 구조 정확히 파악**: 실제 HTML 출력으로 구조 확인 후 selector 작성
3. **Multiple elements 문제는 더 정확한 selector로 해결**: 상위 컨테이너부터 차근차근 접근
4. **디버깅 정보 적극 활용**: console.log로 실제 상태 확인
5. **충분한 대기 시간**: React의 비동기 상태 업데이트를 고려한 타이밍

## 최종 결과

모든 6개 테스트가 정상 통과:

- ✅ should navigate from root route to /counter route
- ✅ should display counter list on /counter route
- ✅ should increase counter value when + button is clicked
- ✅ should decrease counter value when - button is clicked
- ✅ should handle multiple counter interactions
- ✅ should handle API failure and show fallback counter
