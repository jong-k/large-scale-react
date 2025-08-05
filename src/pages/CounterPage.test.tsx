import { render, screen, fireEvent } from "@testing-library/react";
import CounterPage from "./CounterPage";

describe("CounterPage", () => {
  // 기본 렌더링 테스트 - h2 제목 요소가 화면에 렌더링되는지 확인
  test("renders counter heading", () => {
    // Arrange - 컴포넌트 렌더링
    render(<CounterPage />);

    const heading = screen.getByRole("heading", { level: 2 });

    // Assert - 해당 요소가 문서에 존재하는지 확인
    expect(heading).toBeInTheDocument();
  });

  // 초기 상태 테스트 - count 초기값이 0으로 표시되는지 확인
  test("displays initial count value of 0", () => {
    // Arrange - 컴포넌트 렌더링
    render(<CounterPage />);

    const countSpan = screen.getByText("0");

    // Assert - 초기값이 문서에 존재하는지 확인
    expect(countSpan).toBeInTheDocument();
  });

  // 증가 기능 테스트 - + 버튼 클릭 시 count가 1 증가하는지 확인
  test("increments count when + button is clicked", () => {
    // Arrange - 컴포넌트 렌더링 및 초기 상태 확인
    render(<CounterPage />);
    const incrementButton = screen.getByText("+");
    expect(screen.getByText("0")).toBeInTheDocument();

    // Act - + 버튼 클릭
    fireEvent.click(incrementButton);

    // Assert - count가 1로 증가했는지 확인
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  // 감소 기능 테스트 - - 버튼 클릭 시 count가 1 감소하는지 확인
  test("decrements count when - button is clicked", () => {
    // Arrange - 컴포넌트 렌더링 및 버튼 요소 찾기
    render(<CounterPage />);
    const decrementButton = screen.getByText("-");

    // Act - - 버튼 클릭
    fireEvent.click(decrementButton);

    // Assert - count가 -1로 감소했는지 확인
    expect(screen.getByText("-1")).toBeInTheDocument();
  });

  // 복합 연산 테스트 - 여러 버튼 클릭 후 최종 결과가 올바른지 확인 (+2, -1 = 1)
  test("updates count display correctly after multiple operations", () => {
    // Arrange - 컴포넌트 렌더링 및 버튼 요소들 찾기
    render(<CounterPage />);
    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    // Act - 복합 연산 수행 (+ 버튼 2번, - 버튼 1번)
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    // Assert - 최종 결과가 1인지 확인
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
