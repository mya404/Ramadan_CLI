<div align="center">

# 🌙 Ramadan CLI 🌙

### *Your Terminal Companion for Ramadan Prayer Times*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/)

*A beautiful, fast, and easy-to-use command-line interface (CLI) tool to display Sehar (pre-dawn meal) and Iftar (breaking fast) timings for Ramadan in your terminal.*

**[Features](#-features)** • **[Installation](#-installation)** • **[Quick Start](#-quick-start)** • **[Usage](#-usage)** • **[Commands](#-command-reference)**

---

</div>

## ✨ Highlights

> **Why Ramadan CLI?** Get accurate prayer times instantly in your terminal without opening a browser or mobile app. Perfect for developers, terminal enthusiasts, and anyone who prefers the command line!

## 🎯 Features

- 🕌 **Instant Prayer Times** - Display today's Sehar (Fajr) and Iftar (Maghrib) prayer times
- 🌍 **Global Coverage** - Get prayer times for 60+ cities worldwide
- 📍 **Custom Locations** - Use latitude and longitude for any location on Earth
- ⚙️ **Personalized Defaults** - Save your default location for quick access
- 🕐 **Complete Prayer Schedule** - Display all daily prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- 🎨 **Beautiful UI** - Colored output with elegant table formatting
- ⚡ **Lightning Fast** - Get results in milliseconds
- 🔒 **Privacy First** - All calculations done locally, no data sent to servers
- 📦 **Zero Config** - Works out of the box with sensible defaults

## 📦 Installation

### Method 1: Clone from GitHub (Recommended)

```bash
# Clone the repository
git clone https://github.com/mya404/Ramadan_CLI.git

# Navigate to the project directory
cd Ramadan_CLI

# Install dependencies
npm install

# Install globally to use from anywhere
npm install -g .
```

### Method 2: Direct NPM Install (Coming Soon)

```bash
# This will be available once published to npm
npm install -g ramadan-cli
```

### Requirements

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

## 🚀 Quick Start

The easiest way to get started is to set your default location:

```bash
# Set your city as default
ramadan config --city "New York"

# Then simply run
ramadan

# Or see all prayer times
ramadan --all
```

That's it! 🎉

## 📖 Usage

### Display today's timings (default location)

```bash
ramadan
```

> 💡 **Tip:** On first run, it defaults to Mecca. Set your location with `ramadan config --city "Your City"`.

### Display timings for a city

```bash
ramadan city "New York"
ramadan city "London"
ramadan city "Dubai"
ramadan city "Istanbul"
```

**Supported cities include:** New York, London, Paris, Berlin, Dubai, Riyadh, Mecca, Medina, Cairo, Istanbul, Karachi, Delhi, Jakarta, Toronto, Sydney, Tokyo, and **60+ more!**

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
ramadan location 40.7128 -74.0060  # New York City
ramadan location 51.5074 -0.1278   # London, UK
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
# Display today's times with various options
ramadan today --city "Dubai"
ramadan today --latitude 40.7128 --longitude -74.0060
ramadan today --all  # Show all prayer times

# List all available cities
ramadan list-cities
```

## 🗺️ Finding Your Location

### Option 1: Use City Name (Easiest) 🏙️
Simply use the city name if it's in our database of 60+ cities worldwide. Run `ramadan list-cities` to see all available cities.

### Option 2: Use Coordinates 📍
You can find your latitude and longitude coordinates using:
- **Google Maps**: Right-click on your location and select the coordinates
- **[LatLong.net](https://www.latlong.net/)** - Online coordinate finder
- Your **GPS device** or **smartphone**

## 🕌 Prayer Time Calculations

This tool uses the **[Adhan](https://github.com/batoulapps/adhan-js)** library which implements well-established prayer time calculation methods. The default calculation method is the **Muslim World League** method, which is widely accepted.

### What do the times mean?

| Prayer | Arabic Name | Description |
|--------|-------------|-------------|
| **Sehar** | Fajr | Pre-dawn prayer - the last time to eat before fasting (Suhoor) |
| **Sunrise** | Shurooq | When the sun rises - marks the beginning of fasting |
| **Iftar** | Maghrib | Sunset prayer - the time to break the fast |
| **All Prayers** | - | Includes Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha |

> ℹ️ **Note:** Times are calculated based on your exact location and current date, displayed in your system's local timezone.

## 📋 Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `ramadan` | Show prayer times for default location | `ramadan` |
| `ramadan city <name>` | Show prayer times for a specific city | `ramadan city "Dubai"` |
| `ramadan location <lat> <lon>` | Show prayer times for coordinates | `ramadan location 25.2048 55.2708` |
| `ramadan today [options]` | Show today's prayer times with options | `ramadan today --all` |
| `ramadan config --city <name>` | Set default location by city | `ramadan config --city "London"` |
| `ramadan config --show` | Show current configuration | `ramadan config --show` |
| `ramadan config --reset` | Reset to default configuration | `ramadan config --reset` |
| `ramadan list-cities` | List all available cities | `ramadan list-cities` |
| `--all` or `-a` | Show all prayer times (not just Sehar/Iftar) | `ramadan --all` |
| `--help` | Display help information | `ramadan --help` |

## 💡 Examples

Here are some common use cases to get you started:

```bash
# Quick lookup for any city
ramadan city "Toronto"

# Set your city as default for easy access
ramadan config --city "Toronto"
# Now just type ramadan anytime
ramadan

# See all prayer times for the day
ramadan --all
ramadan city "Dubai" --all

# Use coordinates for cities not in the database
ramadan location 25.2048 55.2708  # Dubai coordinates

# See all available cities in the database
ramadan list-cities

# Check your current saved settings
ramadan config --show

# Get help anytime
ramadan --help
ramadan city --help
```

## 🌍 Supported Cities

The CLI includes **60+ major cities worldwide**. Run `ramadan list-cities` to see the complete list!

<details>
<summary><b>Click to expand city list by region</b></summary>

### Middle East 🕌
Mecca, Medina, Riyadh, Dubai, Doha, Kuwait, Cairo, Istanbul, Tehran, Baghdad, Beirut, Jerusalem

### South Asia 🌏
Karachi, Lahore, Delhi, Mumbai, Dhaka, Colombo

### Southeast Asia 🌴
Jakarta, Kuala Lumpur, Singapore, Bangkok, Manila

### Europe 🏰
London, Paris, Berlin, Amsterdam, Madrid, Rome, Moscow

### North America 🗽
New York, Los Angeles, Chicago, Toronto, Montreal, Vancouver

### Australia 🦘
Sydney, Melbourne, Brisbane, Perth

### Africa 🌍
Nairobi, Lagos, Johannesburg, Cape Town, Casablanca

### East Asia 🏯
Beijing, Shanghai, Tokyo, Seoul

*...and many more!*

</details>

## ❓ Troubleshooting

<details>
<summary><b>City not found?</b></summary>

- Check the spelling of the city name
- Try using coordinates instead: `ramadan location <lat> <lon>`
- Use `ramadan config --show` to verify your saved location
- Run `ramadan list-cities` to see all available cities
</details>

<details>
<summary><b>Times seem incorrect?</b></summary>

- Verify your coordinates are correct
- Prayer times are calculated for the exact date and location
- Times are displayed in your system's local timezone
- Make sure your system clock is set correctly
</details>

<details>
<summary><b>Installation issues?</b></summary>

- Ensure you have Node.js >= 14.0.0 installed: `node --version`
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
</details>

<details>
<summary><b>How do I update the tool?</b></summary>

```bash
cd Ramadan_CLI
git pull origin main
npm install
npm install -g .
```
</details>

## 🛠️ Technologies Used

This project is built with modern, well-maintained open-source libraries:

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Commander.js](https://github.com/tj/commander.js/)** - ⭐ CLI framework for building command-line tools
- **[Adhan](https://github.com/batoulapps/adhan-js)** - ⭐ Accurate prayer times calculation library
- **[Chalk](https://github.com/chalk/chalk)** - 🎨 Terminal string styling and colors
- **[cli-table3](https://github.com/cli-table/cli-table3)** - 📊 Beautiful terminal tables

## 🤝 Contributing

Contributions are welcome! We'd love your help to make Ramadan CLI even better. 

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/Ramadan_CLI.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and commit: `git commit -m 'Add some amazing feature'`
5. **Push** to your branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### Ideas for Contributions

- 💡 Add more cities to the database
- 🌐 Support for different calculation methods (Hanafi, Shia, etc.)
- 📅 Week/month view of prayer times
- ⏰ Countdown to next prayer time
- 🌙 Additional Islamic calendar features (Hijri dates, Ramadan countdown)
- 🌍 Multi-language support
- 📱 Desktop notifications for prayer times
- 🧪 More comprehensive test coverage

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mya404/Ramadan_CLI.git
cd Ramadan_CLI

# Install dependencies
npm install

# Run tests
npm test

# Test the CLI locally
node bin/ramadan.js city "New York"
```

### Bug Reports & Feature Requests

Found a bug or have a feature idea? Please [open an issue](https://github.com/mya404/Ramadan_CLI/issues) with a clear description.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Prayer time calculations powered by the excellent [Adhan](https://github.com/batoulapps/adhan-js) library
- Thanks to all contributors who help improve this project
- Special thanks to the Muslim developer community

## ⭐ Show Your Support

If you find this tool helpful, please consider:
- Giving it a ⭐ star on GitHub
- Sharing it with others who might benefit
- Contributing to the project
- Reporting bugs or suggesting features

---

<div align="center">

**Made with ❤️ by [mya404](https://github.com/mya404)**

*May this tool help you observe Ramadan with ease and devotion. Ramadan Mubarak! 🌙*

[Report Bug](https://github.com/mya404/Ramadan_CLI/issues) • [Request Feature](https://github.com/mya404/Ramadan_CLI/issues) • [View Source](https://github.com/mya404/Ramadan_CLI)

</div>