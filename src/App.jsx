import { Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import useBookings from "./hooks/useBookings";

export default function App() {
  const { bookings, addBooking, cancelBooking } = useBookings();
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/book/:id" element={<Booking addBooking={addBooking} />} />
          <Route path="/my-bookings" element={<MyBookings bookings={bookings} cancelBooking={cancelBooking} />} />
          <Route path="*" element={<div className="container section empty"><p>Page not found.</p><Link className="btn" to="/">Go home</Link></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
