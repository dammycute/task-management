# Task Management Dashboard

A minimal React + Vite implementation of a Kanban-style task dashboard with drag-and-drop, realtime sync across tabs (BroadcastChannel), filtering, animations, and dark mode.

## Setup

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Open http://localhost:5173/ (or the address Vite prints).

Notes:
- Uses `react-beautiful-dnd` for drag-and-drop.
- Realtime updates are via `BroadcastChannel` (works across tabs in same browser).
- Dark mode and state persist in `localStorage`.
