# Countries Lookup with Weather Data

A web application that allows users to look up information about countries and retrieve weather data for specific country.

## Installation

1. Clone the repository.
1. Navigate to the project folder: `cd countriesdata`
1. Install dependencies: 
    1. `npm install`
    1. `npm install axios`

## Usage

- You will need to obtain an api-key from [OpenWeatherMap API](https://openweathermap.org/current).
- Start the application (assuming the api-key is `54l41n3n4v41m34rv0`):
    - `export VITE_WEATHER_KEY=54l41n3n4v41m34rv0 && npm run dev` // For Linux/macOS Bash
    - `($env:VITE_WEATHER_KEY="54l41n3n4v41m34rv0") -and (npm run dev)` // For Windows PowerShell
    - `set "VITE_WEATHER_KEY=54l41n3n4v41m34rv0" && npm run dev` // For Windows cmd.exe`
- Open your browser and navigate to `http://localhost:5173`

## Features

- Search for countries by name.
- View detailed information about each country
- Retrieve weather data for specific country

## Technologies Used

- HTML, CSS, JavaScript
- React + Vite
- [OpenWeatherMap API](https://openweathermap.org/current)
