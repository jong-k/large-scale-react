export interface EmojiState {
  name: string;
  value: string;
}

export type EmojiAction = { type: "CHANGE_EMOJI"; payload: EmojiState };

export const emojiReducer = (state: EmojiState, action: EmojiAction) => {
  switch (action.type) {
    case "CHANGE_EMOJI":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error();
  }
};
