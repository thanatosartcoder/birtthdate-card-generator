// FormSteps.tsx
import React, { useState, type FormEvent } from "react";
import type { FormStep } from "../../resources/types/form-step";
import BackgroundCircleNotInset from "./BackgroundCircleNotInset";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";
import "./Form-Step.css";
import { format } from "date-fns";
import ColorPicker from "../forms/ColorPicker";

interface Props {
  step: number;
  steps: FormStep[];
  token: string;
  initialData?: any;
}

const FormSteps: React.FC<Props> = ({
  step,
  steps,
  token,
  initialData = {},
}) => {
  const currentStep = steps[step];

  // Initialize from initialData if available
  const [selectedItem, setSelectedItem] = useState<string>(() => {
    if (currentStep.type === "multi-field") return "";

    const name =
      currentStep.type === "text" ? currentStep.input.name : currentStep.name;
    const initialValue = initialData[name];

    if (
      currentStep.type === "colorpicker" &&
      typeof initialValue === "object"
    ) {
      return initialValue.bgColor || "bg-pink-500";
    }

    return initialValue || "";
  });

  const [selectedItems, setSelectedItems] = useState<Record<string, string>>(
    () => {
      const items: Record<string, string> = { ...initialData };

      // Process complex objects (like color) into strings for form inputs
      Object.keys(items).forEach((key) => {
        const val = items[key] as any;
        if (typeof val === "object" && val !== null) {
          if (val.bgColor) items[key] = val.bgColor;
        }
      });

      return items;
    }
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
    const data = new FormData(event?.currentTarget);

    const urlParams = new URLSearchParams();
    let response;

    // Handle multi-field steps
    if (currentStep.type === "multi-field") {
      for (const field of currentStep.fields) {
        if (field.type === "date" && !selectedItems[field.name]) {
          alert("Por favor selecciona una fecha");
          return;
        }
      }

      const values = currentStep.fields.map((field) => {
        let fieldValue = "";

        if (field.type === "text" || field.type === "textarea") {
          fieldValue = (data.get(field.name) as string) || "";
        } else if (field.type === "date" || field.type === "colorpicker") {
          fieldValue = selectedItems[field.name] || "";

          // Set default color if not selected (visual default matches)
          if (field.type === "colorpicker" && !fieldValue) {
            fieldValue = "bg-pink-500";
          }

          if (field.type === "date" && fieldValue) {
            fieldValue = format(
              new Date(`${fieldValue} 00:00:00`),
              "yyyy-MM-dd"
            );
          }
        }

        return {
          key: field.name,
          value: fieldValue,
        };
      });

      response = await fetch("/api/save-form.json", {
        method: "POST",
        body: JSON.stringify({
          token,
          values,
          step,
        }),
      }).then((data) => data.json());
    }
    // Handle single field steps (backward compatibility)
    else {
      let value = "";
      const name =
        currentStep.type === "text" ? currentStep.input.name : currentStep.name;
      if (currentStep.type === "text" || currentStep.type === "textarea") {
        value = data.get(name) as string;
      }
      if (
        currentStep.type === "selectable" ||
        currentStep.type === "date" ||
        currentStep.type === "colorpicker"
      ) {
        value =
          currentStep.type === "date"
            ? format(new Date(`${selectedItem} 00:00:00`), "yyyy-MM-dd")
            : selectedItem;

        // Set default color if not selected
        if (currentStep.type === "colorpicker" && !value) {
          value = "bg-pink-500";
        }
      }

      response = await fetch("/api/save-form.json", {
        method: "POST",
        body: JSON.stringify({
          token,
          key: name,
          value,
          step,
        }),
      }).then((data) => data.json());
    }

    urlParams.set("token", response.newToken);
    if (steps.length - 1 === step) {
      window.location.href = `/preview?${urlParams.toString()}`;
    } else {
      window.location.href = `/questions?${urlParams.toString()}`;
    }
  };

  const setColorByInput = (color: string) => {
    let value2 = "";
    if (currentStep.type === "date") {
      const currentDate = new Date(`${color} 00:00:00`);
      value2 = format(currentDate, "yyyy-MM-dd");
    }
    const selectValue = currentStep.type === "date" ? value2 : color;
    setSelectedItem(selectValue);
  };

  const updateField = (fieldName: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4">
      <div className="gap-8 flex flex-col">
        <h1 className="text-3xl text-balance text-center">
          {currentStep.question}
        </h1>
        <div className="questions flex flex-col gap-3">
          {/* Multi-field step rendering */}
          {currentStep.type === "multi-field" && (
            <div className="space-y-6">
              {currentStep.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    {field.label}
                  </label>

                  {field.type === "text" && (
                    <>
                      <input
                        type="text"
                        name={field.name}
                        className="bg-gray-50 border focus:shadow focus:border-none outline-none focus:shadow-pink-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:border-blue-500 block w-full p-2.5"
                        placeholder={field.placeholder}
                        required
                        value={selectedItems[field.name] || ""}
                        onChange={(e) =>
                          updateField(field.name, e.target.value)
                        }
                      />
                      {/* Image preview for URL field */}
                      {field.name === "url" && selectedItems[field.name] && (
                        <div className="mt-4 flex justify-center">
                          <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
                            <img
                              src={selectedItems[field.name]}
                              alt="Vista previa"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const errorDiv = e.currentTarget
                                  .nextElementSibling as HTMLElement;
                                if (errorDiv) {
                                  errorDiv.classList.remove("hidden");
                                  errorDiv.classList.add("flex");
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gray-100 hidden items-center justify-center">
                              <div className="text-center p-4">
                                <svg
                                  className="w-12 h-12 mx-auto text-gray-400 mb-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <p className="text-sm text-gray-500">
                                  No se pudo cargar la imagen
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {field.type === "textarea" && (
                    <textarea
                      name={field.name}
                      rows={5}
                      className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={field.placeholder}
                      required
                      value={selectedItems[field.name] || ""}
                      onChange={(e) => updateField(field.name, e.target.value)}
                    />
                  )}

                  {field.type === "colorpicker" && (
                    <div className="w-full">
                      <ColorPicker
                        value={selectedItems[field.name] || "bg-pink-500"}
                        onChange={(val) => updateField(field.name, val)}
                        showVariants={field.showVariants ?? true}
                      />
                    </div>
                  )}

                  {field.type === "date" && (
                    <div className="flex justify-center w-full">
                      <DayPicker
                        selected={
                          selectedItems[field.name]
                            ? new Date(`${selectedItems[field.name]} 00:00:00`)
                            : undefined
                        }
                        onSelect={(event) =>
                          updateField(field.name, event?.toDateString() ?? "")
                        }
                        mode="single"
                        locale={es}
                        captionLayout="dropdown"
                        startMonth={new Date(1900, 0)}
                        endMonth={new Date(new Date().getFullYear() + 10, 11)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Single field step rendering (backward compatibility) */}
          {currentStep.type === "text" && (
            <input
              type="text"
              name={currentStep.input.name}
              className="bg-gray-50 border focus:shadow focus:border-none outline-none  focus:shadow-pink-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:border-blue-500 block w-full p-2.5"
              placeholder={currentStep.input.placeholder}
              required
            />
          )}

          {/* Hacer una grid en desktop y mobile un slide */}
          {currentStep.type === "textarea" && (
            <textarea
              id="message"
              rows={5}
              className=" resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name={currentStep.name}
              placeholder={currentStep.placeholder}
            ></textarea>
          )}
          {currentStep.type === "date" && (
            <div className="flex justify-center w-full">
              <DayPicker
                selected={new Date(`${selectedItem} 00:00:00`)}
                onSelect={(event) =>
                  setColorByInput(event?.toDateString() ?? "")
                }
                mode="single"
                locale={es}
                captionLayout="dropdown"
                startMonth={new Date(1900, 0)}
                endMonth={new Date(new Date().getFullYear() + 10, 11)}
              />
            </div>
          )}

          {currentStep.type === "colorpicker" && (
            <div className="w-full">
              <ColorPicker
                value={selectedItem || "bg-pink-500"}
                onChange={setColorByInput}
                showVariants={currentStep.showVariants ?? true}
              />
            </div>
          )}

          {currentStep.type === "selectable" && (
            <div className="flex w-full pb-3 md:px-4 items-center slider overflow-auto gap-2 md:grid md:overflow-hidden md:grid-cols-3 md:place-content-center">
              {currentStep.type === "selectable" &&
                currentStep.options.map((option) => {
                  const currentColor = option.background.replace("bg-", "");
                  const otherClasses = ["text-"]
                    .map((item) => item + currentColor)
                    .join(" ");

                  return (
                    <>
                      <label
                        key={option.label}
                        className="w-full min-w-[85%]"
                        onClick={() => setColorByInput(option.value)}
                      >
                        <input
                          type="radio"
                          name={currentStep.name}
                          value={option.value}
                          className="hidden"
                        />
                        <button
                          type="button"
                          key={option.label}
                          className=" group w-full bg-white h-[130px]
             border-gray-200 rounded-lg flex items-center justify-center relative shadow-sm cursor-pointer shadow-slate-300 overflow-hidden"
                        >
                          <BackgroundCircleNotInset
                            className={`${
                              selectedItem === option.value ? `selected` : ""
                            }`}
                            color={option.background}
                          />
                          <span
                            className={`mb-2 text-2xl font-bold tracking-tight group-hover:mix-blend-hard-light ${otherClasses} `}
                          >
                            {option.label}
                          </span>
                        </button>
                      </label>
                    </>
                  );
                })}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white size-12 md:size-16 justify-center bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
            >
              <svg
                className="w-4 h-4 md:size-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                ></path>
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormSteps;
