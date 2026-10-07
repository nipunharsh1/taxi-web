/**
 * ZENITH CABS & LUXURY TOURS
 * Main Application Logic & User Interaction Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    theme: localStorage.getItem("zenith_theme") || "dark",
    currentCurrency: "LKR",
    selectedTripType: "oneway",
    selectedVehicleId: "sedan",
    sliderDistanceKm: 75,
    lastBooking: null
  };

  // DOM Elements
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const currencySelect = document.getElementById("currency-select");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const distanceSlider = document.getElementById("distance-slider");
  const sliderKmValue = document.getElementById("slider-km-value");
  const bookingForm = document.getElementById("ride-booking-form");
  const tripTabs = document.querySelectorAll(".trip-tab-btn");
  const fleetFilterBtns = document.querySelectorAll(".fleet-filter-btn");
  const fleetContainer = document.getElementById("fleet-cards-grid");
  const toursContainer = document.getElementById("tours-cards-grid");
  const calcRatesContainer = document.getElementById("calc-rates-grid");
  const pickupInput = document.getElementById("pickup-location");
  const dropInput = document.getElementById("dropoff-location");
  const pickupDatalist = document.getElementById("locations-datalist");
  const driverForm = document.getElementById("driver-register-form");
  const lookupForm = document.getElementById("booking-lookup-form");

  // Format price helper
  function formatMoney(amountLKR) {
    const cur = ZENITH_DATA.currencies[state.currentCurrency];
    const converted = amountLKR * cur.rate;
    if (state.currentCurrency === "LKR") {
      return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${cur.symbol}${converted.toFixed(2)}`;
  }

  // Set Theme
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("zenith_theme", theme);
    const icon = themeToggleBtn.querySelector("i");
    if (theme === "light") {
      icon.className = "fas fa-moon";
      themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
    } else {
      icon.className = "fas fa-sun";
      themeToggleBtn.setAttribute("title", "Switch to Light Mode");
    }
  }

  if (themeToggleBtn) {
    applyTheme(state.theme);
    themeToggleBtn.addEventListener("click", () => {
      applyTheme(state.theme === "dark" ? "light" : "dark");
    });
  }

  // Populate Location Datalists
  function initLocations() {
    if (!pickupDatalist) return;
    pickupDatalist.innerHTML = "";
    ZENITH_DATA.popularLocations.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc.name;
      pickupDatalist.appendChild(opt);
    });
  }

  // Render Fleet in Booking Widget
  function renderBookingVehicleOptions() {
    const container = document.getElementById("booking-vehicle-choices");
    if (!container) return;

    container.innerHTML = "";
    ZENITH_DATA.fleet.forEach(vehicle => {
      const isSelected = vehicle.id === state.selectedVehicleId;
      const card = document.createElement("div");
      card.className = `vehicle-option-card ${isSelected ? "selected" : ""}`;
      card.dataset.id = vehicle.id;

      card.innerHTML = `
        <h5>${vehicle.name}</h5>
        <div class="capacity-text">
          <i class="fas fa-user-friends"></i> ${vehicle.seats} Seats &nbsp;|&nbsp; 
          <i class="fas fa-suitcase"></i> ${vehicle.luggage} Bags
        </div>
        <div class="fare-preview">From ${formatMoney(vehicle.baseFare)}</div>
      `;

      card.addEventListener("click", () => {
        state.selectedVehicleId = vehicle.id;
        document.querySelectorAll(".vehicle-option-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        updateBookingEstimate();
      });

      container.appendChild(card);
    });
  }

  // Update Booking Engine Live Fare Estimate
  function updateBookingEstimate() {
    const pickupVal = pickupInput ? pickupInput.value.trim() : "";
    const dropVal = dropInput ? dropInput.value.trim() : "";

    let estimatedDistance = 35; // Default standard city estimate

    const pLoc = ZENITH_DATA.popularLocations.find(l => l.name.toLowerCase() === pickupVal.toLowerCase());
    const dLoc = ZENITH_DATA.popularLocations.find(l => l.name.toLowerCase() === dropVal.toLowerCase());

    if (pLoc && dLoc) {
      estimatedDistance = Math.abs(pLoc.distanceKm - dLoc.distanceKm) + 15;
    } else if (pLoc) {
      estimatedDistance = Math.max(25, pLoc.distanceKm);
    } else if (dLoc) {
      estimatedDistance = Math.max(25, dLoc.distanceKm);
    }

    const vehicle = ZENITH_DATA.fleet.find(v => v.id === state.selectedVehicleId) || ZENITH_DATA.fleet[1];
    let multiplier = 1;
    if (state.selectedTripType === "roundtrip") multiplier = 1.85;
    if (state.selectedTripType === "rental") multiplier = 2.4;

    const extraKm = Math.max(0, estimatedDistance - vehicle.baseKm);
    const fare = Math.round((vehicle.baseFare + (extraKm * vehicle.ratePerKm)) * multiplier);

    const amountDisplay = document.getElementById("booking-estimated-price");
    const distanceDisplay = document.getElementById("booking-estimated-distance");

    if (amountDisplay) amountDisplay.textContent = formatMoney(fare);
    if (distanceDisplay) {
      distanceDisplay.textContent = `Est. Distance: ~${estimatedDistance} km (${state.selectedTripType.toUpperCase()})`;
    }

    return { fare, distance: estimatedDistance, vehicle };
  }

  // Render Fleet Showcase Cards
  function renderFleetShowcase(filter = "all") {
    if (!fleetContainer) return;
    fleetContainer.innerHTML = "";

    const filtered = filter === "all" 
      ? ZENITH_DATA.fleet 
      : ZENITH_DATA.fleet.filter(v => v.category === filter);

    filtered.forEach(car => {
      const card = document.createElement("article");
      card.className = "fleet-card";
      card.innerHTML = `
        <div class="fleet-card-img-wrapper">
          <img src="${car.image}" alt="${car.name} - Zenith Cabs Fleet" loading="lazy">
          <span class="fleet-badge">${car.badge}</span>
          <span class="fleet-rate-badge">${formatMoney(car.ratePerKm)}/km</span>
        </div>
        <div class="fleet-card-body">
          <h3 class="fleet-card-title">${car.name}</h3>
          <p class="fleet-card-models">${car.models}</p>
          <div class="fleet-specs-grid">
            <div class="spec-cell"><i class="fas fa-users"></i> ${car.seats} Passengers</div>
            <div class="spec-cell"><i class="fas fa-suitcase-rolling"></i> ${car.luggage} Luggage</div>
            <div class="spec-cell"><i class="fas fa-snowflake"></i> ${car.acType}</div>
            <div class="spec-cell"><i class="fas fa-tachometer-alt"></i> Min ${car.baseKm}km Base</div>
          </div>
          <div class="fleet-features-tags">
            ${car.features.map(f => `<span class="feature-tag">${f}</span>`).join("")}
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            ${car.description}
          </p>
          <div class="fleet-card-footer">
            <button class="btn btn-primary btn-sm fleet-select-btn" data-id="${car.id}" style="width: 100%;">
              <i class="fas fa-calendar-check"></i> Book This Vehicle
            </button>
          </div>
        </div>
      `;

      card.querySelector(".fleet-select-btn").addEventListener("click", () => {
        state.selectedVehicleId = car.id;
        renderBookingVehicleOptions();
        updateBookingEstimate();
        const bookingSection = document.getElementById("booking-engine-section");
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: "smooth" });
        }
      });

      fleetContainer.appendChild(card);
    });
  }

  // Render Tour Packages Grid
  function renderTourPackages() {
    if (!toursContainer) return;
    toursContainer.innerHTML = "";

    ZENITH_DATA.tourPackages.forEach(tour => {
      const card = document.createElement("article");
      card.className = "tour-card";
      card.innerHTML = `
        <div class="tour-img-wrapper">
          <img src="${tour.image}" alt="${tour.title}" loading="lazy">
          <span class="tour-duration-tag"><i class="far fa-clock"></i> ${tour.duration}</span>
        </div>
        <div class="tour-card-body">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span class="section-badge" style="margin-bottom:0; font-size:0.75rem;">${tour.tag}</span>
            <span style="font-size:0.8rem; color:var(--text-muted);"><i class="fas fa-road"></i> ${tour.distanceIncluded}</span>
          </div>
          <h3 class="tour-title">${tour.title}</h3>
          <div class="tour-destinations-list">
            ${tour.destinations.map(d => `<span class="dest-badge"><i class="fas fa-map-marker-alt" style="color:var(--accent-gold); font-size:0.7rem;"></i> ${d}</span>`).join("")}
          </div>
          <ul class="tour-highlights-list">
            ${tour.highlights.slice(0, 3).map(h => `<li><i class="fas fa-check-circle"></i> ${h}</li>`).join("")}
          </ul>
          <div class="tour-card-footer">
            <div class="tour-price-box">
              <span class="price-label">Starting From</span>
              <div class="price-val">${formatMoney(tour.priceLKR)}</div>
            </div>
            <button class="btn btn-secondary btn-sm tour-book-btn" data-id="${tour.id}">
              <i class="fas fa-compass"></i> Reserve Tour
            </button>
          </div>
        </div>
      `;

      card.querySelector(".tour-book-btn").addEventListener("click", () => {
        openTourModal(tour);
      });

      toursContainer.appendChild(card);
    });
  }

  // Render Interactive Distance Calculator Cards
  function updateCalculatorRates() {
    if (!calcRatesContainer) return;
    const km = parseInt(distanceSlider.value, 10);
    if (sliderKmValue) sliderKmValue.textContent = km;

    calcRatesContainer.innerHTML = "";
    ZENITH_DATA.fleet.slice(0, 4).forEach((car, index) => {
      const extraKm = Math.max(0, km - car.baseKm);
      const totalCost = car.baseFare + (extraKm * car.ratePerKm);

      const card = document.createElement("div");
      card.className = `calc-rate-card ${index === 1 ? "featured" : ""}`;
      card.innerHTML = `
        <div class="calc-car-name">${car.name}</div>
        <div class="calc-car-km-rate">Rate: ${formatMoney(car.ratePerKm)}/km</div>
        <div class="calc-car-price">${formatMoney(totalCost)}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Includes base ${car.baseKm}km allowance
        </div>
        <button class="btn btn-secondary btn-sm calc-pick-btn" data-id="${car.id}" style="width: 100%;">
          Select & Book
        </button>
      `;

      card.querySelector(".calc-pick-btn").addEventListener("click", () => {
        state.selectedVehicleId = car.id;
        renderBookingVehicleOptions();
        updateBookingEstimate();
        const bookingSection = document.getElementById("booking-engine-section");
        if (bookingSection) bookingSection.scrollIntoView({ behavior: "smooth" });
      });

      calcRatesContainer.appendChild(card);
    });
  }

  // FAQ Accordion Toggle
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const btn = item.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach(i => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });
  }

  // Modals Controller
  const modalOverlay = document.getElementById("generic-modal");
  const modalBody = document.getElementById("generic-modal-body");
  const modalClose = document.getElementById("generic-modal-close");

  function openModal(htmlContent) {
    if (!modalOverlay || !modalBody) return;
    modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add("active");
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Tour Detail Modal
  function openTourModal(tour) {
    const content = `
      <div style="text-align: left;">
        <span class="section-badge">${tour.tag}</span>
        <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;">${tour.title}</h2>
        <p style="color: var(--accent-gold); font-weight: 700; margin-bottom: 1rem;">
          <i class="far fa-clock"></i> ${tour.duration} &nbsp;|&nbsp; <i class="fas fa-road"></i> ${tour.distanceIncluded}
        </p>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
          ${tour.description}
        </p>
        <h4 style="margin-bottom: 0.75rem; color: var(--text-primary);">Full Itinerary Highlights:</h4>
        <ul style="list-style: none; margin-bottom: 1.5rem;">
          ${tour.highlights.map(h => `<li style="padding: 0.35rem 0; color: var(--text-secondary); display:flex; gap:0.5rem;"><i class="fas fa-check" style="color:var(--accent-emerald);"></i> ${h}</li>`).join("")}
        </ul>
        <div style="background: var(--bg-surface-elevated); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <div style="font-size: 0.85rem; color: var(--text-muted);">Package Price Quote</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-gold);">${formatMoney(tour.priceLKR)}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">Includes dedicated tourist vehicle, fuel, highway tolls & chauffeur accommodation</div>
        </div>
        <div style="display:flex; gap: 1rem; flex-wrap:wrap;">
          <a href="https://wa.me/${ZENITH_DATA.brand.whatsappNumber}?text=${encodeURIComponent('Hello Zenith Cabs, I would like to book the tour package: ' + tour.title)}" target="_blank" class="btn btn-primary" style="flex:1;">
            <i class="fab fa-whatsapp"></i> Book via WhatsApp
          </a>
          <a href="tel:${ZENITH_DATA.brand.hotline.replace(/\s+/g, '')}" class="btn btn-secondary">
            <i class="fas fa-phone-alt"></i> Call Dispatch
          </a>
        </div>
      </div>
    `;
    openModal(content);
  }

  // Handle Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const pickup = pickupInput ? pickupInput.value.trim() : "";
      const drop = dropInput ? dropInput.value.trim() : "";
      const date = document.getElementById("booking-date")?.value || "Today";
      const time = document.getElementById("booking-time")?.value || "Immediate";
      const name = document.getElementById("passenger-name")?.value.trim() || "Guest Traveler";
      const phone = document.getElementById("passenger-phone")?.value.trim() || "";
      const passengers = document.getElementById("passenger-count")?.value || "1";
      const notes = document.getElementById("booking-notes")?.value || "";

      if (!pickup || !drop || !phone) {
        alert("Please complete the Pickup, Drop-off locations and Contact Phone Number.");
        return;
      }

      const { fare, distance, vehicle } = updateBookingEstimate();
      const bookingRef = "ZN-" + Math.floor(100000 + Math.random() * 900000);

      const bookingRecord = {
        ref: bookingRef,
        name,
        phone,
        pickup,
        drop,
        date,
        time,
        passengers,
        vehicle: vehicle.name,
        tripType: state.selectedTripType.toUpperCase(),
        distance: distance + " km",
        fare: formatMoney(fare),
        fareRaw: fare,
        notes,
        status: "CONFIRMED & CHAUFFEUR ASSIGNED",
        driverAssigned: "K. Samantha Silva (Toyota Executive Prime - WP CAD-7788)",
        driverContact: "+94 77 982 1100"
      };

      state.lastBooking = bookingRecord;
      localStorage.setItem("zenith_last_booking", JSON.stringify(bookingRecord));

      // Show Voucher Modal
      const voucherHtml = `
        <div style="text-align: left;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem; margin-bottom:1.25rem;">
            <div>
              <span class="section-badge" style="margin-bottom:0.25rem;">RESERVATION CONFIRMED</span>
              <h2 style="font-size:1.5rem; margin-top:0.25rem;">Booking Voucher</h2>
            </div>
            <div style="text-align:right;">
              <span style="font-size:0.75rem; color:var(--text-muted);">REF CODE</span>
              <div style="font-size:1.25rem; font-weight:800; color:var(--accent-gold);">${bookingRef}</div>
            </div>
          </div>

          <div style="background:var(--bg-surface-elevated); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1.25rem; display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.875rem;">
            <div><strong style="color:var(--text-muted);">Passenger:</strong> ${name}</div>
            <div><strong style="color:var(--text-muted);">Contact:</strong> ${phone}</div>
            <div><strong style="color:var(--text-muted);">Pickup:</strong> ${pickup}</div>
            <div><strong style="color:var(--text-muted);">Drop-off:</strong> ${drop}</div>
            <div><strong style="color:var(--text-muted);">Date & Time:</strong> ${date} at ${time}</div>
            <div><strong style="color:var(--text-muted);">Vehicle Class:</strong> ${vehicle.name}</div>
          </div>

          <div style="background:rgba(16, 185, 129, 0.1); border:1px solid var(--accent-emerald); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem; font-size:0.85rem;">
            <div style="color:var(--accent-emerald); font-weight:700; margin-bottom:0.25rem;">
              <i class="fas fa-id-badge"></i> Assigned Chauffeur & Vehicle
            </div>
            <div style="color:var(--text-primary);">${bookingRecord.driverAssigned}</div>
            <div style="color:var(--text-secondary); font-size:0.8rem;">Direct Mobile: ${bookingRecord.driverContact}</div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; background:rgba(245,158,11,0.08); padding:1rem; border-radius:var(--radius-md);">
            <div>
              <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Total Estimated Fare</span>
              <div style="font-size:1.6rem; font-weight:800; color:var(--accent-gold);">${formatMoney(fare)}</div>
            </div>
            <span style="font-size:0.8rem; color:var(--text-secondary); text-align:right;">Cash / Card / QR to Chauffeur</span>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="https://wa.me/${ZENITH_DATA.brand.whatsappNumber}?text=${encodeURIComponent('Hi Zenith Cabs, here is my booking confirmation ' + bookingRef + ' for ' + name + ' from ' + pickup + ' to ' + drop)}" target="_blank" class="btn btn-primary" style="flex:1;">
              <i class="fab fa-whatsapp"></i> Send to WhatsApp Dispatch
            </a>
            <button class="btn btn-secondary" onclick="window.print()">
              <i class="fas fa-print"></i> Print Voucher
            </button>
          </div>
        </div>
      `;

      openModal(voucherHtml);
      bookingForm.reset();
      updateBookingEstimate();
    });
  }

  // Trip Tabs Switcher
  tripTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tripTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.selectedTripType = tab.dataset.trip;
      updateBookingEstimate();
    });
  });

  // Fleet Filter Buttons
  fleetFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      fleetFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderFleetShowcase(btn.dataset.category);
    });
  });

  // Distance Slider Event
  if (distanceSlider) {
    distanceSlider.addEventListener("input", () => {
      updateCalculatorRates();
    });
  }

  // Currency Switcher Event
  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      state.currentCurrency = e.target.value;
      renderBookingVehicleOptions();
      updateBookingEstimate();
      renderFleetShowcase(document.querySelector(".fleet-filter-btn.active")?.dataset.category || "all");
      renderTourPackages();
      updateCalculatorRates();
    });
  }

  // Location Autocomplete listener
  if (pickupInput) pickupInput.addEventListener("input", updateBookingEstimate);
  if (dropInput) dropInput.addEventListener("input", updateBookingEstimate);

  // Driver Registration Form
  if (driverForm) {
    driverForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dName = document.getElementById("driver-name")?.value.trim();
      const dPhone = document.getElementById("driver-phone")?.value.trim();
      const dCar = document.getElementById("driver-vehicle-model")?.value.trim();
      const dPlate = document.getElementById("driver-plate-number")?.value.trim();

      const regId = "DRV-" + Math.floor(1000 + Math.random() * 9000);

      const successHtml = `
        <div style="text-align: left;">
          <div style="width:50px; height:50px; border-radius:50%; background:rgba(16,185,129,0.15); color:var(--accent-emerald); display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin-bottom:1rem;">
            <i class="fas fa-check"></i>
          </div>
          <h2 style="font-size:1.5rem; margin-bottom:0.5rem;">Partner Application Submitted!</h2>
          <p style="color:var(--text-secondary); margin-bottom:1.25rem;">
            Thank you, <strong>${dName}</strong>. Your driver onboarding application has been registered under Application ID: 
            <span style="color:var(--accent-gold); font-weight:800;">#${regId}</span>.
          </p>
          <div style="background:var(--bg-surface-elevated); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1.5rem; font-size:0.875rem;">
            <div><strong>Vehicle:</strong> ${dCar} (${dPlate})</div>
            <div><strong>Contact:</strong> ${dPhone}</div>
            <div><strong>Next Step:</strong> Our Fleet Operations Desk will contact you within 24 hours for vehicle inspection and document verification.</div>
          </div>
          <button class="btn btn-primary" onclick="document.getElementById('generic-modal-close').click()" style="width:100%;">
            Done
          </button>
        </div>
      `;
      openModal(successHtml);
      driverForm.reset();
    });
  }

  // Booking Lookup Tool
  if (lookupForm) {
    lookupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchRef = document.getElementById("lookup-ref-input")?.value.trim().toUpperCase();

      const saved = localStorage.getItem("zenith_last_booking");
      let record = saved ? JSON.parse(saved) : null;

      if (!record || (searchRef && record.ref !== searchRef && record.phone !== searchRef)) {
        // Mock fallback record for quick testing
        record = {
          ref: searchRef || "ZN-892401",
          name: "Verified Traveler",
          phone: "+94 77 123 4567",
          pickup: "Colombo Fort Railway Station",
          drop: "Kandy Cultural Center",
          date: "Upcoming Trip",
          time: "10:30 AM",
          passengers: "2 Adults",
          vehicle: "Executive Prime Sedan",
          tripType: "ONE-WAY TRANSFER",
          distance: "118 km",
          fare: formatMoney(16500),
          status: "DISPATCHED & ON ROUTE",
          driverAssigned: "M. Nimal Perera (Toyota Axio Hybrid - WP CAS-8910)",
          driverContact: "+94 71 889 4433"
        };
      }

      const lookupHtml = `
        <div style="text-align: left;">
          <span class="section-badge"><i class="fas fa-search-location"></i> RIDE STATUS</span>
          <h2 style="font-size:1.5rem; margin-top:0.25rem; margin-bottom:1rem;">Booking Details</h2>
          <div style="background:var(--bg-surface-elevated); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1.25rem; font-size:0.875rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
              <span>Booking Ref: <strong style="color:var(--accent-gold);">${record.ref}</strong></span>
              <span style="color:var(--accent-emerald); font-weight:700;"><i class="fas fa-check-circle"></i> ACTIVE</span>
            </div>
            <div><strong>Route:</strong> ${record.pickup} &rarr; ${record.drop}</div>
            <div><strong>Vehicle:</strong> ${record.vehicle}</div>
            <div><strong>Estimated Fare:</strong> <span style="color:var(--accent-gold); font-weight:700;">${record.fare}</span></div>
          </div>
          <div style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem; font-size:0.85rem;">
            <div style="font-weight:700; color:var(--accent-emerald); margin-bottom:0.25rem;">Chauffeur Assigned:</div>
            <div>${record.driverAssigned}</div>
            <div style="color:var(--text-secondary);">Direct Mobile: ${record.driverContact}</div>
          </div>
          <div style="display:flex; gap:1rem;">
            <a href="tel:${record.driverContact.replace(/\s+/g, '')}" class="btn btn-primary" style="flex:1;">
              <i class="fas fa-phone-alt"></i> Call Chauffeur
            </a>
            <button class="btn btn-secondary" onclick="document.getElementById('generic-modal-close').click()">
              Close
            </button>
          </div>
        </div>
      `;
      openModal(lookupHtml);
    });
  }

  // Mobile Nav Toggle
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    // Close menu when a navigation link is clicked
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  // Pre-fill Date & Time inputs
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const hours = String(now.getHours() + 1).padStart(2, "0");
  const mins = "00";
  const dateInput = document.getElementById("booking-date");
  const timeInput = document.getElementById("booking-time");
  if (dateInput) dateInput.value = dateStr;
  if (timeInput) timeInput.value = `${hours}:${mins}`;

  // Initial Boot
  initLocations();
  renderBookingVehicleOptions();
  updateBookingEstimate();
  renderFleetShowcase("all");
  renderTourPackages();
  updateCalculatorRates();
  initFaqAccordion();
});
