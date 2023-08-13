import { useEffect } from "react";
import axios from "axios";

export default function AxiosGlobalInstance() {
  const fetchData = async () => {
    try {
      const { data } = await axios("");
      console.log(data.results[0].email); // 랜덤 이메일
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h2>Axios Global Instance</h2>;
}
