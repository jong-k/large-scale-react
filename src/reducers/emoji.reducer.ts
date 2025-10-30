export interface EmojiState {
  name: string;
  value: string;
}

export type EmojiAction = { type: "CHANGE_EMOJI"; payload: EmojiState };

export const emojiReducer = (state: EmojiState, action: EmojiAction) => {
  if (action.type === "CHANGE_EMOJI") return { ...state, ...action.payload };
  throw new Error("Unhandled action type in emojiReducer");
};
