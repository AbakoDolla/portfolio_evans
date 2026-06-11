import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  service: z.string().optional(),
  budget:  z.string().optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // In production, send to email service (Resend/SendGrid/etc.)
    // For now, log and return success — the front-end also opens mailto: as fallback
    console.log("[CONTACT]", data);

    return NextResponse.json({ ok: true, message: "Message reçu !" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ ok: false, message: "Erreur serveur" }, { status: 500 });
  }
}
