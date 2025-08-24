import { useEffect, useState } from "react";
import type { CounterItem } from "../types/counter";

export const useFetchCounters = () => {
  const [counters, setCounters] = useState<CounterItem[]>([]);

  useEffect(() => {
    fetch("/api/counter-items")
      .then(res => res.json())
      .then(data => setCounters(data))
      .catch(() => setCounters([{ id: 1, name: "기본 카운터1", count: 0 }]));
  }, []);

  return { counters };
};
