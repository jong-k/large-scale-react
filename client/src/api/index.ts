// 검색 API
export const getData = async (params: string) => {
  try {
    const res = await fetch(`http://localhost:4000/sick/?q=${params}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
