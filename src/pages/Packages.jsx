import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { packages, types, countries } from "../data";
import PackageCard from "../components/PackageCard";

export default function Packages() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [type, setType] = useState("All");
  const [country, setCountry] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sort, setSort] = useState("rating");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages
      .filter((p) => !q || `${p.title} ${p.destination} ${p.country}`.toLowerCase().includes(q))
      .filter((p) => type === "All" || p.type === type)
      .filter((p) => country === "All" || p.country === country)
      .filter((p) => p.price <= maxPrice)
      .sort((a, b) => sort === "price" ? a.price - b.price : sort === "days" ? a.days - b.days : b.rating - a.rating);
  }, [query, type, country, maxPrice, sort]);

  const reset = () => { setQuery(""); setType("All"); setCountry("All"); setMaxPrice(2500); setSort("rating"); };

  return (
    <div className="container section">
      <h1 className="page-title">Travel packages</h1>
      <div className="filters">
        <label>Search<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="City, country or trip name" /></label>
        <label>Trip type<select value={type} onChange={(e) => setType(e.target.value)}>{types.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label>Country<select value={country} onChange={(e) => setCountry(e.target.value)}>{countries.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Max price: ${maxPrice}<input type="range" min="300" max="2500" step="50" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} /></label>
        <label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="rating">Top rated</option><option value="price">Lowest price</option><option value="days">Shortest trip</option></select></label>
      </div>
      <p className="muted">{results.length} {results.length === 1 ? "trip" : "trips"} found</p>
      {results.length ? (
        <div className="grid">{results.map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
      ) : (
        <div className="empty"><p>No trips match these filters. Try a higher budget or a different country.</p><button className="btn" onClick={reset}>Clear filters</button></div>
      )}
    </div>
  );
}
