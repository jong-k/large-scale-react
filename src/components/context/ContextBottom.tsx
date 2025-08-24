import { use } from "react";
import { MessageContext, type MessageContextValue } from "../../contexts/MessageContext";

export default function ContextBottom() {
  const { message, setMessage } = use<MessageContextValue>(MessageContext);

  return (
    <div
      style={{
        border: "dashed 2px black",
        padding: "1rem",
        background: "violet",
      }}
    >
      <h2>This is Bottom Context</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div>
          <h3>Context API</h3>
          <input value={message} onChange={e => setMessage(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
