# Ramadan CLI 🌙

A command-line interface (CLI) tool to display Sehar (pre-dawn meal) and Iftar (breaking fast) timings for Ramadan in your terminal.

## Features

- Display today's Sehar (Fajr) and Iftar (Maghrib) prayer times
- Get prayer times for any location using latitude and longitude
- Beautiful colored output in terminal
- Easy to use commands

## Installation

1. Clone this repository:
```bash
git clone https://github.com/mya404/Ramadan_CLI.git
cd Ramadan_CLI
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Install globally to use from anywhere:
```bash
npm install -g .
```

## Usage

### Display today's timings (default location: Mecca)

```bash
node bin/ramadan.js
# or if installed globally:
ramadan
```

### Display timings for a specific location

```bash
ramadan location <latitude> <longitude>
```

**Examples:**

```bash
# New York
ramadan location 40.7128 -74.0060

# London
ramadan location 51.5074 -0.1278

# Dubai
ramadan location 25.2048 55.2708

# Istanbul
ramadan location 41.0082 28.9784
```

### Display today's timings with options

```bash
ramadan today --latitude 40.7128 --longitude -74.0060
```

## How to Find Your Coordinates

You can find your latitude and longitude coordinates using:
- Google Maps: Right-click on your location and select the coordinates
- [LatLong.net](https://www.latlong.net/)
- Your GPS device or smartphone

## Prayer Time Calculations

This tool uses the `adhan` library which implements well-established prayer time calculation methods. The default calculation method is the Muslim World League method, which is widely accepted.

- **Sehar Time**: Fajr prayer time (pre-dawn)
- **Iftar Time**: Maghrib prayer time (sunset)

## Technologies Used

- Node.js
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [Adhan](https://github.com/batoulapps/adhan-js) - Prayer times calculation
- [Chalk](https://github.com/chalk/chalk) - Terminal styling
- [cli-table3](https://github.com/cli-table/cli-table3) - Terminal tables

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.