#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const Table = require('cli-table3');
const { getRamadanTimes, getPrayerTimes, formatTime } = require('../lib/prayer-times');
const { loadConfig, saveConfig } = require('../lib/config');
const { getCityCoordinates } = require('../lib/cities');

const program = new Command();

// Default coordinates (Mecca)
const DEFAULT_LATITUDE = 21.4225;
const DEFAULT_LONGITUDE = 39.8262;

/**
 * Display prayer times in a formatted table
 * @param {number} latitude - Latitude of location
 * @param {number} longitude - Longitude of location
 * @param {Object} options - Display options
 */
function displayPrayerTimes(latitude, longitude, options = {}) {
  const showAll = options.all || false;
  const locationName = options.locationName || null;
  
  console.log(chalk.green.bold('\n🌙 Ramadan Prayer Times 🌙\n'));
  
  if (showAll) {
    const times = getPrayerTimes(latitude, longitude);
    
    const table = new Table({
      head: [chalk.cyan('Prayer'), chalk.cyan('Time')],
      colWidths: [20, 20]
    });
    
    table.push(
      [chalk.yellow('Fajr (Sehar)'), chalk.white(formatTime(times.fajr))],
      [chalk.green('Sunrise'), chalk.white(formatTime(times.sunrise))],
      [chalk.yellow('Dhuhr'), chalk.white(formatTime(times.dhuhr))],
      [chalk.yellow('Asr'), chalk.white(formatTime(times.asr))],
      [chalk.yellow('Maghrib (Iftar)'), chalk.white(formatTime(times.maghrib))],
      [chalk.yellow('Isha'), chalk.white(formatTime(times.isha))]
    );
    
    console.log(table.toString());
  } else {
    const times = getRamadanTimes(latitude, longitude);
    
    const table = new Table({
      head: [chalk.cyan('Prayer'), chalk.cyan('Time')],
      colWidths: [20, 20]
    });
    
    table.push(
      [chalk.yellow('Sehar (Fajr)'), chalk.white(formatTime(times.sehar))],
      [chalk.yellow('Iftar (Maghrib)'), chalk.white(formatTime(times.iftar))]
    );
    
    console.log(table.toString());
  }
  
  console.log(chalk.gray(`\nDate: ${new Date().toDateString()}`));
  
  if (locationName) {
    console.log(chalk.gray(`Location: ${locationName} (${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°)\n`));
  } else {
    console.log(chalk.gray(`Location: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°\n`));
  }
}

program
  .name('ramadan')
  .description('CLI tool to display Sehar and Iftar timings for Ramadan')
  .version('1.0.0');

program
  .command('today')
  .description('Display today\'s Sehar and Iftar timings')
  .option('-lat, --latitude <number>', 'Latitude of your location', parseFloat)
  .option('-lon, --longitude <number>', 'Longitude of your location', parseFloat)
  .option('-c, --city <name>', 'City name (e.g., "New York", "London")')
  .option('-a, --all', 'Display all prayer times, not just Sehar and Iftar')
  .action((options) => {
    const config = loadConfig();
    let latitude, longitude, locationName;
    
    if (options.city) {
      const coords = getCityCoordinates(options.city);
      if (!coords) {
        console.error(chalk.red(`Error: City "${options.city}" not found.`));
        console.log(chalk.yellow('\nTip: Try using coordinates instead with --latitude and --longitude'));
        console.log(chalk.yellow('Example: ramadan today --latitude 40.7128 --longitude -74.0060\n'));
        process.exit(1);
      }
      latitude = coords.latitude;
      longitude = coords.longitude;
      locationName = coords.name;
    } else if (options.latitude && options.longitude) {
      latitude = options.latitude;
      longitude = options.longitude;
    } else if (config.latitude && config.longitude) {
      latitude = config.latitude;
      longitude = config.longitude;
      locationName = config.locationName || null;
    } else {
      latitude = DEFAULT_LATITUDE;
      longitude = DEFAULT_LONGITUDE;
      locationName = 'Mecca (default)';
    }
    
    displayPrayerTimes(latitude, longitude, { 
      all: options.all,
      locationName 
    });
    
    if (locationName === 'Mecca (default)') {
      console.log(chalk.blue('Tip: Set your default location with "ramadan config --city <name>" or "ramadan config --latitude <lat> --longitude <lon>"'));
      console.log(chalk.blue('Example: ramadan config --city "New York"\n'));
    }
  });

program
  .command('location <latitude> <longitude>')
  .description('Display Sehar and Iftar timings for a specific location')
  .option('-a, --all', 'Display all prayer times, not just Sehar and Iftar')
  .action((latitude, longitude, options) => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      console.error(chalk.red('Error: Invalid latitude or longitude'));
      console.log(chalk.yellow('\nLatitude must be between -90 and 90'));
      console.log(chalk.yellow('Longitude must be between -180 and 180\n'));
      process.exit(1);
    }
    
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      console.error(chalk.red('Error: Coordinates out of valid range'));
      console.log(chalk.yellow('\nLatitude must be between -90 and 90'));
      console.log(chalk.yellow('Longitude must be between -180 and 180\n'));
      process.exit(1);
    }
    
    displayPrayerTimes(lat, lon, { all: options.all });
  });

program
  .command('city <name>')
  .description('Display prayer times for a city')
  .option('-a, --all', 'Display all prayer times, not just Sehar and Iftar')
  .action((name, options) => {
    const coords = getCityCoordinates(name);
    if (!coords) {
      console.error(chalk.red(`Error: City "${name}" not found.`));
      console.log(chalk.yellow('\nSupported cities: New York, London, Dubai, Istanbul, Cairo, Riyadh, Jakarta, Karachi, Delhi, Toronto, Sydney, Paris, Berlin, Tokyo, Beijing, Moscow'));
      console.log(chalk.yellow('\nTip: You can also use coordinates with "ramadan location <lat> <lon>"\n'));
      process.exit(1);
    }
    
    displayPrayerTimes(coords.latitude, coords.longitude, { 
      all: options.all,
      locationName: coords.name 
    });
  });

program
  .command('config')
  .description('Configure default location')
  .option('-lat, --latitude <number>', 'Default latitude', parseFloat)
  .option('-lon, --longitude <number>', 'Default longitude', parseFloat)
  .option('-c, --city <name>', 'Default city name')
  .option('--show', 'Show current configuration')
  .option('--reset', 'Reset to default configuration')
  .action((options) => {
    if (options.show) {
      const config = loadConfig();
      if (config.latitude && config.longitude) {
        console.log(chalk.green('\nCurrent Configuration:'));
        console.log(chalk.cyan(`  Location: ${config.locationName || 'Custom'}`));
        console.log(chalk.cyan(`  Latitude: ${config.latitude}`));
        console.log(chalk.cyan(`  Longitude: ${config.longitude}\n`));
      } else {
        console.log(chalk.yellow('\nNo default location configured.'));
        console.log(chalk.yellow('Using Mecca as default location.\n'));
      }
      return;
    }
    
    if (options.reset) {
      saveConfig({});
      console.log(chalk.green('\n✓ Configuration reset to defaults (Mecca)\n'));
      return;
    }
    
    if (options.city) {
      const coords = getCityCoordinates(options.city);
      if (!coords) {
        console.error(chalk.red(`Error: City "${options.city}" not found.`));
        console.log(chalk.yellow('\nSupported cities: New York, London, Dubai, Istanbul, Cairo, Riyadh, Jakarta, Karachi, Delhi, Toronto, Sydney, Paris, Berlin, Tokyo, Beijing, Moscow\n'));
        process.exit(1);
      }
      saveConfig({
        latitude: coords.latitude,
        longitude: coords.longitude,
        locationName: coords.name
      });
      console.log(chalk.green(`\n✓ Default location set to ${coords.name}\n`));
    } else if (options.latitude && options.longitude) {
      if (isNaN(options.latitude) || isNaN(options.longitude)) {
        console.error(chalk.red('Error: Invalid latitude or longitude\n'));
        process.exit(1);
      }
      saveConfig({
        latitude: options.latitude,
        longitude: options.longitude,
        locationName: null
      });
      console.log(chalk.green(`\n✓ Default location set to ${options.latitude}°, ${options.longitude}°\n`));
    } else {
      console.error(chalk.red('Error: Please provide either --city or both --latitude and --longitude'));
      console.log(chalk.yellow('\nExamples:'));
      console.log(chalk.yellow('  ramadan config --city "New York"'));
      console.log(chalk.yellow('  ramadan config --latitude 40.7128 --longitude -74.0060\n'));
      process.exit(1);
    }
  });

// Default action - show today's times for default location
if (process.argv.length === 2) {
  const config = loadConfig();
  const latitude = config.latitude || DEFAULT_LATITUDE;
  const longitude = config.longitude || DEFAULT_LONGITUDE;
  const locationName = config.locationName || 'Mecca (default)';
  
  displayPrayerTimes(latitude, longitude, { locationName });
  
  if (locationName === 'Mecca (default)') {
    console.log(chalk.blue('Tip: Set your default location with "ramadan config --city <name>"'));
    console.log(chalk.blue('Example: ramadan config --city "New York"'));
    console.log(chalk.blue('Or use: ramadan city "New York" for one-time lookup\n'));
  }
} else {
  program.parse();
}
