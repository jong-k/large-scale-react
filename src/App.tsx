import Title from "./components/Title";
// import DadJoke from "./components/DadJoke.tsx";
// import LoginForm from "./components/LoginForm.tsx";
import AxiosGlobalInstance from "./components/AxiosGlobalInstance.tsx";

export default function App() {
  return (
    <main>
      <Title />
      {/*<DadJoke />*/}
      {/*<LoginForm />*/}
      <AxiosGlobalInstance />
    </main>
  );
}
