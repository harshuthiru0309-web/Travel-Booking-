import { useState, useEffect } from "react";
const KEY = "wayfarer_bookings";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

export default function useBookings() {
  const [bookings, setBookings] = useState(read);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(bookings)); }, [bookings]);
  const addBooking = (b) => setBookings((prev) => [b, ...prev]);
  const cancelBooking = (id) => setBookings((prev) => prev.filter((b) => b.id !== id));
  return { bookings, addBooking, cancelBooking };
}
