import { useState } from "react";
import ContextMiddle from "./ContextMiddle";
import { MessageContext } from "../../context/message";

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
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <ContextMiddle />
      </div>
    </MessageContext>
  );
}
