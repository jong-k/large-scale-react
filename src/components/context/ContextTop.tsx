import { useState } from "react";
import ContextMiddle from "./ContextMiddle";
import { MessageContext } from "../../contexts/MessageContext";

export default function ContextTop() {
  const [message, setMessage] = useState("Hello World!");

  return (
    <MessageContext value={{ message, setMessage }}>
      <div
        style={{
          border: "dashed 2px black",
          padding: "1rem",
          background: "lime",
        }}
      >
        <h2>This is Top Context</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <h3>Context API</h3>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <ContextMiddle />
      </div>
    </MessageContext>
  );
}
