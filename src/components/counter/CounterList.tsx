import { useFetchCounters } from "../../hooks/useFetchCounters";
import Counter from "./Counter";

export default function CounterList() {
  const { counters } = useFetchCounters();
  console.log("🚀 ~ CounterList ~ counterItems:", counters);

  return (
    <div>
      <h2>Counter List</h2>
      {counters.map((counterItem) => (
        <Counter key={counterItem.id} counterItem={counterItem} />
      ))}
    </div>
  );
}
