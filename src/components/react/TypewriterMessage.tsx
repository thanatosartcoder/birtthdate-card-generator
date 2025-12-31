import React, { useState, useEffect } from "react";

type Props = {
  message: string;
  speed?: number;
  className?: string;
};

const TypewriterMessage: React.FC<Props> = ({
  message,
  speed = 150,
  className = "text-slate-900 text-md md:text-2xl text-pretty font-medium min-h-12",
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset text when message changes
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(message.slice(0, i + 1));
      i++;
      if (i > message.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [message, speed]);

  return (
    <p className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
};

export default TypewriterMessage;
