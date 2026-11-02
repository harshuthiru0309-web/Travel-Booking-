# Wayfarer – Travel Booking Website
React 18 + Vite + React Router v6 + React Icons, plain CSS (images load from Unsplash and fall back to gradients offline), mock data, localStorage.

## Run
    npm install
    npm run dev      # http://localhost:5173
    npm run build    # production build in /dist

## Structure
- src/data.js – mock packages
- src/pages – Home, Destinations, Packages, PackageDetails, Booking, MyBookings, Contact
- src/components – Navbar, Footer, PackageCard, Img
- src/hooks/useBookings.js – localStorage persistence

## Features
Popular destinations and packages · search, filter and sort · package details with itinerary ·
validated booking form with live price total · My Bookings (localStorage, cancel) · responsive layout.
