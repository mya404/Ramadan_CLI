const { getRamadanTimes, formatTime, getPrayerTimes } = require('../lib/prayer-times');

console.log('Running prayer-times tests...\n');

// Test 1: Check that getRamadanTimes returns an object with required properties
console.log('Test 1: Check getRamadanTimes return structure');
const times = getRamadanTimes(21.4225, 39.8262);
if (times.sehar && times.iftar && times.date) {
  console.log('✓ PASS: getRamadanTimes returns sehar, iftar, and date\n');
} else {
  console.log('✗ FAIL: Missing required properties\n');
  process.exit(1);
}

// Test 2: Check that returned times are Date objects
console.log('Test 2: Verify sehar and iftar are Date objects');
if (times.sehar instanceof Date && times.iftar instanceof Date) {
  console.log('✓ PASS: sehar and iftar are Date objects\n');
} else {
  console.log('✗ FAIL: sehar or iftar is not a Date object\n');
  process.exit(1);
}

// Test 3: Check that iftar time is after sehar time
console.log('Test 3: Verify iftar is after sehar');
if (times.iftar > times.sehar) {
  console.log('✓ PASS: iftar time is after sehar time\n');
} else {
  console.log('✗ FAIL: iftar time should be after sehar time\n');
  process.exit(1);
}

// Test 4: Check formatTime function
console.log('Test 4: Check formatTime function');
const formattedTime = formatTime(new Date('2024-01-01T14:30:00'));
if (formattedTime.includes('AM') || formattedTime.includes('PM')) {
  console.log(`✓ PASS: formatTime returns proper 12-hour format: ${formattedTime}\n`);
} else {
  console.log('✗ FAIL: formatTime does not return 12-hour format\n');
  process.exit(1);
}

// Test 5: Check getPrayerTimes returns all required prayer times
console.log('Test 5: Verify getPrayerTimes returns all prayer times');
const allPrayers = getPrayerTimes(21.4225, 39.8262);
const requiredPrayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
const hasAllPrayers = requiredPrayers.every(prayer => allPrayers[prayer] instanceof Date);
if (hasAllPrayers) {
  console.log('✓ PASS: getPrayerTimes returns all required prayer times\n');
} else {
  console.log('✗ FAIL: Missing some prayer times\n');
  process.exit(1);
}

// Test 6: Verify different locations produce different times
console.log('Test 6: Verify different locations produce different times');
const meccaTimes = getRamadanTimes(21.4225, 39.8262);
const londonTimes = getRamadanTimes(51.5074, -0.1278);
if (meccaTimes.sehar.getTime() !== londonTimes.sehar.getTime()) {
  console.log('✓ PASS: Different locations produce different prayer times\n');
} else {
  console.log('✗ FAIL: Different locations should produce different times\n');
  process.exit(1);
}

console.log('All tests passed! ✓');
