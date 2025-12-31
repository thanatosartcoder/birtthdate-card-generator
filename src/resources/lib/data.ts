import type { Color, FormStep } from "../../resources/types/form-step.d";

export const colors: Color[] = [
  {
    name: "Rosa",
    value: "pink",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Rojo",
    value: "red",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Naranja",
    value: "orange",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Ámbar",
    value: "amber",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Amarillo",
    value: "yellow",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Lima",
    value: "lime",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Verde",
    value: "green",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Esmeralda",
    value: "emerald",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Turquesa",
    value: "teal",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Cian",
    value: "cyan",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Cielo",
    value: "sky",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Azul",
    value: "blue",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Índigo",
    value: "indigo",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Violeta",
    value: "violet",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Púrpura",
    value: "purple",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Fucsia",
    value: "fuchsia",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
];
export const steps: FormStep[] = [
  {
    question: "Información sobre el cumpleañer@",
    type: "multi-field",
    name: "personal-info",
    fields: [
      {
        name: "names",
        label: "¿Cuál es el nombre del cumpleañer@?",
        type: "text",
        placeholder: "Nombre de la persona",
      },
      {
        name: "url",
        label: "¿Tienes una imagen de esa persona?",
        type: "text",
        placeholder: "Url de la imagen",
      },
    ],
  },
  {
    question: "Diseño de la tarjeta",
    type: "multi-field",
    name: "design",
    fields: [
      {
        name: "color",
        label: "¿Qué color le gusta?",
        type: "colorpicker",
        showVariants: true,
      },
      {
        name: "birthday",
        label: "Fecha del cumpleaños",
        type: "date",
      },
    ],
  },
  {
    question: "Mensajes personalizados",
    type: "multi-field",
    name: "messages",
    fields: [
      {
        name: "premessage",
        label: "Mensaje que salga antes del cumpleaños",
        type: "textarea",
        placeholder: "Premensaje de cumpleaños",
      },
      {
        name: "message",
        label: "Mensaje de cariño para ese ser especial",
        type: "textarea",
        placeholder: "Mensaje de cumpleaños",
      },
      {
        name: "secretMessage",
        label: "Mensaje secreto (opcional)",
        type: "textarea",
        placeholder:
          "Escribe algo que solo verá al hacer clic en un regalo sorpresa...",
      },
    ],
  },
];
