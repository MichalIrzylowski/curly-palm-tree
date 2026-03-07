# Map & Directions Section Tasks

## M-01: Embed map centred on clinic coordinates
- **Priority:** Must
- **Coordinates:** `54.4472595, 18.5504898` (ul. 23 Marca 32E, Sopot)
- **Acceptance Criteria:** Map renders with a visible pin at the clinic location; surrounding streets are shown
- **Status:** Pending
- **Depends On:** Contact global (M1) — `lat` and `lng` fields
- **Note:** Preferred implementation is OpenStreetMap via `react-leaflet`; fallback is a static OSM `<iframe>` (OQ-01)

## M-02: Map is interactive (Leaflet path)
- **Priority:** Should
- **Acceptance Criteria:** User can zoom and pan; pin shows a popup with clinic name and address
- **Status:** Pending
- **Note:** Only applies if `react-leaflet` is chosen in OQ-01; skip if using iframe fallback

## M-03: "Get directions" button opens native maps
- **Priority:** Must
- **Link format:** `geo:54.4472595,18.5504898` URI with Google Maps URL as fallback (`https://maps.google.com/?q=54.4472595,18.5504898`)
- **Acceptance Criteria:** Button present; opens device maps app on mobile; opens Google Maps in browser on desktop
- **Status:** Pending
- **Depends On:** Contact global (M1) — `lat` and `lng` fields

## M-04: Map is responsive
- **Priority:** Must
- **Acceptance Criteria:** Map fills its container width at 375 px and 1440 px without horizontal scroll or overflow; height is fixed or proportional
- **Status:** Pending

## M-05: Graceful fallback when JS is disabled
- **Priority:** Should
- **Acceptance Criteria:** A static OSM `<iframe>` or plain address text is shown inside `<noscript>` so users without JS still see the location
- **Status:** Pending
