import { useEffect } from "react";

/**
 * 특정 element가 뷰포트에 진입하면 콜백을 실행하는 커스텀 훅
 * @param target 관찰할 element의 ref
 * @param callback 뷰포트에 진입 시 실행할 함수
 * @param options IntersectionObserver 옵션
 */
export const useIntersectionObserver = (
  target: React.RefObject<Element | null>,
  callback: () => void,
  options?: IntersectionObserverInit
): void => {
  useEffect(() => {
    const node = target.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
    // callback과 options가 바뀌면 observer를 새로 만듦
  }, [target, callback, options]);
};
