import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { packages } from "../data";

const saved = (() => { try { return JSON.parse(localStorage.getItem("wayfarer_search")) || {}; } catch { return {}; } })();
const today = new Date().toISOString().split("T")[0];
const validate = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (!/^[+]?[\d\s-]{10,15}$/.test(f.phone)) e.phone = "Enter a phone number with 10 to 15 digits.";
  if (!f.date) e.date = "Choose a travel date.";
  else if (f.date < today) e.date = "Travel date can't be in the past.";
  if (f.adults < 1) e.adults = "At least 1 adult is required.";
  if (f.children < 0) e.children = "Children can't be negative.";
  return e;
};

export default function Booking({ addBooking }) {
  const { id } = useParams();
  const nav = useNavigate();
  const pkg = packages.find((p) => p.id === Number(id));
  const [f, setF] = useState({ name: "", email: "", phone: "", date: saved.date >= today ? saved.date : "", adults: saved.guests || 1, children: 0, insurance: false });
  const [errors, setErrors] = useState({});

  if (!pkg) return <div className="container section empty"><p>Package not found.</p><Link className="btn" to="/destinations">Browse trips</Link></div>;

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setF({ ...f, [k]: v });
  };
  const base = pkg.price * f.adults + pkg.price * 0.5 * f.children;
  const insurance = f.insurance ? 25 * (f.adults + f.children) : 0;
  const tax = Math.round((base + insurance) * 0.05);
  const total = base + insurance + tax;

  const submit = (e) => {
    e.preventDefault();
    const err = validate(f);
    setErrors(err);
    if (Object.keys(err).length) return;
    addBooking({ id: Date.now(), packageId: pkg.id, title: pkg.title, destination: pkg.destination, country: pkg.country, emoji: pkg.emoji, ...f, total, bookedOn: new Date().toISOString() });
    nav("/my-bookings", { state: { success: true } });
  };
  const field = (k, label, type = "text", extra = {}) => (
    <label>{label}
      <input type={type} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...extra} />
      {errors[k] && <span className="error">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="container section">
      <h1 className="page-title">Book {pkg.title}</h1>
      <div className="detail-layout">
        <form className="form" onSubmit={submit} noValidate>
          {field("name", "Full name")}
          {field("email", "Email", "email")}
          {field("phone", "Phone", "tel")}
          {field("date", "Travel date", "date", { min: today })}
          <div className="two">
            {field("adults", "Adults", "number", { min: 1, max: 10 })}
            {field("children", "Children (50% off)", "number", { min: 0, max: 10 })}
          </div>
          <label className="check"><input type="checkbox" checked={f.insurance} onChange={set("insurance")} /> Add travel insurance ($25 per traveller)</label>
          <button className="btn btn-block">Confirm booking</button>
        </form>
        <aside className="sidebar">
          <h3>Price summary</h3>
          <div className="line"><span>Adults ({f.adults} × ${pkg.price})</span><span>${base - pkg.price * 0.5 * f.children}</span></div>
          <div className="line"><span>Children ({f.children} × ${pkg.price / 2})</span><span>${pkg.price * 0.5 * f.children}</span></div>
          {f.insurance && <div className="line"><span>Insurance</span><span>${insurance}</span></div>}
          <div className="line"><span>Taxes (5%)</span><span>${tax}</span></div>
          <div className="line total"><span>Total</span><span>${total}</span></div>
        </aside>
      </div>
    </div>
  );
}
