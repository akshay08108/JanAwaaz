# JanAwaaz

JanAwaaz is an independent civic-issue platform prototype where residents can report local service problems, verify shared impact, track resolution status, and find the correct official escalation route.

> JanAwaaz is not affiliated with any government department or political party. It does not replace filing an official grievance.

## Features

- Civic-issue feed with category and status filters
- List and neighborhood-map views
- Evidence, location, affected-person and verification signals
- Real image uploads with previews, mobile camera capture, and desktop live camera
- Browser GPS capture with manual landmark fallback (no API key required)
- Report → review → publish workflow
- Identity-privacy control and responsible-reporting declaration
- Official CPGRAMS escalation link
- Persistent demo data through browser local storage
- Responsive desktop and mobile interface

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Create a GitHub repository and upload this project.
2. In Vercel, choose **Add New → Project**.
3. Import the GitHub repository.
4. Keep build command `npm run build` and output directory `dist`.
5. Deploy.

No environment variables are required for this prototype.

Camera and GPS require a secure origin. They work on `localhost` during development and on Vercel over HTTPS. Users must grant browser permission. A map API is not required for capturing coordinates; add Google Maps, Mapbox, or another geocoding provider later if you want address autocomplete and reverse-geocoded street names.

## Before a public launch

Replace local-storage persistence with an authenticated database, add moderation and abuse-reporting tools, publish privacy and takedown policies, appoint a grievance contact, secure evidence uploads, and obtain legal review for Indian intermediary and data-protection compliance.

## Stack

- React
- Vite
- Tailwind CSS v4
- Lucide icons
