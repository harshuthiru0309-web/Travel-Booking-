import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email address.";
    if (f.message.trim().length < 10) x.message = "Write at least 10 characters.";
    setErr(x);
    if (Object.keys(x).length) return;
    try {
      const old = JSON.parse(localStorage.getItem("wayfarer_messages")) || [];
      localStorage.setItem("wayfarer_messages", JSON.stringify([...old, { ...f, at: Date.now() }]));
    } catch {}
    setSent(true); setF({ name: "", email: "", message: "" });
  };
  const inp = (k, label, area) => (
    <label>{label}{area ? <textarea rows="5" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} /> : <input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} />}
      {err[k] && <span className="error">{err[k]}</span>}</label>);
  return (
    <div className="container section">
      <h1 className="page-title">Contact us</h1>
      <div className="detail-layout" style={{ paddingTop: 0 }}>
        <form className="form" onSubmit={submit} noValidate>
          {sent && <div className="notice">Message sent. We'll reply within one working day.</div>}
          {inp("name", "Your name")}{inp("email", "Email")}{inp("message", "How can we help?", true)}
          <button className="btn btn-block">Send message</button>
        </form>
        <aside className="sidebar"><h3>Reach us directly</h3>
          <p><FaPhoneAlt /> +91 98765 43210</p><p><FaEnvelope /> hello@wayfarer.demo</p><p><FaMapMarkerAlt /> Thrissur, Kerala, India</p>
          <p className="muted small">Open daily, 9am to 8pm IST.</p></aside>
      </div>
    </div>
  );
}
