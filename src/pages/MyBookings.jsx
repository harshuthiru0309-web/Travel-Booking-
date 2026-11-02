import { Link, useLocation } from "react-router-dom";

export default function MyBookings({ bookings, cancelBooking }) {
  const { state } = useLocation();
  return (
    <div className="container section">
      <h1 className="page-title">My bookings</h1>
      {state?.success && <div className="notice">Booking confirmed. Your trip details are below.</div>}
      {bookings.length === 0 ? (
        <div className="empty"><p>You haven't booked a trip yet.</p><Link className="btn" to="/destinations">Find a trip</Link></div>
      ) : (
        <div className="bookings">
          {bookings.map((b) => (
            <article className="booking" key={b.id}>
              <div className="b-icon" aria-hidden="true">{b.emoji}</div>
              <div className="b-info">
                <h3>{b.title}</h3>
                <p className="muted">{b.destination}, {b.country}</p>
                <p className="small">Travel date: <strong>{new Date(b.date).toLocaleDateString()}</strong> · {b.adults} adult{b.adults > 1 ? "s" : ""}{b.children ? `, ${b.children} child${b.children > 1 ? "ren" : ""}` : ""}</p>
                <p className="small muted">Booked for {b.name} ({b.email}) on {new Date(b.bookedOn).toLocaleDateString()}</p>
              </div>
              <div className="b-side">
                <strong className="price">${b.total}</strong>
                <button className="btn btn-ghost" onClick={() => window.confirm("Cancel this booking?") && cancelBooking(b.id)}>Cancel booking</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
