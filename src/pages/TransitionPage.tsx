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
