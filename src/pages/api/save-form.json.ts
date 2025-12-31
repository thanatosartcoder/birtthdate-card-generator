import type { APIRoute } from "astro";
import { encrypt, decrypt } from "../../resources/utils/crypto";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  let { token, key, value, step, values } = body;

  // Decrypt the token
  const tokenDecrypted = decrypt(token, import.meta.env.SECRET_KEY);

  console.log("Token decrypted", tokenDecrypted);
  // Parse the string to obtain the current object
  let formDataParse = {};
  if (tokenDecrypted) {
    formDataParse = JSON.parse(tokenDecrypted);
  }

  // Handle multi-field steps (new format)
  if (values && Array.isArray(values)) {
    values.forEach(({ key: fieldKey, value: fieldValue }) => {
      let processedValue = fieldValue;

      // Special color handling
      if (fieldKey === "color") {
        const otherColor = fieldValue.replace("bg-", "");
        const textColor = ["text", "-", otherColor].join("");
        const viaColor = ["via", "-", otherColor].join("");
        processedValue = {
          bgColor: fieldValue,
          textColor,
          viaColor,
        };
      }

      formDataParse = {
        ...formDataParse,
        [fieldKey]: processedValue,
      };
    });
  }
  // Handle single field steps (backward compatibility)
  else if (key) {
    // Add the new key
    if (key === "color") {
      const otherColor = value.replace("bg-", "");
      const textColor = ["text", "-", otherColor].join("");
      const viaColor = ["via", "-", otherColor].join("");
      value = {
        bgColor: value,
        textColor,
        viaColor,
      };
    }
    formDataParse = {
      ...formDataParse,
      [key]: value,
    };
  }

  // Update step counter
  formDataParse = {
    ...formDataParse,
    step: step + 1,
  };

  //Encrypt the new form data
  const newFormEncrypted = encrypt(
    JSON.stringify(formDataParse),
    import.meta.env.SECRET_KEY
  );

  return new Response(
    JSON.stringify({
      newToken: newFormEncrypted,
    })
  );
};
