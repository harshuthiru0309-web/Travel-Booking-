import { useParams, Link } from "react-router-dom";
import { packages } from "../data";
import Img from "../components/Img";

export default function PackageDetails() {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === Number(id));
  if (!pkg) return <div className="container section empty"><p>We couldn't find that package.</p><Link className="btn" to="/destinations">Browse trips</Link></div>;

  return (
    <>
      <div className="detail-hero">
        <Img className="bg" src={pkg.image} alt={pkg.destination} c1={pkg.c1} c2={pkg.c2} />
        <div className="container">
          <h1>{pkg.title}</h1><p>{pkg.destination}, {pkg.country} · {pkg.days} days · ★ {pkg.rating}</p></div>
      </div>
      <div className="container detail-layout">
        <div>
          <h2>About this trip</h2><p>{pkg.desc}</p>
          <h2>Highlights</h2>
          <ul className="ticks">{pkg.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <h2>Day by day</h2>
          <ol className="itinerary">{pkg.itinerary.map((d, i) => <li key={i}><strong>Day {i + 1}</strong> {d}</li>)}</ol>
        </div>
        <aside className="sidebar">
          <p className="muted small">From</p>
          <p className="price big">${pkg.price}<span className="muted small"> / person</span></p>
          <Link className="btn btn-block" to={`/book/${pkg.id}`}>Book this trip</Link>
          <p className="muted small">Free cancellation from My Bookings.</p>
        </aside>
      </div>
    </>
  );
}
