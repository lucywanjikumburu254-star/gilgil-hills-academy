"use client";

import { FormEvent, useState } from "react";

type ApplicationForm = {
  guardianName: string;
  phone: string;
  email: string;
  learnerName: string;
  grade: string;
  attendance: string;
  previousSchool: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialForm: ApplicationForm = {
  guardianName: "", phone: "", email: "", learnerName: "", grade: "",
  attendance: "", previousSchool: "", message: "", consent: false, website: ""
};

export default function AdmissionApplicationForm() {
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function update<K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/admission-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not send your application enquiry. Please contact the school.");
      setStatus({ type: "success", text: "Thank you. Your admission enquiry has been sent to Gilgil Hills Academy. The school team will contact you." });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", text: error instanceof Error ? error.message : "Something went wrong. Please call 0794 952 635." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="admission-form-card">
      <div className="admission-form-heading">
        <span className="admission-form-kicker">ADMISSIONS · ENQUIRY FORM</span>
        <h3>Start an application</h3>
        <p>Share a few details and our admissions team will get in touch to guide you through the next steps.</p>
      </div>
      <form className="admission-form" onSubmit={submit}>
        <div className="admission-form-grid">
          <label>Parent / guardian full name *
            <input required maxLength={100} value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} autoComplete="name" placeholder="Your full name" />
          </label>
          <label>Phone number *
            <input required type="tel" maxLength={30} value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" placeholder="e.g. 07xx xxx xxx" />
          </label>
          <label>Email address
            <input type="email" maxLength={150} value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" placeholder="name@example.com" />
          </label>
          <label>Learner's full name *
            <input required maxLength={100} value={form.learnerName} onChange={(e) => update("learnerName", e.target.value)} placeholder="Learner's full name" />
          </label>
          <label>Grade / level applying for *
            <select required value={form.grade} onChange={(e) => update("grade", e.target.value)}>
              <option value="">Select grade / level</option>
              <option>Playgroup</option><option>PP1</option><option>PP2</option>
              <option>Grade 1</option><option>Grade 2</option><option>Grade 3</option>
              <option>Grade 4</option><option>Grade 5</option><option>Grade 6</option>
              <option>Grade 7</option><option>Grade 8</option><option>Grade 9</option>
            </select>
          </label>
          <label>School option *
            <select required value={form.attendance} onChange={(e) => update("attendance", e.target.value)}>
              <option value="">Select an option</option>
              <option value="Day scholar">Day scholar</option>
              <option value="Boarder">Boarder</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>
          <label className="admission-form-full">Previous school (optional)
            <input maxLength={150} value={form.previousSchool} onChange={(e) => update("previousSchool", e.target.value)} placeholder="Name of previous school" />
          </label>
          <label className="admission-form-full">Additional message (optional)
            <textarea rows={4} maxLength={1500} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any question or information you would like the admissions team to know" />
          </label>
        </div>
        <div className="admission-honeypot" aria-hidden="true">
          <label>Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label>
        </div>
        <label className="admission-consent">
          <input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} />
          <span>I agree that Gilgil Hills Academy may use these details to respond to my admission enquiry. I will provide any further documents directly to the school.</span>
        </label>
        <p className="admission-privacy-note">Please do not enter medical information or attach sensitive documents here. Submitting this form is an enquiry, not confirmation of admission or a reserved place.</p>
        <button className="button button-red admission-submit" type="submit" disabled={sending}>{sending ? "Sending enquiry…" : "Send admission enquiry"} <span>↗</span></button>
        {status && <p className={"admission-form-status " + status.type} role="status">{status.text}</p>}
      </form>
    </div>
  );
}
