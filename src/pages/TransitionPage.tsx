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
