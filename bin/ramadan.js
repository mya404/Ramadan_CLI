#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const Table = require('cli-table3');
const { getRamadanTimes, formatTime } = require('../lib/prayer-times');

const program = new Command();

program
  .name('ramadan')
  .description('CLI tool to display Sehar and Iftar timings for Ramadan')
  .version('1.0.0');

program
  .command('today')
  .description('Display today\'s Sehar and Iftar timings')
  .option('-lat, --latitude <number>', 'Latitude of your location', parseFloat)
  .option('-lon, --longitude <number>', 'Longitude of your location', parseFloat)
  .action((options) => {
    const latitude = options.latitude || 21.4225; // Default: Mecca
    const longitude = options.longitude || 39.8262;
    
    console.log(chalk.green.bold('\n🌙 Ramadan Prayer Times 🌙\n'));
    
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
    console.log(chalk.gray(`\nDate: ${times.date.toDateString()}`));
    console.log(chalk.gray(`Location: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°\n`));
  });

program
  .command('location <latitude> <longitude>')
  .description('Display Sehar and Iftar timings for a specific location')
  .allowUnknownOption()
  .action((latitude, longitude) => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      console.error(chalk.red('Error: Invalid latitude or longitude'));
      process.exit(1);
    }
    
    console.log(chalk.green.bold('\n🌙 Ramadan Prayer Times 🌙\n'));
    
    const times = getRamadanTimes(lat, lon);
    
    const table = new Table({
      head: [chalk.cyan('Prayer'), chalk.cyan('Time')],
      colWidths: [20, 20]
    });
    
    table.push(
      [chalk.yellow('Sehar (Fajr)'), chalk.white(formatTime(times.sehar))],
      [chalk.yellow('Iftar (Maghrib)'), chalk.white(formatTime(times.iftar))]
    );
    
    console.log(table.toString());
    console.log(chalk.gray(`\nDate: ${times.date.toDateString()}`));
    console.log(chalk.gray(`Location: ${lat.toFixed(4)}°, ${lon.toFixed(4)}°\n`));
  });

// Default action - show today's times for default location
if (process.argv.length === 2) {
  console.log(chalk.green.bold('\n🌙 Ramadan Prayer Times 🌙\n'));
  
  const latitude = 21.4225; // Mecca
  const longitude = 39.8262;
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
  console.log(chalk.gray(`\nDate: ${times.date.toDateString()}`));
  console.log(chalk.gray(`Location: Mecca (default) - ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`));
  console.log(chalk.blue('\nTip: Use "ramadan location <lat> <lon>" to get times for your location'));
  console.log(chalk.blue('Example: ramadan location 40.7128 -74.0060 (New York)\n'));
} else {
  program.parse();
}
