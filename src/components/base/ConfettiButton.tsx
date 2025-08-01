import { useState } from "react";
import Confetti from "react-confetti";

interface ConfettiButtonProps {
  color: string;
  text?: string;
  onClick?: () => void;
}

export default function ConfettiButton({
  text = "Click me!",
  color,
  onClick,
}: ConfettiButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) setClicked(true);
    if (onClick) onClick();
  };
  const onConfettiEnd = () => setClicked(false);

  return (
    <button
      style={{
        background: color,
        fontSize: "1.5rem",
        cursor: "pointer",
        padding: "0.5rem",
      }}
      onClick={handleClick}
    >
      <span style={color === "blue" ? { color: "white" } : {}}>{text}</span>
      {clicked && (
        <Confetti
          gravity={0.5}
          recycle={false}
          onConfettiComplete={onConfettiEnd}
        />
      )}
    </button>
  );
}
