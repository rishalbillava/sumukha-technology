# Sumukha Technology

Responsive dark website for currency counting machines, cash sorting machines and fake note detectors.

## Features

- Interactive native WebGL 3D previews with rotation, zoom and reset controls
- Actual product photos and category filters
- Kundapur, Udupi, Mangalore, Shivamogga and Bhatkal location enquiries
- Email enquiry preparation and telephone contact links
- No automatic animations and no displayed prices

The 3D models are illustrative previews. Use product photos for the actual appearance. The enquiry form opens the visitor’s email app; it does not send email directly.

## Run locally

Requires Node.js 18 or newer. This project has no npm dependencies.

From this directory, run:

```sh
npm run dev
```

Then open http://localhost:3000. Press Ctrl+C to stop the server.

`npm start` also works. No `npm install` is required.

Python alternative: `python -m http.server 3000` (or `py -m http.server 3000` on Windows).

## Publish

Upload this directory to a static web host. The root `index.html` is the entry point. On Vercel, use framework preset **Other**, leave the build command empty, and use `.` as the output directory.

## Edit

- `index.html`: content, contact details and forms
- `style.css`: dark theme and responsive layouts
- `app.js`: product selection, filters and email enquiry
- `scene3d.js`: illustrative 3D geometry
- `viewer3d.js`: WebGL viewer and controls
- `assets/`: product photos and company logo
