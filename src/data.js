const mk = (id, title, destination, country, type, days, price, rating, emoji, c1, c2, desc, highlights, itinerary) =>
  ({ id, title, destination, country, type, days, price, rating, emoji, c1, c2, desc, highlights, itinerary });

const base = [
  mk(1, "Backwaters & Beaches", "Kerala", "India", "Beach", 6, 450, 4.8, "🛶", "#0E7C86", "#7BC8A4",
    "Drift through Alleppey on a private houseboat, then unwind on Varkala's cliffs.",
    ["Houseboat stay", "Ayurvedic spa session", "Cliff-side sunset"],
    ["Arrive in Kochi, Fort Kochi walk", "Munnar tea estates", "Thekkady spice trail", "Alleppey houseboat night", "Varkala beach day", "Departure from Trivandrum"]),
  mk(2, "Alpine Escape", "Interlaken", "Switzerland", "Mountain", 7, 1650, 4.9, "🏔️", "#274C77", "#8FB8DE",
    "Cable cars, glacier views and lakeside villages in the heart of the Swiss Alps.",
    ["Jungfraujoch excursion", "Lake Brienz cruise", "Swiss rail pass"],
    ["Arrive in Zurich, train to Interlaken", "Lauterbrunnen valley", "Jungfraujoch summit", "Grindelwald hiking", "Lake Brienz cruise", "Lucerne day trip", "Departure"]),
  mk(3, "Santorini Sunsets", "Santorini", "Greece", "Beach", 5, 1200, 4.7, "🏝️", "#1D6FA5", "#F2A541",
    "Whitewashed villages, volcanic beaches and the world's most photographed sunsets.",
    ["Caldera sunset sail", "Wine tasting", "Oia village tour"],
    ["Arrive and settle in Fira", "Caldera boat trip", "Oia and sunset", "Wine and beach day", "Departure"]),
  mk(4, "Kyoto Temple Trails", "Kyoto", "Japan", "Culture", 6, 1400, 4.9, "⛩️", "#9C3D54", "#F4B6A6",
    "Quiet temples, bamboo groves and tea ceremonies in Japan's old capital.",
    ["Fushimi Inari at dawn", "Tea ceremony", "Arashiyama bamboo grove"],
    ["Arrive in Osaka, transfer to Kyoto", "Fushimi Inari and Gion", "Arashiyama and Kinkaku-ji", "Nara day trip", "Tea ceremony and cooking class", "Departure"]),
  mk(5, "Desert Forts of Rajasthan", "Jaipur", "India", "Culture", 7, 520, 4.6, "🏰", "#B5542B", "#F2C879",
    "Palaces, forts and bazaars from Jaipur to Jaisalmer, ending with a night under desert stars.",
    ["Amber Fort visit", "Camel safari", "Desert camp night"],
    ["Arrive in Jaipur", "Amber Fort and City Palace", "Drive to Jodhpur", "Mehrangarh Fort", "Drive to Jaisalmer", "Camel safari and desert camp", "Departure"]),
  mk(6, "Bali Slow Living", "Bali", "Indonesia", "Beach", 8, 780, 4.7, "🌴", "#2F7D5B", "#A8D5BA",
    "Rice terraces in Ubud, surf in Canggu and temple sunsets in Uluwatu.",
    ["Ubud rice terrace walk", "Surf lesson", "Uluwatu fire dance"],
    ["Arrive in Denpasar, to Ubud", "Rice terraces and monkey forest", "Waterfalls tour", "Move to Canggu", "Surf lesson", "Beach club day", "Uluwatu temple", "Departure"]),
  mk(7, "Patagonia Trek", "Torres del Paine", "Chile", "Adventure", 9, 2100, 4.8, "🥾", "#3A506B", "#9DB4C0",
    "Guided hikes past glaciers and granite towers in one of the world's last wild places.",
    ["W Trek guided", "Glacier Grey boat", "Mountain lodge stays"],
    ["Arrive in Punta Arenas", "Transfer to the park", "Grey Glacier hike", "French Valley", "Base of the Towers", "Rest day at lodge", "Boat to Grey", "Return to town", "Departure"]),
  mk(8, "Northern Lights Iceland", "Reykjavik", "Iceland", "Adventure", 5, 1350, 4.6, "🌌", "#1B3A4B", "#6C8EAD",
    "Chase the aurora, soak in geothermal lagoons and walk behind waterfalls.",
    ["Aurora hunt", "Blue Lagoon entry", "Golden Circle tour"],
    ["Arrive in Reykjavik", "Golden Circle", "South coast waterfalls", "Aurora night tour", "Blue Lagoon and departure"]),
];

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;
const ids = {1:"photo-1602216056096-3b40cc0c9944",2:"photo-1530841377377-3ff06c0ca713",3:"photo-1570077188670-e3a8d69ac5ff",4:"photo-1493976040374-85c8e12f0c0e",5:"photo-1524492412937-b28074a5d7da",6:"photo-1537996194471-e657df975ab4",7:"photo-1551632811-561732d1e306",8:"photo-1531366936337-7c912a4589a7"};
export const packages = base.map((p) => ({ ...p, image: U(ids[p.id]) }));
export const HERO_IMG = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=70";
export const offers = [
  { id: 1, title: "Early Bird: 20% off", text: "Book 60 days ahead on any international package.", code: "EARLY20", c1: "#F2A541", c2: "#E8743B" },
  { id: 2, title: "Honeymoon Special", text: "Free candlelight dinner on beach packages.", code: "LOVE15", c1: "#9C3D54", c2: "#E58A8A" },
  { id: 3, title: "Group Getaway", text: "Travel with 5 or more and save $100 each.", code: "GROUP100", c1: "#0E7C86", c2: "#5BB5A2" },
];
export const testimonials = [
  { id: 1, name: "Anita Menon", trip: "Backwaters & Beaches", text: "Everything was planned to the minute. The houseboat night was the highlight of our year." },
  { id: 2, name: "Rahul Verma", trip: "Kyoto Temple Trails", text: "Clear pricing, helpful support and a guide who knew every hidden temple." },
  { id: 3, name: "Sara Thomas", trip: "Alpine Escape", text: "Booking took five minutes. The rail pass and hotel transfers worked perfectly." },
];
export const types = ["All", ...new Set(packages.map((p) => p.type))];
export const countries = ["All", ...new Set(packages.map((p) => p.country))];
