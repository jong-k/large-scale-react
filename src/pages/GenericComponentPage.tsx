import DataTable from "../components/base/DataTable";

const USER_DATA = [
  { id: "a", name: "Park", email: "abc@gmail.com", age: 12 },
  { id: "b", name: "Kim", email: "abcde@gmail.com", age: 22 },
];

const PRODUCT_DATA = [
  { id: "app", name: "Apple", price: 200 },
  { id: "bag", name: "Bag", price: 500 },
  { id: "cup", name: "Cup", price: 300 },
];

export default function GenericComponentPage() {
  return (
    <div>
      <h2>제네릭 컴포넌트</h2>
      <div>
        <h2>User Data Table</h2>
        <DataTable data={USER_DATA} />
      </div>
      <div>
        <h2>User Data Table</h2>
        <DataTable data={PRODUCT_DATA} />
      </div>
    </div>
  );
}
