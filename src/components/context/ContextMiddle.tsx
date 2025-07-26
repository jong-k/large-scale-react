import { useReducer } from "react";
import ContextBottom from "./ContextBottom";
import { EMOJI_LIST } from "../../constants/emoji";
import { emojiReducer } from "../../reducers/emoji.reducer";

export default function ContextMiddle() {
  const [emojiState, dispatchEmoji] = useReducer(emojiReducer, EMOJI_LIST[0]);

  return (
    <div
      style={{
        border: "dashed 2px black",
        padding: "1rem",
        background: "orange",
      }}
    >
      <h2>This is Middle Context</h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h3>useReducer</h3>
        <select
          style={{ fontSize: "1.75rem" }}
          onChange={(e) => {
            const name = e.target.value;
            const value =
              EMOJI_LIST.find((emoji) => emoji.name === name)?.value || "";
            dispatchEmoji({ type: "CHANGE_EMOJI", payload: { name, value } });
          }}
        >
          {EMOJI_LIST.map(({ name, value }) => (
            <option key={name} value={name}>
              {value}
            </option>
          ))}
        </select>
        <div style={{ fontSize: "1.75rem" }}>{emojiState.value}</div>
      </div>
      <ContextBottom />
    </div>
  );
}
