# Sumukha Technology — Next.js + React

Responsive dark website for currency counting machines, sorting machines and fake note detectors. Rebuilt with Next.js App Router and React components.

## Included

- Interactive native WebGL previews with drag rotation, zoom, keyboard controls and reset
- Actual product photos with a photo-view option
- React product selection, category filters, mobile navigation and location enquiries
- Kundapur, Udupi, Mangalore, Shivamogga and Bhatkal
- Email enquiry preparation and telephone contact links
- No automatic animations or displayed prices

The 3D models are illustrative. Product photos show the actual appearance. The enquiry form opens the visitor’s email app; it does not send email directly.

## Run locally

Install Node.js 20.9 or newer. Node.js 25 is supported by the project’s version requirement.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Press Ctrl+C to stop.

## Production build

```sh
npm run build
npm start
```

This project exports a static production site to `out/`. `npm start` serves that production output locally. Build first.

## Vercel

Import this GitHub repository, select the Next.js framework preset, and keep the default `npm run build` command. Remove any old output-directory override such as `.` that was used for the HTML version. Next.js handles the static export.

## Project structure

- `app/layout.jsx`: document metadata and shared styles
- `app/page.jsx`: homepage route
- `app/globals.css`: dark theme and responsive layouts
- `components/Home.jsx`: React page, filters, product selection and enquiry form
- `components/MachineViewer.jsx`: React-managed 3D viewer and photo mode
- `lib/catalog.js`: products, locations and enquiry formatting
- `lib/machine-geometry.js`: illustrative 3D mesh data
- `lib/create-viewer.js`: WebGL renderer with lifecycle cleanup
- `public/assets/`: product photos and logo
- `scripts/serve.mjs`: local static production server

Browser graphics APIs are initialized after the React component mounts. Renderer resources and event handlers are cleaned up when it unmounts. Rendering occurs on interaction or resize, with no continuous animation loop.
