import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Img from "./Img";

export default function PackageCard({ pkg }) {
  return (
    <article className="card">
      <div className="card-img">
        <Img src={pkg.image} alt={pkg.destination} c1={pkg.c1} c2={pkg.c2} />
        <em className="badge">{pkg.type}</em>
      </div>
      <div className="card-body">
        <h3>{pkg.title}</h3>
        <p className="muted"><FaMapMarkerAlt /> {pkg.destination}, {pkg.country} · <FaClock /> {pkg.days} days</p>
        <p className="muted small">{pkg.desc}</p>
        <div className="card-foot">
          <div><strong className="price">${pkg.price}</strong><span className="muted small"> / person</span></div>
          <span className="rating"><FaStar /> {pkg.rating}</span>
        </div>
        <Link className="btn btn-block" to={`/packages/${pkg.id}`}>View details</Link>
      </div>
    </article>
  );
}
