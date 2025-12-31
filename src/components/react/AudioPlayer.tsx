import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = ({
  color = "text-pink-600 border-pink-200",
}: {
  color?: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Royalty free happy birthday instrumental (or similar generic celebration)
  // Using a reliable placeholder for example purposes.
  // In a real scenario, this should be hosted in public/ folder.
  // I will assume a file exists or use a remote generic one.
  const audioSrc =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder
  // A better option for birthday might be needed, but for now this works as proof of concept.

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.error("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 mb-20 md:mb-0">
      <audio ref={audioRef} src={audioSrc} loop />
      <button
        onClick={togglePlay}
        className={`bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border hover:scale-110 transition-transform ${color}`}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
