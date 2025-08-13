/* 제네릭 컴포넌트의 T 타입에 다양한 타입이 올 수 있음
예1.
interface UserData {
  id: string;
  name: string;
  email: string;
  age: number;
}

예2.
interface ProductData {
  id: string;
  name: string;
  price: number;
}
*/
interface DataTableProps<T> {
  data: Array<T>;
}

export default function DataTable<T extends object>({
  data,
}: DataTableProps<T>) {
  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col as string}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: T, index: number) => (
          <tr key={index}>
            {columns.map((col, idx) => (
              <td key={idx}>{String(item[col as keyof T])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
