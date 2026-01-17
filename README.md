# DevBoard 🚀
### Premium Local-First Task Management for Developers

DevBoard is a high-performance, developer-centric Kanban dashboard designed to manage multiple repositories and tasks with zero backend dependencies. It combines a sleek, dark-moded terminal aesthetic with powerful real-time synchronization features.

## ✨ Key Features

- 👨‍💻 **Developer Focused**: Personalized labels like `git commit`, `grep tasks`, and `sudo: enabled` profile status.
- 🗄️ **Multi-Repository Support**: Create, manage, and switch between multiple independent projects (repositories) from a centralized sidebar.
- ⚡ **Local-First Architecture**: Powered by `localStorage` for instant persistence and `BroadcastChannel` API for real-time synchronization across multiple browser tabs.
- 🎯 **Advanced Task Management**: 
  - Dynamic Kanban columns (Add/Delete sections).
  - Detailed task descriptions with monospace technical formatting.
  - Priority levels (`Critical`, `High`, `Medium`, `Low`) and Progress tracking.
  - Smart View/Edit modes for non-intrusive browsing.
- 🔍 **Real-time Filtering**: "Grep" your tasks by title, priority, owner, or tag instantly.
- 🎨 **Premium UI/UX**: Glassmorphism effects, smooth `framer-motion` animations, and a curated developer color palette.

## 🛠️ Tech Stack

- **Core**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State/Sync**: Browser `localStorage` & `BroadcastChannel` APIs

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   git clone https://github.com/dammycute/task-management.git
   cd task-management
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── components/
│   ├── Board.jsx       # Main Kanban logic
│   ├── Column.jsx      # Individual section container
│   ├── TaskCard.jsx    # Highly interactive task item
│   ├── Modal.jsx       # Reusable premium modal system
│   ├── Sidebar.jsx     # Repository & Profile management
│   ├── Header.jsx      # Project context & Search
│   ├── Filters.jsx     # Functional grep/filter system
│   └── Footer.jsx      # Real-time status indicators
├── App.jsx             # Global State & Multi-project orchestration
└── main.jsx            # Entry point
```

## 📝 License

This project is open-source and ready for your local development workflow.

---
*Built with ❤️ for Developers who love the Terminal aesthetic.*
