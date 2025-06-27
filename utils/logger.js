const fs = require('fs');
const path = require('path');

/**
 * Simple logging utility
 */
class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '..', 'logs');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
    
    this.logFile = path.join(this.logDir, `${this._getDate()}.log`);
  }
  
  /**
   * Gets current date in YYYY-MM-DD format
   * @returns {string} - Formatted date
   */
  _getDate() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  
  /**
   * Gets current time in HH:MM:SS format
   * @returns {string} - Formatted time
   */
  _getTime() {
    const date = new Date();
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  }
  
  /**
   * Logs a message with timestamp
   * @param {string} level - Log level (INFO, WARNING, ERROR, DEBUG)
   * @param {string} message - Message to log
   */
  log(level, message) {
    const timestamp = `[${this._getDate()} ${this._getTime()}]`;
    const logMessage = `${timestamp} [${level}] ${message}`;
    
    // Log to console
    console.log(logMessage);
    
    // Log to file
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }
  
  /**
   * Logs an info message
   * @param {string} message - Message to log
   */
  info(message) {
    this.log('INFO', message);
  }
  
  /**
   * Logs a warning message
   * @param {string} message - Message to log
   */
  warn(message) {
    this.log('WARNING', message);
  }
  
  /**
   * Logs an error message
   * @param {string} message - Message to log
   */
  error(message) {
    this.log('ERROR', message);
  }
  
  /**
   * Logs a debug message
   * @param {string} message - Message to log
   */
  debug(message) {
    this.log('DEBUG', message);
  }
}

module.exports = new Logger();
