import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { COMPANY_FACTS } from '../data/content';

export function LandingLeadForm({ service }: { service: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    setStatus('sending');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, service, sourcePath: window.location.pathname }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('sent');
      event.currentTarget.reset();
    } catch {
      const body = `Hello PureTech,\n\nI would like to discuss ${service}.\n\nName: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\nCompany: ${String(data.get('company')).trim()}\nBudget: ${data.get('budget')}\n\nProject details:\n${String(data.get('message')).trim()}`;
      window.location.href = `mailto:${COMPANY_FACTS.email}?subject=${encodeURIComponent(`Project inquiry: ${service}`)}&body=${encodeURIComponent(body)}`;
      setStatus('error');
    }
  }
  return <form id="project-inquiry" className="lp-lead-form" onSubmit={submitLead} aria-labelledby="lead-form-title">
    <div className="lp-lead-kicker"><span /> YOUR NEXT BIG IDEA</div>
    <h2 id="lead-form-title">Let’s build <em>what’s next.</em></h2>
    <p>Tell us a little about your project. Let’s explore the possibilities.</p>
    <div className="lp-lead-fields">
      <label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} pattern=".*\S.*" /></label>
      <label>Work email <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={160} /></label>
      <label>Company<input name="company" autoComplete="organization" placeholder="Company name" maxLength={120} /></label>
      <label>Project budget<select name="budget" defaultValue="Not sure yet"><option>Not sure yet</option><option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$50,000</option><option>$50,000+</option></select></label>
      <label className="lp-lead-message">What would you like to build? <span>*</span><textarea name="message" placeholder="Your idea, goals, or the challenge you want to solve…" rows={3} required maxLength={1200} /></label>
    </div>
    <input name="website" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button type="submit" className="lp-lead-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Let’s talk about your project'} <ArrowUpRight size={18} /></button>
    <div className="lp-lead-note"><Mail size={13} /><span>Your details go directly to the PureTech team.</span></div>
    {status === 'sent' && <p className="lp-lead-status" role="status">Thanks — your project inquiry has been received.</p>}
    {status === 'error' && <p className="lp-lead-status" role="status">The secure form is not connected yet, so we opened an email draft to {COMPANY_FACTS.email}.</p>}
    {service === 'Healthcare' && <p className="lp-lead-note">Please do not include patient information.</p>}
  </form>;
}
