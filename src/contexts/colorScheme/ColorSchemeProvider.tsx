import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ColorSchemeContext, type ColorScheme } from "./ColorSchemeContext";

interface ColorSchemeProviderProps {
  children: ReactNode;
}

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateColorScheme = () => {
      setColorScheme(mediaQuery.matches ? "dark" : "light");
    };

    updateColorScheme();
    mediaQuery.addEventListener("change", updateColorScheme);

    return () => mediaQuery.removeEventListener("change", updateColorScheme);
  }, []);

  return (
    <ColorSchemeContext value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext>
  );
};
