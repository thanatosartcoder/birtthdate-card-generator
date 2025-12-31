export type Color = {
  name: string;
  variants: string[];
  value: string;
};

export type BirthdayData = {
  birthday: string;
  color: {
    bgColor: string;
    textColor: string;
    viaColor: string;
  };
  names: string;
  message: string;
  step: number;
  url: string;
  premessage: string;
  secretMessage?: string;
};

export type FormStepOptions = {
  label: string;
  value: string;
};

export type SelectableFormStepOptions = FormStepOptions & {
  background: string;
};

export type FormStepBase = {
  question: string;
};

export type FormStep = FormStepBase &
  (
    | {
        answer: string;
        input: {
          name: string;
          placeholder: string;
        };
        type: "text";
      }
    | {
        type: "selectable";
        name: string;
        options: SelectableFormStepOptions[];
      }
    | {
        type: "textarea";
        name: string;
        placeholder: string;
      }
    | {
        type: "date";
        name: string;
        placeholder: string;
      }
    | {
        type: "colorpicker";
        name: string;
        showVariants?: boolean;
      }
    | {
        type: "multi-field";
        name: string;
        fields: {
          name: string;
          label: string;
          type: "text" | "textarea" | "date" | "colorpicker";
          placeholder?: string;
          showVariants?: boolean;
        }[];
      }
  );
