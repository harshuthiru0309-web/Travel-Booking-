import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div><h3>Wayfarer</h3><p>Hand-built trips with flights, stays and local guides included.</p>
          <div className="social">{[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((I, i) => <a key={i} href="#!" aria-label="Social link"><I /></a>)}</div></div>
        <div><h4>Explore</h4><Link to="/destinations">Destinations</Link><Link to="/packages">Packages</Link><Link to="/my-bookings">My Bookings</Link></div>
        <div><h4>Contact</h4><p><FaPhoneAlt /> +91 98765 43210</p><p><FaEnvelope /> hello@wayfarer.demo</p><p><FaMapMarkerAlt /> Thrissur, Kerala, India</p></div>
      </div>
      <div className="container copy">© {new Date().getFullYear()} Wayfarer. Demo project with mock data.</div>
    </footer>
  );
}
