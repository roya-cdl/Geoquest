# 🌍 GeoQuest Kids

A fun and interactive web application designed to help kids aged 8-12 learn geography! GeoQuest Kids uses the REST Countries API to display country information in a kid-friendly format.

## 📚 Documentation

- [Final Practical Assessment](./docs/lab-final-assessment.md) - Complete 40-minute practical guide for building the Daily Quiz Card feature


## ✨ Features

- **Country Search**: Search for countries by name and discover interesting facts about them
- **Interactive UI**: Kid-friendly design with colorful, engaging visuals
- **Country Information Cards**: View detailed information including:
  - Country flags
  - Capital cities
  - Regions and subregions
  - Population and area
  - Currencies and languages
- **Country Spotlight**: A feature coming soon (currently shows "under construction" message)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback with animated loading spinners
- **Error Handling**: User-friendly error messages
- **No Results Handling**: Helpful messages when no countries are found

## 🛠️ Tech Stack

- **React 19** - Modern UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting for maintaining code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nishadhin/geo-quest-kids-app-lab
cd geo-quest-kids-app-lab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## 🔧 Development

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

### Type Checking

TypeScript will automatically check types during development and build.

## 📁 Project Structure

```
geo-quest-kids-app-lab/
├── src/
│   ├── components/
│   │   ├── CountryCard.tsx          # Displays country information
│   │   ├── CountryCard.css
│   │   ├── CountrySearch.tsx        # Main search component
│   │   ├── CountrySearch.css
│   │   ├── CountrySpotlight.tsx     # Spotlight feature (under construction)
│   │   ├── CountrySpotlight.css
│   │   ├── LoadingSpinner.tsx       # Loading animation
│   │   └── LoadingSpinner.css
│   ├── services/
│   │   └── countriesApi.ts          # API service for fetching country data
│   ├── App.tsx                       # Main application component
│   ├── App.css
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Usage

1. **Search for Countries**: 
   - Type a country name in the search box (e.g., "France", "Japan", "Brazil")
   - Click the "🔍 Search" button or press Enter
   - View the results displayed as colorful cards

2. **View Country Details**:
   - Each country card shows:
     - National flag
     - Official name
     - Capital city
     - Region and subregion
     - Population
     - Area
     - Currency
     - Languages spoken

3. **Country Spotlight**:
   - Click the "🌟 Country Spotlight" button
   - Currently shows an "under construction" message
   - This feature will be expanded in future updates
