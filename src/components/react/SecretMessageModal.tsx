import React, { useState, useRef, useEffect } from "react";
// Dynamic import used instead for performance

const SecretMessageModal = ({
  secretMessage,
  isBirthdayDay,
  color = "text-pink-600",
}: {
  secretMessage?: string;
  isBirthdayDay: boolean;
  color?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (showAnimation && container.current) {
      Promise.all([
        import("lottie-web"),
        fetch("/lotties/Gift.json").then((res) => res.json()),
      ]).then(([Lottie, animationData]) => {
        animationInstance.current = Lottie.default.loadAnimation({
          container: container.current!,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData,
        });

        // On complete or timeout
        setTimeout(() => {
          setShowAnimation(false);
          setIsOpen(true);
        }, 2500); // 2.5s for animation
      });
    }
    return () => animationInstance.current?.destroy();
  }, [showAnimation]);

  if (!secretMessage) return null;

  const handleClick = () => {
    if (isBirthdayDay) {
      setShowAnimation(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`fixed bottom-4 left-4 z-50 mb-20 md:mb-0 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border hover:scale-110 transition-transform ${color}`}
        aria-label="Abrir mensaje secreto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M20 12v10H4V12" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7H6.5a2.5 2.5 0 0 1 0-5C7.7 2 9 3 9 4.5v2.5" />
          <path d="M12 7h5.5a2.5 2.5 0 0 1 0-5C16.3 2 15 3 15 4.5v2.5" />
        </svg>
      </button>

      {/* Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div ref={container} className="w-64 h-64 md:w-96 md:h-96"></div>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl animate-fade-in-up border-4 border-double border-pink-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-center mb-6 font-heading text-pink-600">
              Un mensaje secreto para ti 🤫
            </h3>
            <div className="p-6 bg-pink-50 rounded-xl border border-pink-100">
              <p className="text-lg text-center font-handwriting leading-relaxed italic text-gray-700">
                "{secretMessage}"
              </p>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-lg"
              >
                ¡Gracias! ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretMessageModal;
