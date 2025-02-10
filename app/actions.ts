"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signOutUser() {
  try {
    const supabase = await createClient();

    await supabase.auth.signOut();
  } catch (error) {
    // ...
  }

  redirect(`/login`); // Navigate to the new post page
}
