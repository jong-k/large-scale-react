import { useState } from "react";
import type { CounterItem } from "../../types/counter";

interface CounterProps {
  counterItem: CounterItem;
}

export default function Counter({ counterItem }: CounterProps) {
  const [count, setCount] = useState(counterItem.count || 0);

  const updateCount = (num: number) => {
    fetch(`/api/counter-items/${counterItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count: count + num,
      }),
    })
      .then(res => res.json())
      .then(updatedItem => setCount(updatedItem.count))
      .catch(() => setCount(count + num));
  };

  return (
    <div>
      <h3>{counterItem.name}</h3>
      <div>
        Counter: <span>{count}</span>
      </div>
      <button onClick={() => updateCount(1)}>+</button>
      <button onClick={() => updateCount(-1)}>-</button>
    </div>
  );
}
