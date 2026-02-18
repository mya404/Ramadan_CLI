const { getCityCoordinates, getAvailableCities, searchCities } = require('../lib/cities');

console.log('Running cities module tests...\n');

// Test 1: Get coordinates for a known city
console.log('Test 1: Get coordinates for New York');
const nyCoords = getCityCoordinates('New York');
if (nyCoords && nyCoords.latitude === 40.7128 && nyCoords.longitude === -74.0060) {
  console.log('✓ PASS: New York coordinates retrieved correctly\n');
} else {
  console.log('✗ FAIL: New York coordinates incorrect\n');
  process.exit(1);
}

// Test 2: Case insensitive lookup
console.log('Test 2: Case insensitive city lookup');
const londonLower = getCityCoordinates('london');
const londonUpper = getCityCoordinates('LONDON');
const londonMixed = getCityCoordinates('LoNdOn');
if (londonLower && londonUpper && londonMixed &&
    londonLower.name === 'London' &&
    londonUpper.name === 'London' &&
    londonMixed.name === 'London') {
  console.log('✓ PASS: Case insensitive lookup works\n');
} else {
  console.log('✗ FAIL: Case insensitive lookup failed\n');
  process.exit(1);
}

// Test 3: Invalid city returns null
console.log('Test 3: Invalid city returns null');
const invalid = getCityCoordinates('NotARealCity123');
if (invalid === null) {
  console.log('✓ PASS: Invalid city returns null\n');
} else {
  console.log('✗ FAIL: Should return null for invalid city\n');
  process.exit(1);
}

// Test 4: Get available cities
console.log('Test 4: Get list of available cities');
const cities = getAvailableCities();
if (Array.isArray(cities) && cities.length > 50) {
  console.log(`✓ PASS: Retrieved ${cities.length} cities\n`);
} else {
  console.log('✗ FAIL: Should return array of cities\n');
  process.exit(1);
}

// Test 5: Search cities
console.log('Test 5: Search cities by partial name');
const searchResults = searchCities('new');
if (searchResults.length > 0 && searchResults.some(city => city.name === 'New York')) {
  console.log(`✓ PASS: Search found ${searchResults.length} matching cities\n`);
} else {
  console.log('✗ FAIL: Search should find cities\n');
  process.exit(1);
}

// Test 6: Verify specific important cities
console.log('Test 6: Verify important cities exist');
const importantCities = ['Mecca', 'Medina', 'Dubai', 'London', 'New York', 'Istanbul'];
const allExist = importantCities.every(city => {
  const coords = getCityCoordinates(city);
  return coords !== null && coords.name === city;
});
if (allExist) {
  console.log('✓ PASS: All important cities exist in database\n');
} else {
  console.log('✗ FAIL: Some important cities missing\n');
  process.exit(1);
}

console.log('All cities module tests passed! ✓');
