# node-based-editor

# 🧠 Node-Based Workflow Editor

A drag-and-drop interface for building data processing pipelines using React Flow. Supports custom nodes, light/dark mode toggling, and backend integration for pipeline validation.

## ✨ Features

- ⚡ Drag-and-drop UI for nodes like **Input**, **Output**, **LLM**, **Math**, **Switch**, etc.
- 🌙 Light and dark mode toggle.
- 🔁 Custom connections with animated arrows.
- 🔄 Real-time state management with Zustand.
- 📤 Submit pipeline to a FastAPI backend for processing.

---

## 🖥️ Tech Stack

- **Frontend:** React, Vite, React Flow, Tailwind CSS 
- **State Management:** Zustand
- **Backend:** FastAPI (for pipeline validation)

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
npm install
npm run dev
uvicorn main:app --reload --port 8000

##  🛠️ Configuration
Make sure your backend exposes this endpoint and returns:

{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
