/**
 * ZENITH CABS & LUXURY TOURS
 * Core dataset for fleet, packages, pricing matrix, and location network
 */

const ZENITH_DATA = {
  brand: {
    name: "ZENITH CABS & TOURS",
    shortName: "ZENITH",
    tagline: "Premier Chauffeur Transfers & Islandwide Tours",
    hotline: "+94 11 289 9000",
    hotlineDisplay: "+94 11 289 9000",
    mobileDispatch: "+94 77 123 4567",
    whatsappNumber: "94771234567",
    supportEmail: "dispatch@zenithcabs.lk",
    address: "Level 4, Zenith Tower, 142 High Level Road, Colombo 05, Sri Lanka",
    branches: ["Colombo Central", "BIA Airport Lounge", "Kandy City Hub", "Galle Fort Center", "Ella Desk"]
  },

  currencies: {
    LKR: { symbol: "Rs. ", rate: 1, label: "LKR (Rs)" },
    USD: { symbol: "$ ", rate: 0.0033, label: "USD ($)" },
    EUR: { symbol: "€ ", rate: 0.0031, label: "EUR (€)" },
    GBP: { symbol: "£ ", rate: 0.0026, label: "GBP (£)" }
  },

  fleet: [
    {
      id: "compact",
      category: "compact",
      name: "Eco City Compact",
      models: "Suzuki Alto, Wagon R, Daihatsu Mira",
      badge: "Budget Friendly",
      image: "assets/images/fleet-sedan.jpg",
      seats: 3,
      luggage: 2,
      acType: "A/C Standard",
      baseFare: 1200, // Rs.
      baseKm: 10,
      ratePerKm: 95, // Rs. per km
      hourlyRate: 1100,
      features: ["Fuel Efficient", "Air Conditioned", "Clean & Sanitized", "GPS Monitored"],
      description: "Best for quick city transits, solo travelers, and couples looking for the most economical ride."
    },
    {
      id: "sedan",
      category: "sedan",
      name: "Executive Prime Sedan",
      models: "Toyota Premio, Axio, Prius, Allion",
      badge: "Most Popular",
      image: "assets/images/fleet-sedan.jpg",
      seats: 4,
      luggage: 3,
      acType: "Climate Controlled Dual A/C",
      baseFare: 1600,
      baseKm: 10,
      ratePerKm: 125,
      hourlyRate: 1450,
      features: ["Plush Velvet Seating", "High Boot Space", "Free In-Car WiFi", "Complimentary Water"],
      description: "The ideal blend of executive elegance, luggage room, and smooth highway comfort for airport and outstation rides."
    },
    {
      id: "suv",
      category: "suv",
      name: "Premier Crossover / SUV",
      models: "Toyota Harrier, Honda Vezel, Raize",
      badge: "Comfort & Style",
      image: "assets/images/airport-car.jpg",
      seats: 4,
      luggage: 4,
      acType: "Multi-Zone Automatic A/C",
      baseFare: 2200,
      baseKm: 10,
      ratePerKm: 165,
      hourlyRate: 1800,
      features: ["Elevated Road View", "Extra Legroom", "USB Fast Chargers", "Hill-Country Capable"],
      description: "High ground clearance, smooth leather seating, and generous boot space for scenic hill station climbs."
    },
    {
      id: "van-std",
      category: "van",
      name: "Grand Passenger Van",
      models: "Toyota KDH Flat-Roof, Caravan Dual AC",
      badge: "Family Favorite",
      image: "assets/images/tour-van.jpg",
      seats: 9,
      luggage: 7,
      acType: "Dual Roofline A/C",
      baseFare: 2800,
      baseKm: 10,
      ratePerKm: 185,
      hourlyRate: 2200,
      features: ["Reclining Bucket Seats", "Large Luggage Bay", "Full Islandwide Tours", "Mic & Audio System"],
      description: "Spacious multi-passenger travel with roofline air conditioning and plenty of space for multiple large suitcases."
    },
    {
      id: "van-vip",
      category: "van",
      name: "Luxury VIP High-Roof Van",
      models: "Toyota KDH Super GL High-Roof",
      badge: "VIP Group Travel",
      image: "assets/images/tour-van.jpg",
      seats: 14,
      luggage: 10,
      acType: "Independent Passenger Dual A/C",
      baseFare: 3400,
      baseKm: 10,
      ratePerKm: 215,
      hourlyRate: 2600,
      features: ["High Ceiling Stature", "Adjustable Armrests", "Curtains & Tinted Glass", "Experienced Tour Chauffeur"],
      description: "Premium large group travel with ample headroom, walk-in ease, and generous cargo hold for multi-day tours."
    },
    {
      id: "coach",
      category: "bus",
      name: "Elite Tourist Mini-Coach",
      models: "Toyota Coaster / Mitsubishi Rosa (29 - 33 Seater)",
      badge: "Corporate & Group Tours",
      image: "assets/images/tour-van.jpg",
      seats: 30,
      luggage: 25,
      acType: "Heavy-Duty Ducted A/C",
      baseFare: 8500,
      baseKm: 20,
      ratePerKm: 340,
      hourlyRate: 4800,
      features: ["PA Announcement System", "Dedicated Luggage Compartment", "Certified Coach Captain", "First-Aid Equipped"],
      description: "Designed for corporate retreats, large family reunions, international tour groups, and wedding convoys."
    },
    {
      id: "cargo",
      category: "cargo",
      name: "Movers & Cargo Express",
      models: "Covered 10.5ft / 14.5ft Box Truck, Mini Lorry",
      badge: "Relocation & Freight",
      image: "assets/images/hero-fleet.jpg",
      seats: 2,
      luggage: 50,
      acType: "Cabin A/C",
      baseFare: 3000,
      baseKm: 10,
      ratePerKm: 170,
      hourlyRate: 2100,
      features: ["Weatherproof Covered Container", "Hydraulic Tailgate", "Experienced Cargo Handlers", "Safe Tie-Down Points"],
      description: "Secure, weather-protected furniture, commercial goods, and home relocation transport with reliable helpers."
    }
  ],

  tourPackages: [
    {
      id: "tour-highlands",
      title: "Royal Highlands & Misty Tea Trails",
      tag: "Best Seller",
      duration: "3 Days / 2 Nights",
      distanceIncluded: "600 km Included",
      destinations: ["Colombo", "Kandy Temple of Tooth", "Ramboda Falls", "Nuwara Eliya Little England", "Ella Nine Arch Bridge"],
      image: "assets/images/tour-van.jpg",
      recommendedVehicle: "Executive Sedan or Luxury Van",
      priceLKR: 78500,
      highlights: [
        "Pick up from any hotel or airport",
        "Scenic mountain road chauffeur",
        "Tea factory tour & tea tasting",
        "Train view at Demodara Nine Arches",
        "Dedicated English-speaking tour driver"
      ],
      description: "Traverse lush emerald tea plantations, tumbling waterfalls, mist-shrouded peaks, and British colonial hill stations with complete comfort."
    },
    {
      id: "tour-south-coast",
      title: "Southern Heritage & Golden Coastline",
      tag: "Coastal Escape",
      duration: "2 Days / 1 Night",
      distanceIncluded: "400 km Included",
      destinations: ["Colombo", "Bentota River Safari", "Hikkaduwa Coral Reef", "Galle Dutch Fort", "Mirissa Coconut Tree Hill"],
      image: "assets/images/fleet-sedan.jpg",
      recommendedVehicle: "Executive Prime Sedan",
      priceLKR: 49000,
      highlights: [
        "Expressway travel included",
        "Historic 16th-century Galle Fort sunset stroll",
        "Madu River boat safari with cinnamon island",
        "Sea turtle conservation hatchery visit",
        "Optional whale watching transfer"
      ],
      description: "Bask in the tropical warmth of Sri Lanka's world-famous southern shoreline with heritage ramparts, pristine waves, and fresh seafood stops."
    },
    {
      id: "tour-cultural-triangle",
      title: "Ancient Kingdoms & Cultural Triangle",
      tag: "UNESCO World Heritage",
      duration: "3 Days / 2 Nights",
      distanceIncluded: "650 km Included",
      destinations: ["Colombo / Airport", "Dambulla Golden Cave Temple", "Sigiriya Lion Rock", "Polonnaruwa Ruins", "Minneriya Safari"],
      image: "assets/images/hero-fleet.jpg",
      recommendedVehicle: "Premier Crossover / SUV",
      priceLKR: 84000,
      highlights: [
        "Climb 5th-century Sigiriya Sky Citadel",
        "Ancient fresco paintings and mirror wall",
        "Elephant gathering at Minneriya Reservoir",
        "Polonnaruwa royal palace archaeological complex",
        "Flexible pit-stops for authentic Sri Lankan buffet"
      ],
      description: "Step back 2,500 years into ancient Buddhist civilizations, towering stupas, rock monasteries, and wild elephant roaming plains."
    },
    {
      id: "tour-wildlife-yala",
      title: "Wild Safari & Leopards of Yala",
      tag: "Wildlife Adventure",
      duration: "2 Days / 1 Night",
      distanceIncluded: "550 km Included",
      destinations: ["Colombo / Galle", "Udawalawe Elephant Transit", "Yala National Park", "Kataragama Sacred City", "Tissamaharama Lake"],
      image: "assets/images/tour-van.jpg",
      recommendedVehicle: "Premier SUV or Luxury Van",
      priceLKR: 68000,
      highlights: [
        "Early morning 4x4 Jeep Safari coordination",
        "Highest density of wild leopards in Asia",
        "Sloth bears, Asian elephants, crocodiles",
        "Scenic coastal return via Hambantota expressway",
        "Luggage assistance and 24/7 route coordination"
      ],
      description: "An exhilarating safari voyage into Yala’s untamed jungle sanctuaries, salt pans, and rugged coastline."
    },
    {
      id: "tour-airport-express-day",
      title: "Airport Transit & City Explorer",
      tag: "Quick Layover",
      duration: "1 Day (8 - 12 Hours)",
      distanceIncluded: "180 km Included",
      destinations: ["BIA Airport (Katunayake)", "Negombo Fish Market & Lagoon", "Colombo Lotus Tower", "Gangaramaya Temple", "Galle Face Green"],
      image: "assets/images/airport-car.jpg",
      recommendedVehicle: "Executive Prime Sedan",
      priceLKR: 24500,
      highlights: [
        "Flight arrival meet & greet with placard",
        "Luggage securely stored in trunk throughout",
        "Colombo shopping & dining stops (Ceylon tea & gems)",
        "Sunset on Galle Face Green promenade",
        "Timely guaranteed airport return for connecting flight"
      ],
      description: "Turn your airport layover into an unforgettable day excursion through vibrant streets, historic monuments, and coastal cuisine."
    }
  ],

  services: [
    {
      id: "airport-transfers",
      title: "Airport Express Transfers",
      icon: "fa-plane-arrival",
      badge: "24/7 Available",
      shortDesc: "Punctual meet & greet pickup at Bandaranaike International Airport (CMB/BIA) with real-time flight tracking.",
      details: "Never stress about delayed flights or late-night arrivals. Our chauffeurs monitor your flight status in real time, wait at the arrival concourse with a name placard, and assist with all heavy luggage."
    },
    {
      id: "islandwide-drops",
      title: "Islandwide One-Way & Round Drops",
      icon: "fa-route",
      badge: "Fixed Flat Rates",
      shortDesc: "Direct door-to-door transit to any city, district, hotel, or village across Sri Lanka without intermediate stops.",
      details: "Transparent per-kilometer calculation with zero hidden night surcharges. Travel directly to Kandy, Galle, Ella, Jaffna, or Trincomalee in air-conditioned comfort."
    },
    {
      id: "wedding-vip",
      title: "Wedding & VIP Luxury Chauffeur",
      icon: "fa-crown",
      badge: "Premium Experience",
      shortDesc: "Exquisite luxury cars, bespoke floral decor, and formally suited chauffeurs for your dream wedding day.",
      details: "Make an unforgettable grand entrance with our pristine white Mercedes-Benz, Toyota Premio, or luxury convoy packages designed for bride, groom, and bridal retinue."
    },
    {
      id: "curated-tours",
      title: "Bespoke Island Tour Chauffeurs",
      icon: "fa-compass",
      badge: "Tailor-Made Plans",
      shortDesc: "Experienced, English-speaking tourist drivers with deep local knowledge of hidden gems, culture, and nature.",
      details: "Custom-tailor your vacation itinerary. Your dedicated driver stays with you throughout your journey, recommending top dining spots, viewpoints, and cultural secrets."
    },
    {
      id: "corporate-shuttle",
      title: "Corporate Fleet & Staff Shuttles",
      icon: "fa-building",
      badge: "B2B Contracts",
      shortDesc: "Dedicated executive transportation, conference delegations, and daily employee staff shuttles with corporate GST billing.",
      details: "Empower your corporate guests and team with scheduled, GPS-monitored vans and sedans. Monthly billing statements and dedicated account managers available."
    },
    {
      id: "cargo-movers",
      title: "Goods Movers & Covered Trucks",
      icon: "fa-truck-moving",
      badge: "Safe Delivery",
      shortDesc: "Reliable covered container lorries and mini trucks for home relocation, office moves, and commercial cargo dispatch.",
      details: "Safe, weather-sealed transport with experienced loaders and cargo straps to ensure your fragile furniture, appliances, or stock arrive unharmed."
    }
  ],

  popularLocations: [
    { name: "Bandaranaike Intl Airport (CMB / BIA)", district: "Gampaha", distanceKm: 34, isAirport: true },
    { name: "Colombo Fort / City Center", district: "Colombo", distanceKm: 0, isCentral: true },
    { name: "Mount Lavinia", district: "Colombo", distanceKm: 14 },
    { name: "Negombo Beach & Town", district: "Gampaha", distanceKm: 38 },
    { name: "Kandy (Temple of Tooth)", district: "Kandy", distanceKm: 118 },
    { name: "Bentota / Induruwa", district: "Galle", distanceKm: 82 },
    { name: "Galle Fort", district: "Galle", distanceKm: 126 },
    { name: "Hikkaduwa Surf Beach", district: "Galle", distanceKm: 104 },
    { name: "Mirissa / Weligama", district: "Matara", distanceKm: 152 },
    { name: "Nuwara Eliya (Little England)", district: "Nuwara Eliya", distanceKm: 168 },
    { name: "Ella / Nine Arch Bridge", district: "Badulla", distanceKm: 215 },
    { name: "Sigiriya Rock Fortress", district: "Matale", distanceKm: 172 },
    { name: "Dambulla Royal Cave", district: "Matale", distanceKm: 154 },
    { name: "Anuradhapura Sacred City", district: "Anuradhapura", distanceKm: 206 },
    { name: "Yala National Park / Tissa", district: "Hambantota", distanceKm: 265 },
    { name: "Trincomalee / Nilaveli", district: "Trincomalee", distanceKm: 260 },
    { name: "Arugam Bay Surf Point", district: "Ampara", distanceKm: 320 },
    { name: "Jaffna City Center", district: "Jaffna", distanceKm: 395 }
  ],

  testimonials: [
    {
      name: "David & Sarah Jenkins",
      country: "United Kingdom",
      avatar: "fa-user-tie",
      rating: 5,
      route: "BIA Airport to Kandy & Ella (5 Days)",
      quote: "Zenith Cabs made our Sri Lankan holiday completely stress-free! Our driver, Mr. Samantha, was extremely courteous, drove smoothly on winding mountain roads, and pointed out scenic waterfalls we would have missed."
    },
    {
      name: "Pradeep Wickramasinghe",
      country: "Colombo, Sri Lanka",
      avatar: "fa-user",
      rating: 5,
      route: "Colombo to Galle Expressway One-Way",
      quote: "Booked a Prime Sedan for an urgent client conference in Galle. The car was spotless, arrived 10 minutes ahead of schedule, and the fixed highway quote was genuinely transparent without any hidden charges."
    },
    {
      name: "Elena Rostova",
      country: "Germany",
      avatar: "fa-user-nurse",
      rating: 5,
      route: "Airport Express Meet & Greet",
      quote: "Our midnight flight was delayed by 2 hours, but Zenith's dispatch team tracked our flight and our driver was waiting right outside the terminal with a warm smile and cold bottled water. 10/10 service!"
    },
    {
      name: "Rohan & Tashia Fernando",
      country: "Melbourne, Australia",
      avatar: "fa-heart",
      rating: 5,
      route: "Wedding Chauffeur & Family Van Fleet",
      quote: "We hired their VIP High-Roof Van and luxury sedan for our overseas destination wedding. Pristine vehicles, well-dressed chauffeurs, and effortless coordination across multiple hotel pickups."
    }
  ],

  faqs: [
    {
      q: "How does Zenith Cabs calculate trip fares?",
      a: "Our fares are calculated transparently based on vehicle category and total travel distance. Each vehicle class has a base fare covering initial kilometers, followed by a flat rate per kilometer. Expressway toll charges are stated separately with no surprise surcharges."
    },
    {
      q: "Can I book a ride in advance for airport pickups?",
      a: "Yes! Advance reservations are recommended for airport arrivals and departures. Provide your flight number during booking, and our dispatch desk will monitor live radar tracking so your chauffeur is ready even if your flight lands early or delayed."
    },
    {
      q: "Are the vehicles air-conditioned and insured?",
      a: "100% of the Zenith fleet features modern air-conditioning (dual A/C on passenger vans and coaches). All vehicles carry comprehensive commercial passenger insurance, and chauffeurs undergo mandatory background checks."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Cash (LKR, USD, EUR, GBP), Major Credit/Debit Cards (Visa, Mastercard), Bank Transfer, and QR payment methods directly with the chauffeur upon trip completion."
    },
    {
      q: "How do I register as an owner-driver with Zenith Cabs?",
      a: "Vehicle owners and commercial chauffeurs can apply online via our 'Driver Partner' section. We offer weekly settlements, high trip volumes, and flexible shift schedules."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ZENITH_DATA;
}
