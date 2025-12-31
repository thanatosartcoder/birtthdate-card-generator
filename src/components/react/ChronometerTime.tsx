import React from "react";
type ChronometerTimeProps = {
  time: string;
  label: string;
  className?: string;
  textColor?: string;
};
const ChronometerTime: React.FC<ChronometerTimeProps> = ({
  time,
  label,
  className,
  textColor = "text-pink-600",
}) => {
  return (
    <>
      <div className={`flex flex-col gap-3 items-center ${className}`}>
        <span className="p-2 md:p-3 w-14 md:w-24 aspect-square text-game font-bold text-xl md:text-5xl flex justify-center items-center bg-white/40 backdrop-blur-sm shadow-xl rounded-2xl border border-white/60 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
          {time}
        </span>
        <span
          className={`text-sm md:text-xl font-bold tracking-widest ${`${textColor}`} normal-case`}
        >
          {label}
        </span>
      </div>
    </>
  );
};

export default ChronometerTime;
