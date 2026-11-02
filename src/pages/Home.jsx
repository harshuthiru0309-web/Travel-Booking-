import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaShieldAlt, FaTags, FaHeadset, FaStar, FaQuoteLeft } from "react-icons/fa";
import { packages, offers, testimonials, HERO_IMG } from "../data";
import PackageCard from "../components/PackageCard";
import Img from "../components/Img";

const why = [[FaTags, "Best price promise", "Found it cheaper elsewhere? We'll match it."], [FaShieldAlt, "Safe and secure", "Verified stays, insured trips, secure bookings."], [FaHeadset, "24/7 support", "Real people on call before, during and after your trip."]];

export default function Home() {
  const nav = useNavigate();
  const [s, setS] = useState({ q: "", date: "", guests: 2 });
  const today = new Date().toISOString().split("T")[0];
  const go = (e) => {
    e.preventDefault();
    try { localStorage.setItem("wayfarer_search", JSON.stringify({ date: s.date, guests: s.guests })); } catch {}
    nav(`/packages?q=${encodeURIComponent(s.q)}`);
  };
  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(10,45,60,.65),rgba(10,45,60,.75)), url(${HERO_IMG})` }}>
        <div className="container">
          <h1>Explore the World, One Journey at a Time.</h1>
          <p>Flights, stays and local guides in one booking.</p>
          <form className="search-box" onSubmit={go}>
            <label><span><FaMapMarkerAlt /> Where to?</span><input value={s.q} onChange={(e) => setS({ ...s, q: e.target.value })} placeholder="City or country" /></label>
            <label><span><FaCalendarAlt /> Travel date</span><input type="date" min={today} value={s.date} onChange={(e) => setS({ ...s, date: e.target.value })} /></label>
            <label><span><FaUser /> Travellers</span><input type="number" min="1" max="10" value={s.guests} onChange={(e) => setS({ ...s, guests: +e.target.value })} /></label>
            <button className="btn">Search</button>
          </form>
        </div>
      </section>

      <section className="container section">
        <h2>Popular destinations</h2>
        <div className="chips">
          {packages.slice(0, 6).map((p) => (
            <Link key={p.id} to={`/packages?q=${p.destination}`} className="dest">
              <Img src={p.image} alt={p.destination} c1={p.c1} c2={p.c2} /><span className="dest-label"><strong>{p.destination}</strong><small>{p.country}</small></span>
            </Link>))}
        </div>
      </section>

      <section className="container section">
        <div className="row-between"><h2>Featured packages</h2><Link to="/packages" className="link">View all packages</Link></div>
        <div className="grid">{[...packages].sort((a, b) => b.rating - a.rating).slice(0, 4).map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
      </section>

      <section className="container section">
        <h2>Special offers</h2>
        <div className="offers">{offers.map((o) => (
          <div key={o.id} className="offer" style={{ background: `linear-gradient(120deg, ${o.c1}, ${o.c2})` }}>
            <h3>{o.title}</h3><p>{o.text}</p><span className="code">Use code {o.code}</span>
          </div>))}</div>
      </section>

      <section className="why"><div className="container">
        <h2>Why choose us</h2>
        <div className="why-grid">{why.map(([I, t, d]) => <div key={t}><I className="why-ic" /><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>

      <section className="container section">
        <h2>What travellers say</h2>
        <div className="grid">{testimonials.map((t) => (
          <blockquote key={t.id} className="testi"><FaQuoteLeft className="q" /><p>{t.text}</p>
            <footer><strong>{t.name}</strong><span className="muted small">{t.trip}</span><span className="rating">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</span></footer></blockquote>))}</div>
      </section>
    </>
  );
}
