import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { decrypt } from "../../resources/utils/crypto";
import type { BirthdayData } from "../../resources/types/form-step";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token, slug } = await request.json();

    if (!token || !slug) {
      return new Response(
        JSON.stringify({ error: "Token y URL personalizada son requeridos" }),
        { status: 400 },
      );
    }

    // 1. Decrypt existing data
    const data: BirthdayData = JSON.parse(
      decrypt(token, import.meta.env.SECRET_KEY),
    );

    // 2. Add slug to data
    data.slug = slug;

    // 3. Check for duplicates
    const { data: existing } = await supabase
      .from("cards")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({
          error: "Esta URL ya está en uso. Por favor elige otra.",
        }),
        { status: 409 }, // Conflict
      );
    }

    // 4. Save to Supabase
    const { error } = await supabase.from("cards").insert({
      slug,
      data,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return new Response(
        JSON.stringify({ error: "Error al guardar en la base de datos" }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({ success: true, url: `/card/${slug}` }),
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 },
    );
  }
};
