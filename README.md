# NYCU GeoGuessr - React Final Project 🌍

Welcome to the **NYCU GeoGuessr**! This is a web-based, interactive map-guessing game inspired by the popular game GeoGuessr, but fully customized for learning and exploring locations (such as the NYCU campus). 

This project was built for the **React Final Project** and demonstrates advanced React concepts, dynamic routing, local storage management, and complex mathematical calculations.

## 🚀 Live Demo
*(Insert your Vercel deployment link here, e.g., https://your-project.vercel.app)*

---

## ✨ Features

- **Interactive Map Guessing:** Players are shown an image of a location and must drop a pin on a customized Leaflet map to guess where it is.
- **Dynamic Scoring System:** Utilizes the **Haversine formula** to calculate the exact distance (in km or meters) between the player's guessed coordinate and the actual coordinate. The closer you are, the closer you get to 5,000 points!
- **Local Account System:** Includes a fully functional account registration and login system. Passwords are securely hashed using the **Web Crypto API (SHA-256)** before being saved to the browser's `localStorage`.
- **Global Leaderboard:** Features a beautifully styled, full-width Top-10 Leaderboard. It tracks the best scores and resolves ties by looking at the fastest completion time.
- **Dynamic Map Locking:** Maps are dynamically loaded based on the existence of JSON data files. If a map's data doesn't exist yet, it elegantly locks the UI to prevent access.
- **Premium UI/UX:** Built from scratch with vanilla CSS utilizing a modern dark-theme, glassmorphism, animated number counters, and responsive design elements.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 (via Vite)
- **Routing:** React Router DOM (`BrowserRouter`)
- **Maps API:** Leaflet (`react-leaflet`) for rendering interactive maps and custom pins.
- **Database/Storage:** Browser `localStorage` (No external backend required!)
- **Security:** Native Web Crypto API (`crypto.subtle.digest`) for secure SHA-256 password hashing.
- **Styling:** Custom CSS with CSS Modules/Variables (No UI libraries like Tailwind or Bootstrap used, proving strong CSS proficiency).

---

## 📂 Project Structure

- `src/components/`: Reusable UI components (`NavBar`, `Leaderboard`, `AuthDropdown`, `MapCard`, `GuessMap`, etc.)
- `src/pages/`: Main route views (`Home`, `Lobby`, `Play`, `NotFound`)
- `src/utils/`: Core logic and helper functions (`auth.js`, `leaderboard.js`)
- `src/data/`: JSON files containing the map metadata and coordinate configurations.

---

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/777TW/React-Final-Project.git
   cd React-Final-Project
   ```

2. **Install dependencies:**
   Make sure you have Node.js and `pnpm` installed.
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm run dev
   ```

4. **Play the game!**
   Open `http://localhost:5173` in your browser.

---
