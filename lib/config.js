const fs = require('fs');
const path = require('path');
const os = require('os');

// Config file path in user's home directory
const CONFIG_DIR = path.join(os.homedir(), '.ramadan-cli');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

/**
 * Load configuration from file
 * @returns {Object} Configuration object
 */
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    // If there's an error reading the config, return empty object
    console.error('Warning: Could not read config file:', error.message);
  }
  return {};
}

/**
 * Save configuration to file
 * @param {Object} config - Configuration object to save
 */
function saveConfig(config) {
  try {
    // Create config directory if it doesn't exist
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
  } catch (error) {
    console.error('Error: Could not save config file:', error.message);
    process.exit(1);
  }
}

module.exports = {
  loadConfig,
  saveConfig
};
