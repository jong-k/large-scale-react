import { useState } from "react";
import axios from "axios";

// const API_URL = "https://icanhazdadjoke.com";

export default function DadJoke() {
  const [joke, setJoke] = useState("여기에 농담이 표시됩니다");

  const fetchJoke = async () => {
    setJoke("Loading...");
    try {
      const { data } = await axios.get("", {
        headers: {
          Accept: "application/json",
        },
      });
      setJoke(data.joke);
    } catch (err) {
      console.log(err);
      setJoke("잠시 후에 다시 시도해주세요");
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center mb-[1rem]">Dad Joke Page</h2>
      <section className="flex flex-col items-center">
        <button
          type="button"
          className="rounded-full bg-sky-400 text-white p-[0.5rem] w-[50%] mb-[1rem]"
          onClick={fetchJoke}
        >
          Random Joke
        </button>
        <p>{joke}</p>
      </section>
    </>
  );
}
