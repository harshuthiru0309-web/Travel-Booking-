import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaPlaneDeparture, FaBars, FaTimes } from "react-icons/fa";

const items = [["/", "Home"], ["/destinations", "Destinations"], ["/packages", "Packages"], ["/my-bookings", "My Bookings"], ["/contact", "Contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}><FaPlaneDeparture /> Wayfarer</Link>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
        <nav className={open ? "links open" : "links"}>
          {items.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
      </div>
    </header>
  );
}
