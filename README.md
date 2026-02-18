# Ramadan CLI 🌙

A command-line interface (CLI) tool to display Sehar (pre-dawn meal) and Iftar (breaking fast) timings for Ramadan in your terminal.

## Features

- 🕌 Display today's Sehar (Fajr) and Iftar (Maghrib) prayer times
- 🌍 Get prayer times by city name (70+ cities worldwide)
- 📍 Get prayer times for any location using latitude and longitude
- ⚙️ Save your default location for quick access
- 🕐 Display all daily prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- 🎨 Beautiful colored output in terminal
- ⚡ Fast and easy to use

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

## Quick Start

The easiest way to get started is to set your default location:

```bash
# Set default location by city name
ramadan config --city "New York"

# Then just run ramadan
ramadan
```

## Usage

### Display today's timings (default location)

```bash
ramadan
```

On first run, it defaults to Mecca. Set your location with `ramadan config --city "Your City"`.

### Display timings for a city

```bash
ramadan city "New York"
ramadan city "London"
ramadan city "Dubai"
ramadan city "Istanbul"
```

**Supported cities include:** New York, London, Paris, Berlin, Dubai, Riyadh, Mecca, Medina, Cairo, Istanbul, Karachi, Delhi, Jakarta, Toronto, Sydney, Tokyo, and many more!

### Display all prayer times

Add the `--all` or `-a` flag to see all five daily prayers:

```bash
ramadan city "New York" --all
ramadan today --all
```

### Display timings for specific coordinates

```bash
ramadan location <latitude> <longitude>

# Examples:
ramadan location 40.7128 -74.0060  # New York
ramadan location 51.5074 -0.1278   # London
```

### Configure default location

```bash
# Set default location by city
ramadan config --city "New York"

# Set default location by coordinates
ramadan config --latitude 40.7128 --longitude -74.0060

# Show current configuration
ramadan config --show

# Reset to default (Mecca)
ramadan config --reset
```

### Advanced usage

```bash
# Display today's times with options
ramadan today --city "Dubai"
ramadan today --latitude 40.7128 --longitude -74.0060
ramadan today --all  # Show all prayer times
```

## Finding Your Location

### Option 1: Use City Name (Easiest)
Simply use the city name if it's in our database of 70+ cities worldwide.

### Option 2: Use Coordinates
You can find your latitude and longitude coordinates using:
- Google Maps: Right-click on your location and select the coordinates
- [LatLong.net](https://www.latlong.net/)
- Your GPS device or smartphone

## Prayer Time Calculations

This tool uses the `adhan` library which implements well-established prayer time calculation methods. The default calculation method is the Muslim World League method, which is widely accepted.

- **Sehar Time**: Fajr prayer time (pre-dawn) - the last time to eat before fasting
- **Iftar Time**: Maghrib prayer time (sunset) - the time to break the fast
- **All Prayer Times**: Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha

## Command Reference

| Command | Description |
|---------|-------------|
| `ramadan` | Show prayer times for default location |
| `ramadan city <name>` | Show prayer times for a specific city |
| `ramadan location <lat> <lon>` | Show prayer times for specific coordinates |
| `ramadan today [options]` | Show today's prayer times with options |
| `ramadan config --city <name>` | Set default location by city |
| `ramadan config --show` | Show current configuration |
| `ramadan config --reset` | Reset to default configuration |
| `ramadan list-cities` | List all available cities |
| `--all` or `-a` | Show all prayer times (not just Sehar/Iftar) |
| `--help` | Display help information |

## Examples

```bash
# Quick lookup for any city
ramadan city "Toronto"

# Set your city as default
ramadan config --city "Toronto"

# Now just type ramadan
ramadan

# See all prayer times
ramadan --all
ramadan city "Dubai" --all

# Use coordinates for unlisted cities
ramadan location 25.2048 55.2708

# See all available cities
ramadan list-cities

# Check your current settings
ramadan config --show
```

## Supported Cities

The CLI includes 70+ major cities worldwide, including:

**Middle East:** Mecca, Medina, Riyadh, Dubai, Doha, Kuwait, Cairo, Istanbul, Tehran, Baghdad, Beirut, Jerusalem

**South Asia:** Karachi, Lahore, Delhi, Mumbai, Dhaka, Colombo

**Southeast Asia:** Jakarta, Kuala Lumpur, Singapore, Bangkok, Manila

**Europe:** London, Paris, Berlin, Amsterdam, Madrid, Rome, Moscow

**North America:** New York, Los Angeles, Chicago, Toronto, Montreal, Vancouver

**Australia:** Sydney, Melbourne, Brisbane, Perth

**Africa:** Nairobi, Lagos, Johannesburg, Cape Town, Casablanca

**East Asia:** Beijing, Shanghai, Tokyo, Seoul

...and many more!

## Troubleshooting

**City not found?**
- Check the spelling of the city name
- Try using coordinates instead: `ramadan location <lat> <lon>`
- Use `ramadan config --show` to verify your saved location

**Times seem incorrect?**
- Verify your coordinates are correct
- Prayer times are calculated for the exact date and location
- Times are displayed in your system's local timezone

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

### Ideas for contributions:
- Add more cities to the database
- Support for different calculation methods
- Week/month view of prayer times
- Countdown to next prayer
- Additional Islamic calendar features