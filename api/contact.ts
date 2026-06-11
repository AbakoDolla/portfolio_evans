export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body ?? {};
  const { name, email, message, service, budget } = body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  console.log(`[contact] ${name} <${email}> — service: ${service ?? "—"}, budget: ${budget ?? "—"}`);
  return res.json({ ok: true, message: "Message reçu — je vous réponds sous 24h !" });
}
