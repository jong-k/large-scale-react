import { createContext } from "react";

export type ColorScheme = "dark" | "light";

export interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const ColorSchemeContext = createContext<
  ColorSchemeContextValue | undefined
>(undefined);
