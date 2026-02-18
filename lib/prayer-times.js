const adhan = require('adhan');

/**
 * Get prayer times for a specific location and date
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @param {Date} date - Date for which to calculate prayer times
 * @returns {Object} Prayer times object
 */
function getPrayerTimes(latitude, longitude, date = new Date()) {
  const coordinates = new adhan.Coordinates(latitude, longitude);
  const params = adhan.CalculationMethod.MuslimWorldLeague();
  const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha
  };
}

/**
 * Get Sehar (Fajr) and Iftar (Maghrib) times
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @param {Date} date - Date for which to calculate times
 * @returns {Object} Sehar and Iftar times
 */
function getRamadanTimes(latitude, longitude, date = new Date()) {
  const prayerTimes = getPrayerTimes(latitude, longitude, date);
  
  return {
    sehar: prayerTimes.fajr,
    iftar: prayerTimes.maghrib,
    date: date
  };
}

/**
 * Format time to 12-hour format with AM/PM
 * @param {Date} date - Date object to format
 * @returns {string} Formatted time string
 */
function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Get timezone name for a location
 * @returns {string} Timezone name
 */
function getTimezoneName() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
}

module.exports = {
  getPrayerTimes,
  getRamadanTimes,
  formatTime,
  getTimezoneName
};
