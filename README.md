# AI KDP Publishing Factory

> A full-stack production dashboard for running an AI-assisted Kindle Direct Publishing (KDP) ebook pipeline — track book projects from idea to publish-ready manuscript, cover and metadata, all in one place.

**Author:** Hamid Ansari ([@itshamiz01](https://github.com/itshamiz01)) — software engineer building AI systems and full-stack products.

---

## About this project

Publishing ebooks on Amazon KDP means juggling manuscripts, covers, titles, keywords and categories across dozens of files. The AI KDP Publishing Factory organises that work as a factory line: every book is a **project** with a status, and every project collects its **outputs** — manuscript, cover image and publishing metadata — in a database-backed dashboard.

## What it does

- ✅ Create and track ebook projects with production status
- ✅ Store each project's outputs — manuscript, cover image and KDP metadata — linked to the project
- ✅ REST API for project and output management
- ✅ Dashboard UI for viewing the whole catalogue at a glance
- ✅ SQLite persistence — zero-config, runs anywhere Node runs

## Architecture

```
├── backend/
│   └── index.js          # Express API (port 3000) + SQLite database
│                         # Tables: projects, outputs (manuscript, cover_image, metadata)
└── frontend/
    └── gui/              # React 18 + TypeScript dashboard (port 3001)
        └── src/
            ├── App.tsx
            └── components/Dashboard.tsx
```

## Run it locally

```bash
# Backend — Express + SQLite
cd backend
npm install
node index.js             # API on http://localhost:3000

# Frontend — React dashboard
cd frontend/gui
npm install
npm start                 # UI on http://localhost:3001
```

## Tech stack

Node.js · Express · SQLite · React 18 · TypeScript · Create React App

## Status

Working prototype of the publishing-factory concept. In the author's current workflow the factory's job — producing complete, publish-ready ebook packages (manuscript PDF, cover, metadata) — runs daily, with the human publisher uploading each finished book to KDP.

## License

Use at your own risk for your own publishing projects. Amazon KDP is a trademark of Amazon; this project is not affiliated with Amazon.
