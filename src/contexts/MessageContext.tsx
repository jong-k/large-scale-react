import { createContext } from "react";

export interface MessageContextValue {
  message: string;
  setMessage: (message: string) => void;
}

export const MessageContext = createContext<MessageContextValue | undefined>(
  undefined
);
