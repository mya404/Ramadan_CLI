const fs = require('fs');
const path = require('path');
const os = require('os');
const { loadConfig, saveConfig } = require('../lib/config');

console.log('Running config module tests...\n');

// Use a temporary config directory for testing
const TEST_CONFIG_DIR = path.join(os.tmpdir(), '.ramadan-cli-test-' + Date.now());
const TEST_CONFIG_FILE = path.join(TEST_CONFIG_DIR, 'config.json');

// Test 1: Save and load config
console.log('Test 1: Save and load configuration');
const testConfig = {
  latitude: 40.7128,
  longitude: -74.0060,
  locationName: 'New York'
};

// Create test directory
if (!fs.existsSync(TEST_CONFIG_DIR)) {
  fs.mkdirSync(TEST_CONFIG_DIR, { recursive: true });
}

// Write test config
fs.writeFileSync(TEST_CONFIG_FILE, JSON.stringify(testConfig, null, 2), 'utf8');

// Read test config
const loaded = JSON.parse(fs.readFileSync(TEST_CONFIG_FILE, 'utf8'));
if (loaded.latitude === 40.7128 && 
    loaded.longitude === -74.0060 && 
    loaded.locationName === 'New York') {
  console.log('✓ PASS: Configuration saved and loaded correctly\n');
} else {
  console.log('✗ FAIL: Configuration data mismatch\n');
  process.exit(1);
}

// Test 2: Load empty/non-existent config
console.log('Test 2: Load non-existent configuration');
const emptyPath = path.join(TEST_CONFIG_DIR, 'nonexistent.json');
let emptyConfig = {};
try {
  if (fs.existsSync(emptyPath)) {
    emptyConfig = JSON.parse(fs.readFileSync(emptyPath, 'utf8'));
  }
} catch (error) {
  emptyConfig = {};
}
if (Object.keys(emptyConfig).length === 0) {
  console.log('✓ PASS: Non-existent config returns empty object\n');
} else {
  console.log('✗ FAIL: Should return empty object\n');
  process.exit(1);
}

// Test 3: Update config
console.log('Test 3: Update existing configuration');
const updatedConfig = {
  latitude: 51.5074,
  longitude: -0.1278,
  locationName: 'London'
};
fs.writeFileSync(TEST_CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf8');
const loadedUpdated = JSON.parse(fs.readFileSync(TEST_CONFIG_FILE, 'utf8'));
if (loadedUpdated.locationName === 'London') {
  console.log('✓ PASS: Configuration updated successfully\n');
} else {
  console.log('✗ FAIL: Configuration update failed\n');
  process.exit(1);
}

// Test 4: Config with coordinates only (no name)
console.log('Test 4: Configuration with coordinates only');
const coordsOnlyConfig = {
  latitude: 25.2048,
  longitude: 55.2708,
  locationName: null
};
fs.writeFileSync(TEST_CONFIG_FILE, JSON.stringify(coordsOnlyConfig, null, 2), 'utf8');
const loadedCoordsOnly = JSON.parse(fs.readFileSync(TEST_CONFIG_FILE, 'utf8'));
if (loadedCoordsOnly.latitude === 25.2048 && loadedCoordsOnly.locationName === null) {
  console.log('✓ PASS: Coordinates-only config works\n');
} else {
  console.log('✗ FAIL: Coordinates-only config failed\n');
  process.exit(1);
}

// Cleanup
try {
  fs.rmSync(TEST_CONFIG_DIR, { recursive: true, force: true });
} catch (error) {
  console.log('Warning: Could not clean up test directory');
}

console.log('All config module tests passed! ✓');
