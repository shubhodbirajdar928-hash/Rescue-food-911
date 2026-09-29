# 🚨 Food Rescue 911 (All-India Food ICU & Surplus Rescue Cell)

> *"Asli Hero wahi... jo dustbin se pehle Biryani aur Vada Pav bacha le! 🦸‍♂️🍛"*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Web_Speech_API](https://img.shields.io/badge/Web_Speech_API-Voice_Roaster-orange?style=flat-square&logo=googlechrome&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Web_Audio_API](https://img.shields.io/badge/Web_Audio_API-Police_Radio_&_Siren-purple?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Vercel](https://img.shields.io/badge/Vercel-Live_Deployment-black?style=flat-square&logo=vercel)](https://rescue-food-911.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

### 🌐 Live Web App: **[rescue-food-911.vercel.app](https://rescue-food-911.vercel.app/)**

---

## 📌 Project Overview

**Food Rescue 911** is an emergency hyper-local food rescue platform that turns closing-time restaurant food surplus into an exciting, fast-paced **911 Emergency Mission**!

Every night, restaurants, bakeries, and cafes prepare 100% fresh, delicious meals. But when closing time strikes, unsold surplus (Biryani, Vada Pav, Pattice, Curries, Desserts) is tragically dumped into the trash, leaving business owners at a loss and wasting good food.

**Food Rescue 911** bridges this gap:
* 👨‍🍳 **Restaurants** list closing-time surplus in under 30 seconds at **50% to 70% flat discount** to recover cooking costs.
* 🦸‍♂️ **Hungry Rescuers** (students, office-goers, foodies) get alerted via live countdown timers, sirens, and Bollywood voice commentary to claim hot restaurant meals at pocket-friendly prices before the shop shutters down.

---

## ⚡ Key Highlights & Features

### 1. 🏥 The Food ICU & Trauma Ward (Live Rescue Grid)
* **Real-Time Expiry Countdown Timers**: Visual ticking timers showing exact minutes before store closure.
* **Freshness & Health Indicators**: Dynamic color-coded condition badges (*Critical Emergency, Stable, Dispatched*).
* **50%–70% Discount Tags**: Immediate comparison of original restaurant prices vs. emergency rescue rates.

### 2. 💓 Live Hospital ECG Heartbeat Monitor
* Simulates live patient vitals for active surplus food items.
* Interactive ECG waveform dynamically synchronizes with each selected dish's urgency level.

### 3. 🎙️ Smooth & Funny Bollywood Male Voice Roaster
* Built with the browser's native **Web Speech API** + **Web Audio API**.
* Delivers silky smooth, hilarious, meme-worthy Hindi audio commentary (*"ओए होए, मस्त!"*, *"बल्ले बल्ले!"*, *"खत्म, टाटा, बाय बाय!"*, *"अरे यार, रुको जरा!"*, *"सब सेट है, बॉस!"*).
* Filtered for authentic deep male voices with custom baritone pitch tuning.
* Accompanied by soft musical sine-wave chime flourishes and an on-screen clapperboard subtitle balloon.
* Instant **`🎙️ FUNNY VOICE`** test and mute toggle directly in the navigation bar.

### 4. 📻 911 Emergency Walkie-Talkie & Police Radio
* Authentic **police radio squelch static bursts** (`Ksshh-tck!`) and classic end-of-transmission roger beeps.
* Multi-channel selector featuring hilarious mock police dispatch banter:
  * `CH 1: 🚨 DILJALA ICU (Biryani Sector)`
  * `CH 2: 🕵️ CID DISPATCH (ACP Pradyuman & Daya)`
  * `CH 3: 🍔 VADA PAV RAPID SQUAD`
  * `CH 4: 🕶️ MUNNA & CIRCUIT PATROL`
  * `CH 5: 👓 BABURAO HQ (Hera Pheri)`
  * `CH 6: ⚡ SPEED RESCUE AIRWAVES`

### 5. 👨‍🍳 Kitchen Dispatch Control Room (Restaurant Portal)
* **Instant Deployment**: Publish unsold surplus inventory with price, quantity, and closing timers in seconds.
* **Food Safety Verification Checklist**: Mandatory hygiene and temperature verification before items go live.
* **Live Order Dispatch Workflow**: Real-time order reception, kitchen preparation, and one-click pickup verification.
* **Zero-Waste Kitchen Analytics**: Real-time stats on cooking cost recovered, items rescued, and waste avoided.

### 6. 🏆 Rescuer Hero Gamification & Impact Tracking
* **Hero Points & Level Badges**: Progress from *"Chhota Rescuer"* to *"Param Vir Biryani Rakshak"*.
* **Live Impact Counter**: Tracks actual **Kilograms of Food Rescued**, **Rupees Saved**, and **CO₂ Emissions Prevented**.
* **🪦 Expired Memorial Ward**: Humorous tribute wall for dishes that couldn't be rescued in time.
* **📢 Feedback & Relisting Cell**: Rate rescued meals, submit praise, or relist dishes if personal pickup plans change.

---

## 🎯 The Win-Win Model

| 🍽️ For Rescuers (Customers) | 💰 For Kitchens (Restaurants) | 🌍 For the Environment |
| :--- | :--- | :--- |
| • Delicious restaurant food at 50%–70% off | • Recover raw food costs on unsold stock | • Dramatically reduces organic landfill waste |
| • Zero-boring coupons, instant 911 pickup | • Zero dumpster disposal and zero waste | • Lowers greenhouse gas (CO₂/methane) emissions |
| • Fun, gamified rescue experience | • Free local marketing and new customer reach | • Promotes sustainable neighborhood consumption |

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
* **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Animations & FX**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Audio Synthesis**: Native Browser **Web Audio API** (Siren Oscillators, Police Squelch White Noise Generator, Soft Sine Chimes)
* **Speech Synthesis**: Native Browser **Web Speech API** (`SpeechSynthesisUtterance` with neural male voice heuristics)
* **State Management**: React Context API (`RescueContext` & `AuthContext`) with persistent `localStorage` synchronization

---

## 📂 Project Structure

```text
Rescue-food-911/
├── public/                     # Static assets & icons
├── src/
│   ├── auth/                   # Authentication context & protected routes
│   │   ├── AuthContext.jsx
│   │   └── ProtectedRoute.jsx
│   ├── components/
│   │   ├── common/             # Reusable UI widgets
│   │   │   ├── Navbar.jsx               # Navigation bar & Voice Tester
│   │   │   ├── EmergencyTicker.jsx      # Live breaking surplus ticker
│   │   │   └── RoboticVoiceRoaster.jsx  # Clapperboard voice subtitle overlay
│   │   ├── rescuer/            # Rescuer (Customer) components
│   │   │   ├── HeroSection.jsx          # Dramatic 911 headline & live ECG
│   │   │   ├── EmergencyCard.jsx        # Food patient triage card
│   │   │   ├── FoodDetailsModal.jsx     # Detailed rescue modal
│   │   │   ├── RescueMissionModal.jsx   # Checkout & pickup modal
│   │   │   ├── RescueSuccessModal.jsx   # Victory modal with confetti
│   │   │   ├── RadarMap.jsx             # Hyper-local GPS radar map
│   │   │   ├── RescuerProfile.jsx       # Badges, achievements & stats
│   │   │   ├── ExpiredMemorialWard.jsx  # RIP food cemetery
│   │   │   └── FeedbackSection.jsx      # Reviews & relisting system
│   │   ├── restaurant/         # Restaurant (Kitchen) components
│   │   │   ├── DeployEmergencyModal.jsx # Add new surplus batch modal
│   │   │   ├── KitchenActiveList.jsx    # Live inventory management
│   │   │   └── KitchenHistory.jsx       # Kitchen analytics & past dispatches
│   │   └── impact/             # Impact analytics
│   │       └── ImpactSection.jsx        # KG rescued, ₹ saved, CO₂ metrics
│   ├── context/
│   │   └── RescueContext.jsx   # Global food inventory, missions & state
│   ├── pages/                  # Page routes
│   │   ├── LoginPage.jsx
│   │   ├── RescuerLogin.jsx
│   │   ├── KitchenLogin.jsx
│   │   ├── RescuerDashboard.jsx
│   │   ├── KitchenDashboard.jsx
│   │   └── AccessDenied.jsx
│   ├── utils/                  # Engines and audio utilities
│   │   ├── roboticVoiceRoaster.js  # Web Speech synthesis & voice picker
│   │   ├── walkieTalkieAudio.js    # Police radio static & dispatch banter
│   │   └── soundEffects.js         # Emergency sirens and audio cues
│   ├── App.jsx                 # Top-level routing
│   ├── main.jsx                # Application root entry
│   └── index.css               # Global styling
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0 or higher recommended)
* **npm** (v9.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhodbirajdar928-hash/Rescue-food-911.git
   cd Rescue-food-911
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔑 Live Demo Access
You can test both user roles immediately on the live deployment:

| Role | Live Demo Link | Features |
| :--- | :--- | :--- |
| 🦸‍♂️ **Food Rescuer** | [rescue-food-911.vercel.app/login/rescuer](https://rescue-food-911.vercel.app/login/rescuer) | Browse live trauma ward, rescue meals at 50%–70% off, view ECG pulse, earn hero badges |
| 👨‍🍳 **Kitchen Dispatch** | [rescue-food-911.vercel.app/login/kitchen](https://rescue-food-911.vercel.app/login/kitchen) | Deploy surplus batches in 30s, verify food safety, process live pickups, view cost recovery |

---

## 📜 License

This project is licensed under the MIT License - feel free to use and adapt it to save food in your local community!

---

*Made with ❤️, Biryani, and Zero Food Waste.* 🍛🦸‍♂️
