

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
  

##  🛠️ Configuration
Make sure your backend exposes this endpoint and returns:
```bash
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
