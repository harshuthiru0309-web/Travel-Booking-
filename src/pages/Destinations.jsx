import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { packages, countries } from "../data";
import Img from "../components/Img";

export default function Destinations() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("All");
  const [budget, setBudget] = useState("any");
  const [sort, setSort] = useState("name");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return packages
      .filter((p) => !t || `${p.destination} ${p.country} ${p.desc}`.toLowerCase().includes(t))
      .filter((p) => country === "All" || p.country === country)
      .filter((p) => budget === "any" || (budget === "low" ? p.price < 800 : budget === "mid" ? p.price >= 800 && p.price <= 1400 : p.price > 1400))
      .sort((a, b) => sort === "price" ? a.price - b.price : a.destination.localeCompare(b.destination));
  }, [q, country, budget, sort]);

  return (
    <div className="container section">
      <h1 className="page-title">Destinations</h1>
      <div className="filters f4">
        <label>Search<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by place or country" /></label>
        <label>Country<select value={country} onChange={(e) => setCountry(e.target.value)}>{countries.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Budget<select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="any">Any budget</option><option value="low">Under $800</option><option value="mid">$800 to $1,400</option><option value="high">Over $1,400</option></select></label>
        <label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Name</option><option value="price">Lowest price</option></select></label>
      </div>
      <p className="muted">{list.length} destinations</p>
      {list.length ? <div className="grid">{list.map((p) => (
        <Link key={p.id} to={`/packages?q=${encodeURIComponent(p.destination)}`} className="card dest-card">
          <div className="card-img tall"><Img src={p.image} alt={p.destination} c1={p.c1} c2={p.c2} /></div>
          <div className="card-body">
            <h3>{p.destination}</h3>
            <p className="muted"><FaMapMarkerAlt /> {p.country}</p>
            <p className="muted small">{p.desc}</p>
            <p className="card-foot"><span className="muted small">Starting from</span><strong className="price">${p.price}</strong></p>
          </div>
        </Link>))}</div>
      : <div className="empty"><p>No destinations match. Try another country or budget.</p></div>}
    </div>
  );
}
