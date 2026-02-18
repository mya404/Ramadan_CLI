/**
 * Database of major cities and their coordinates
 * Organized by popularity for Islamic prayer times
 */
const CITIES = {
  // Middle East
  'mecca': { name: 'Mecca', latitude: 21.4225, longitude: 39.8262 },
  'medina': { name: 'Medina', latitude: 24.5247, longitude: 39.5692 },
  'riyadh': { name: 'Riyadh', latitude: 24.7136, longitude: 46.6753 },
  'jeddah': { name: 'Jeddah', latitude: 21.5433, longitude: 39.1728 },
  'dubai': { name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },
  'abu dhabi': { name: 'Abu Dhabi', latitude: 24.4539, longitude: 54.3773 },
  'doha': { name: 'Doha', latitude: 25.2854, longitude: 51.5310 },
  'kuwait': { name: 'Kuwait City', latitude: 29.3759, longitude: 47.9774 },
  'kuwait city': { name: 'Kuwait City', latitude: 29.3759, longitude: 47.9774 },
  'muscat': { name: 'Muscat', latitude: 23.5880, longitude: 58.3829 },
  'cairo': { name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
  'damascus': { name: 'Damascus', latitude: 33.5138, longitude: 36.2765 },
  'amman': { name: 'Amman', latitude: 31.9454, longitude: 35.9284 },
  'baghdad': { name: 'Baghdad', latitude: 33.3152, longitude: 44.3661 },
  'tehran': { name: 'Tehran', latitude: 35.6892, longitude: 51.3890 },
  'istanbul': { name: 'Istanbul', latitude: 41.0082, longitude: 28.9784 },
  'ankara': { name: 'Ankara', latitude: 39.9334, longitude: 32.8597 },
  'beirut': { name: 'Beirut', latitude: 33.8886, longitude: 35.4955 },
  'jerusalem': { name: 'Jerusalem', latitude: 31.7683, longitude: 35.2137 },
  
  // South Asia
  'karachi': { name: 'Karachi', latitude: 24.8607, longitude: 67.0011 },
  'lahore': { name: 'Lahore', latitude: 31.5497, longitude: 74.3436 },
  'islamabad': { name: 'Islamabad', latitude: 33.6844, longitude: 73.0479 },
  'delhi': { name: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
  'mumbai': { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
  'dhaka': { name: 'Dhaka', latitude: 23.8103, longitude: 90.4125 },
  'colombo': { name: 'Colombo', latitude: 6.9271, longitude: 79.8612 },
  
  // Southeast Asia
  'jakarta': { name: 'Jakarta', latitude: -6.2088, longitude: 106.8456 },
  'kuala lumpur': { name: 'Kuala Lumpur', latitude: 3.1390, longitude: 101.6869 },
  'singapore': { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  'bangkok': { name: 'Bangkok', latitude: 13.7563, longitude: 100.5018 },
  'manila': { name: 'Manila', latitude: 14.5995, longitude: 120.9842 },
  
  // North Africa
  'casablanca': { name: 'Casablanca', latitude: 33.5731, longitude: -7.5898 },
  'algiers': { name: 'Algiers', latitude: 36.7538, longitude: 3.0588 },
  'tunis': { name: 'Tunis', latitude: 36.8065, longitude: 10.1815 },
  'tripoli': { name: 'Tripoli', latitude: 32.8872, longitude: 13.1913 },
  'khartoum': { name: 'Khartoum', latitude: 15.5007, longitude: 32.5599 },
  
  // Europe
  'london': { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  'paris': { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  'berlin': { name: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
  'amsterdam': { name: 'Amsterdam', latitude: 52.3676, longitude: 4.9041 },
  'brussels': { name: 'Brussels', latitude: 50.8503, longitude: 4.3517 },
  'madrid': { name: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
  'rome': { name: 'Rome', latitude: 41.9028, longitude: 12.4964 },
  'vienna': { name: 'Vienna', latitude: 48.2082, longitude: 16.3738 },
  'moscow': { name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
  
  // North America
  'new york': { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
  'los angeles': { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
  'chicago': { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
  'houston': { name: 'Houston', latitude: 29.7604, longitude: -95.3698 },
  'toronto': { name: 'Toronto', latitude: 43.6532, longitude: -79.3832 },
  'montreal': { name: 'Montreal', latitude: 45.5017, longitude: -73.5673 },
  'vancouver': { name: 'Vancouver', latitude: 49.2827, longitude: -123.1207 },
  
  // Australia
  'sydney': { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
  'melbourne': { name: 'Melbourne', latitude: -37.8136, longitude: 144.9631 },
  'brisbane': { name: 'Brisbane', latitude: -27.4698, longitude: 153.0251 },
  'perth': { name: 'Perth', latitude: -31.9505, longitude: 115.8605 },
  
  // East Asia
  'beijing': { name: 'Beijing', latitude: 39.9042, longitude: 116.4074 },
  'shanghai': { name: 'Shanghai', latitude: 31.2304, longitude: 121.4737 },
  'tokyo': { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  'seoul': { name: 'Seoul', latitude: 37.5665, longitude: 126.9780 },
  
  // Africa
  'nairobi': { name: 'Nairobi', latitude: -1.2921, longitude: 36.8219 },
  'lagos': { name: 'Lagos', latitude: 6.5244, longitude: 3.3792 },
  'johannesburg': { name: 'Johannesburg', latitude: -26.2041, longitude: 28.0473 },
  'cape town': { name: 'Cape Town', latitude: -33.9249, longitude: 18.4241 }
};

/**
 * Get coordinates for a city
 * @param {string} cityName - Name of the city (case-insensitive)
 * @returns {Object|null} City object with name, latitude, longitude or null if not found
 */
function getCityCoordinates(cityName) {
  const normalized = cityName.toLowerCase().trim();
  return CITIES[normalized] || null;
}

/**
 * Get list of all available cities
 * @returns {Array} Array of city names
 */
function getAvailableCities() {
  return Object.values(CITIES).map(city => city.name).sort();
}

/**
 * Search cities by partial name
 * @param {string} query - Search query
 * @returns {Array} Array of matching city objects
 */
function searchCities(query) {
  const normalized = query.toLowerCase().trim();
  return Object.entries(CITIES)
    .filter(([cityKey]) => cityKey.includes(normalized))
    .map(([, cityData]) => cityData);
}

module.exports = {
  getCityCoordinates,
  getAvailableCities,
  searchCities
};
