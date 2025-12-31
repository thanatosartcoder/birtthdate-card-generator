import React from "react";
import { format } from "date-fns";

type Props = {
  birthday: string; // YYYY-MM-DD
  names: string;
  className?: string; // Add className prop
};

const CalendarButton: React.FC<Props> = ({
  birthday,
  names,
  className = "text-pink-600 border border-pink-200 hover:bg-pink-50",
}) => {
  const addToCalendar = () => {
    const birthDate = new Date(`${birthday} 00:00:00`);
    const current = new Date();

    // Determine target year
    let targetYear = current.getFullYear();
    const isMonth = current.getMonth() === birthDate.getMonth();
    const isDay = current.getDate() === birthDate.getDate();

    const birthdayThisYear = new Date(
      current.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // Logic:
    // If today is birthday -> Next year (to remember next one)
    // If birthday passed this year -> Next year
    // If birthday hasn't passed -> This year

    if (current.getTime() >= birthdayThisYear.getTime()) {
      targetYear = current.getFullYear() + 1;
    }

    const start = new Date(
      targetYear,
      birthDate.getMonth(),
      birthDate.getDate(),
      9,
      0,
      0
    );
    const end = new Date(
      targetYear,
      birthDate.getMonth(),
      birthDate.getDate(),
      10,
      0,
      0
    );

    const title = `Cumpleaños de ${names}`;
    const details = `¡No olvides saludar a ${names} en su cumpleaños!`;

    const googleUrl = new URL("https://calendar.google.com/calendar/render");
    googleUrl.searchParams.append("action", "TEMPLATE");
    googleUrl.searchParams.append("text", title);
    googleUrl.searchParams.append(
      "dates",
      `${format(start, "yyyyMMdd'T'HHmmss")}/${format(
        end,
        "yyyyMMdd'T'HHmmss"
      )}`
    );
    googleUrl.searchParams.append("details", details);
    googleUrl.searchParams.append("sf", "true");
    googleUrl.searchParams.append("output", "xml");

    window.open(googleUrl.toString(), "_blank");
  };

  const getButtonLabel = () => {
    const birthDate = new Date(`${birthday} 00:00:00`);
    const current = new Date();
    const birthdayThisYear = new Date(
      current.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // Check if birthday passed (ignoring time, strictly date)
    // To do strict comparison without time interference:
    const currentNoTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    );

    if (currentNoTime.getTime() >= birthdayThisYear.getTime()) {
      return "Agendar para el próximo año";
    } else {
      return "Agendar cumpleaños";
    }
  };

  return (
    <button
      onClick={addToCalendar}
      className={`bg-white font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 shadow-sm transition-all ${className}`}
    >
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
      </svg>
      <span className="hidden md:inline">{getButtonLabel()}</span>
    </button>
  );
};

export default CalendarButton;
