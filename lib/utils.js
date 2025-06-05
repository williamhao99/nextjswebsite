// lib/utils.js

/**
 * Format a date string according to the specified format
 * @param {string|Date} date - The date to format
 * @param {string} format - The format string
 * @returns {string} Formatted date string
 */
export function formatDate(date, format) {
  const d = new Date(date);
  
  // Format tokens
  const tokens = {
    'YYYY': d.getFullYear(),
    'YY': d.getFullYear().toString().slice(-2),
    'MMMM': new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d),
    'MMM': new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d),
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'M': d.getMonth() + 1,
    'DD': String(d.getDate()).padStart(2, '0'),
    'D': d.getDate(),
    'HH': String(d.getHours()).padStart(2, '0'),
    'H': d.getHours(),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'm': d.getMinutes(),
    'ss': String(d.getSeconds()).padStart(2, '0'),
    's': d.getSeconds()
  };
  
  // Replace tokens in format string
  let result = format;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(token, value);
  }
  
  return result;
}

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, length) {
  if (!text || text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Truncate text by word count
 * @param {string} text - The text to truncate
 * @param {number} wordCount - Maximum number of words
 * @returns {string} Truncated text
 */
export function truncateText(text, wordCount) {
  if (!text) return '';
  const words = text.split(/\s+/);
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
}

/**
 * Extract excerpt from HTML content
 * @param {string} html - HTML content
 * @param {number} length - Maximum length
 * @returns {string} Plain text excerpt
 */
export function getExcerpt(html, length = 200) {
  if (!html) return '';
  
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  
  // Truncate and return
  return truncate(text, length);
}
