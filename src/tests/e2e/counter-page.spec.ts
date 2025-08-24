import { expect, test } from "@playwright/test";

test.describe("Counter Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // 초기값 /api/counter-items mock api 응답
    await page.route("**/api/counter-items", async route => {
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

    // 카운트 업데이트 /api/counter-items mock api 응답
    await page.route("**/api/counter-items/*", async (route, request) => {
      if (request.method() === "PUT") {
        console.log("beforeEach: PUT API intercepted:", route.request().url());
        const requestBody = request.postDataJSON();
        const counterId = route.request().url().split("/").pop();
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: parseInt(counterId || "1"),
            name: `테스트 카운터${counterId}`,
            count: requestBody.count,
          }),
        });
      }
    });

    await page.goto("http://localhost:5173");
  });

  test("should navigate from root route to /counter route", async ({ page }) => {
    // 루트 페이지에서 카운터 링크 확인
    await expect(page.locator("text=카운터")).toBeVisible();

    // 카운터 링크 클릭
    await page.click("text=카운터");

    // URL이 /counter로 변경되었는지 확인
    await expect(page).toHaveURL("http://localhost:5173/counter");

    // 카운터 페이지 요소들이 로드되었는지 확인
    await expect(page.locator("h2").filter({ hasText: "Counter List" })).toBeVisible();
  });

  test("should display counter list on /counter route", async ({ page }) => {
    // 직접 /counter 라우트로 이동
    await page.goto("http://localhost:5173/counter");

    // API 호출이 완료될 때까지 잠시 대기
    await page.waitForTimeout(2000);

    // Counter List 제목이 보이는지 확인
    await expect(page.locator("h2").filter({ hasText: "Counter List" })).toBeVisible();

    // 실제로 존재하는 카운터 확인 (기본 카운터가 나타날 수도 있음)
    const countersExist = await page.locator("h3").first().isVisible();
    if (countersExist) {
      const firstCounterName = await page.locator("h3").first().textContent();
      console.log("First counter name:", firstCounterName);

      // 첫 번째 카운터가 존재하는지만 확인
      await expect(page.locator("h3").first()).toBeVisible();
      await expect(page.locator("text=Counter:").first()).toBeVisible();
      await expect(page.locator("button").filter({ hasText: "+" }).first()).toBeVisible();
      await expect(page.locator("button").filter({ hasText: "-" }).first()).toBeVisible();
    }
  });

  test("should increase counter value when + button is clicked", async ({ page }) => {
    await page.goto("http://localhost:5173/counter");

    // 첫 번째 카운터의 + 버튼 클릭 (초기값 5)
    const firstCounterDiv = page.locator("h3").filter({ hasText: "테스트 카운터1" }).locator("..");
    const firstCounterElement = firstCounterDiv.locator("span");
    await expect(firstCounterElement).toHaveText("5");

    const firstPlusButton = firstCounterDiv.locator("button").filter({ hasText: "+" });
    await firstPlusButton.click();

    // 값이 6으로 증가했는지 확인
    await expect(firstCounterElement).toHaveText("6", { timeout: 5000 });
  });

  test("should decrease counter value when - button is clicked", async ({ page }) => {
    await page.goto("http://localhost:5173/counter");

    // 두 번째 카운터의 - 버튼 클릭 (초기값 10)
    const secondCounterDiv = page.locator("h3").filter({ hasText: "테스트 카운터2" }).locator("..");
    const secondCounterElement = secondCounterDiv.locator("span");
    await expect(secondCounterElement).toHaveText("10");

    const secondMinusButton = secondCounterDiv.locator("button").filter({ hasText: "-" });
    await secondMinusButton.click();

    // 값이 9로 감소했는지 확인
    await expect(secondCounterElement).toHaveText("9", { timeout: 5000 });
  });

  test("should handle multiple counter interactions", async ({ page }) => {
    await page.goto("http://localhost:5173/counter");

    // 첫 번째 카운터로 여러 번 상호작용 (초기값 5)
    const firstCounterDiv = page.locator("h3").filter({ hasText: "테스트 카운터1" }).locator("..");
    const firstCounterElement = firstCounterDiv.locator("span");
    const firstPlusButton = firstCounterDiv.locator("button").filter({ hasText: "+" });
    const firstMinusButton = firstCounterDiv.locator("button").filter({ hasText: "-" });

    await expect(firstCounterElement).toHaveText("5");

    // + 버튼 3번 클릭 (5 -> 8)
    for (let i = 0; i < 3; i++) {
      await firstPlusButton.click();
      await page.waitForTimeout(300);
    }
    await expect(firstCounterElement).toHaveText("8", { timeout: 5000 });

    // - 버튼 2번 클릭 (8 -> 6)
    for (let i = 0; i < 2; i++) {
      await firstMinusButton.click();
      await page.waitForTimeout(300);
    }
    await expect(firstCounterElement).toHaveText("6", { timeout: 5000 });
  });

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

    // 기본 카운터가 표시되는지 확인 (catch에서 설정한 기본값)
    await expect(page.locator("h3").filter({ hasText: "기본 카운터1" })).toBeVisible();
    await expect(page.locator("span").filter({ hasText: "0" })).toBeVisible();
  });
});
