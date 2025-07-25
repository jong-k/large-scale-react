import ContextBottom from "./ContextBottom";

export default function ContextMiddle() {
  return (
    <div
      style={{
        border: "dashed 2px black",
        padding: "1rem",
        background: "orange",
      }}
    >
      <h2>This is Middle Context</h2>
      <ContextBottom />
    </div>
  );
}
