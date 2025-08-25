import Counter from "./Counter";
import { useFetchCounters } from "../../hooks/useFetchCounters";
import HotWrapper from "../base/HotWrapper";

export default function CounterList() {
  const { counters } = useFetchCounters();

  return (
    <div>
      <HotWrapper>{[<h2 key={1}>Counter List</h2>]}</HotWrapper>
      {counters.map(counterItem => (
        <Counter key={counterItem.id} counterItem={counterItem} />
      ))}
    </div>
  );
}
