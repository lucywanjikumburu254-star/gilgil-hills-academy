import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 1500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] || char));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });
    const guardianName = clean(body.guardianName, 100);
    const phone = clean(body.phone, 30);
    const email = clean(body.email, 150);
    const learnerName = clean(body.learnerName, 100);
    const grade = clean(body.grade, 30);
    const attendance = clean(body.attendance, 30);
    const previousSchool = clean(body.previousSchool, 150);
    const message = clean(body.message, 1500);
    if (!guardianName || !phone || !learnerName || !grade || !attendance || body.consent !== true) {
      return NextResponse.json({ error: "Please complete all required fields and accept the consent notice." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.SCHOOL_APPLICATION_FROM;
    if (!apiKey || !from) {
      return NextResponse.json({ error: "The online application form is being configured. Please call 0794 952 635 or email Gilgilhillsacademy2026@gmail.com for now." }, { status: 503 });
    }

    const rows = [
      ["Parent / guardian", guardianName], ["Phone", phone], ["Email", email || "Not provided"],
      ["Learner", learnerName], ["Grade / level", grade], ["School option", attendance],
      ["Previous school", previousSchool || "Not provided"], ["Additional message", message || "None"]
    ];
    const html = `<div style="font-family:Arial,sans-serif;color:#25282c;max-width:680px;margin:auto">
      <h2 style="color:#b71c1c">New admission enquiry — Gilgil Hills Academy</h2>
      <p>A parent/guardian has submitted an admission enquiry through the school website.</p>
      <table style="border-collapse:collapse;width:100%">${rows.map(([label,value]) => `<tr><th align="left" style="padding:10px;border:1px solid #ddd;background:#f5f5f5;width:36%">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`).join("")}</table>
      <p style="font-size:12px;color:#666">This is an enquiry only. Admission is not confirmed by this submission.</p>
    </div>`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: ["Gilgilhillsacademy2026@gmail.com"],
        subject: `Admission enquiry: ${learnerName} — ${grade}`,
        html,
        reply_to: email || undefined
      }),
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("Admission email delivery failed:", response.status, detail);
      return NextResponse.json({ error: "We could not send your enquiry right now. Please call 0794 952 635." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admission application error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again or call 0794 952 635." }, { status: 500 });
  }
}
