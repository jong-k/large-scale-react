import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>
        Counter: <span>{count}</span>
      </h2>
      <button style={{ width: "2rem" }} onClick={increment}>
        +
      </button>
      <button style={{ width: "2rem" }} onClick={decrement}>
        -
      </button>
    </div>
  );
}
