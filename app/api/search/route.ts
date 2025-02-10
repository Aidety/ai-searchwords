import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { query } = await request.json();

    console.debug("Hitting the API route", query);

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`, // Store the API key in an environment variable
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "Be precise and concise.",
          },
          {
            role: "user",
            content: query, // Use the question passed in the body
          },
        ],
      }),
    });

    const res = await response.json();

    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
