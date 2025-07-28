export default function RtlTextPage() {
  return (
    <div>
      <div>
        <h2>HTML dir="rtl"</h2>
        <p>
          안녕하세요 이 텍스트는 HTML의 dir="rtl" 어트리뷰트가 적용된 문장이
          아닙니다.
        </p>
        <p dir="rtl">
          안녕하세요 이 텍스트는 HTML의 dir="rtl" 어트리뷰트가 적용된
          문장입니다.
        </p>
      </div>
      <div>
        <h2>CSS margin-inline-end</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="./vite.svg"
            alt="vite icon"
            style={{ marginRight: "1rem" }}
          />
          <p>
            안녕하세요 이 텍스트는 HTML의 dir="rtl" 어트리뷰트가 적용된 문장이
            아닙니다. 아이콘의 margin-right가 자연스럽죠.
          </p>
        </div>
        <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="./vite.svg"
            alt="vite icon"
            style={{ marginRight: "1rem" }}
          />
          <p>
            안녕하세요 이 텍스트는 HTML의 dir="rtl" 어트리뷰트가 적용된
            문장입니다. 그런데 아이콘의 margin-right가 부자연스럽죠.
          </p>
        </div>
        <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="./vite.svg"
            alt="vite icon"
            style={{ marginInlineEnd: "1rem" }}
          />
          <p>
            안녕하세요 이 텍스트는 HTML의 dir="rtl" 어트리뷰트가 적용된
            문장입니다. margin inline end를 사용하여 이제 아이콘의 오른쪽 마진이
            자연스럽죠.
          </p>
        </div>
      </div>
    </div>
  );
}
