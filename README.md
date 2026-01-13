# Art Institute Art Table

## Overview
This project is a React application built using TypeScript and Vite. It displays artwork data from the Art Institute of Chicago API in a tabular format.

The application focuses on implementing server-side pagination along with persistent row selection across pages, without prefetching or storing data from other pages.

---

## Tech Stack
- React
- TypeScript
- Vite
- PrimeReact

---

## Features
- Server-side pagination using the Art Institute of Chicago API
- Data table implemented with PrimeReact DataTable
- Checkbox-based row selection
- Persistent row selection across page navigation
- Custom bulk row selection using an overlay panel
- Selection handled using artwork IDs instead of storing row objects
- No prefetching of data from other pages

---

## Project Structure
src/
├── api/
│ └── artworks.ts
├── components/
│ ├── ArtTable.tsx
│ └── SelectOverlay.tsx
├── types/
│ └── artwork.ts
├── App.tsx
├── main.tsx
└── index.css