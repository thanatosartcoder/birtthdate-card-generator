import React, { useRef } from "react";
import { toPng } from "html-to-image";

type Props = {
  elementId: string;
  fileName?: string;
  className?: string;
};

const DownloadButton: React.FC<Props> = ({
  elementId,
  fileName = "tarjeta-cumple.png",
  className = "text-pink-600 border border-pink-200 hover:bg-pink-50",
}) => {
  const isGenerating = useRef(false);

  const handleDownload = async () => {
    if (isGenerating.current) return;

    const element = document.getElementById(elementId);
    if (!element) return;

    isGenerating.current = true;

    try {
      // Using html-to-image which supports modern CSS (variables, oklch, etc) better
      const dataUrl = await toPng(element, {
        cacheBust: true,
        // filter function to exclude elements if needed, not used here
        backgroundColor: "#fff0f5", // light pink background to avoid transparent issues
      });

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      isGenerating.current = false;
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`bg-white font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span className="hidden md:inline">
        {isGenerating.current ? "Generando..." : "Guardar imagen"}
      </span>
    </button>
  );
};

export default DownloadButton;
