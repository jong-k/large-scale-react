import { useContext } from "react";
import { ColorSchemeContext } from "../contexts/colorScheme/ColorSchemeContext";

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
};
