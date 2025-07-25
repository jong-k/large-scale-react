import { createContext } from "react";

export interface MessageContextValue {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const MessageContext = createContext<MessageContextValue>({
  message: "",
  setMessage: () => {},
});
