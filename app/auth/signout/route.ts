import { createClient } from "@/utils/supabase/server";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const supabase = await createClient();

  console.debug({ supabase });

  await supabase.auth.signOut();

  return response.redirect(307, "/login");
}
