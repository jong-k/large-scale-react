import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const onChangeLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const onSubmitLoginInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:3000", loginInfo);
      console.log(loginInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <h2 className="text-center">
        <span className="uppercase">post</span> request
      </h2>
      <form className="form" onSubmit={onSubmitLoginInfo}>
        <div className="row">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={onChangeLoginInfo}
          />
        </div>
        <div className="row">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={onChangeLoginInfo}
          />
        </div>
        <button className="btn btn-block">로그인</button>
      </form>
    </section>
  );
}
