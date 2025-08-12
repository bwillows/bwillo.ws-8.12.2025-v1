export function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

/**
 * Converts an epoch timestamp (seconds or milliseconds) to a JavaScript Date object.
 * @param {number|string} epoch - The timestamp (in seconds or milliseconds).
 * @returns {Date|null} A Date object, or null if invalid.
 */
export function toDate(epoch) {
    if (typeof epoch === 'string') {
        epoch = Number(epoch);
    }

    if (!Number.isFinite(epoch)) return null;

    // If it's in seconds, convert to milliseconds
    if (epoch < 1e12) {
        epoch *= 1000;
    }

    const date = new Date(epoch);
    return isNaN(date.getTime()) ? null : date;
}

/**
 * Converts an epoch timestamp to a human-readable date string.
 * - If less than 1 hour ago → "X minutes ago"
 * - If less than 24 hours → "X hours ago"
 * - If less than 30 days → "X days ago"
 * - Else → "Mon, Day, Year"
 * 
 * @param {number|string} epoch - Timestamp in seconds or milliseconds
 * @returns {string}
 */
export function formatTimestamp(epoch) {
    if (typeof epoch === 'string') epoch = Number(epoch);
    if (!Number.isFinite(epoch)) return '';

    // Convert to ms if in seconds
    if (epoch < 1e12) epoch *= 1000;

    const now = Date.now();
    const diff = now - epoch;

    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;

    if (diff < HOUR) {
        const mins = Math.floor(diff / MINUTE);
        return `${mins <= 0 ? 1 : mins} minute${mins === 1 ? '' : 's'} ago`;
    } else if (diff < DAY) {
        const hours = Math.floor(diff / HOUR);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (diff < MONTH) {
        const days = Math.floor(diff / DAY);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
        const date = new Date(epoch);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]}, ${date.getDate()}, ${date.getFullYear()}`;
    }
}

export function formatTimestampExpanded(epoch) {
  // Handle seconds or milliseconds
  if (epoch.toString().length === 10) {
    epoch *= 1000; // convert seconds to ms
  }
  
  const date = new Date(epoch);

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Get ordinal suffix for the day
  function getOrdinal(n) {
    if (n >= 11 && n <= 13) return n + "th";
    switch (n % 10) {
      case 1: return n + "st";
      case 2: return n + "nd";
      case 3: return n + "rd";
      default: return n + "th";
    }
  }

  const monthName = months[date.getMonth()];
  const day = getOrdinal(date.getDate());
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert to 12-hour format

  return `${monthName} ${day}, ${year} at ${hours}:${minutes}${ampm}`;
}

export function formatTimestampWithTimezoneExpanded(epoch, timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) {
  // Handle seconds or milliseconds
  if (epoch.toString().length === 10) {
    epoch *= 1000; // convert seconds to ms
  }
  
  // Use Intl to get date parts including timezone abbreviation
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  }).formatToParts(new Date(epoch));

  let monthName, day, year, hours, minutes, ampm, tzAbbrev;
  for (const part of parts) {
    if (part.type === 'month') monthName = part.value;
    if (part.type === 'day') day = part.value;
    if (part.type === 'year') year = part.value;
    if (part.type === 'hour') hours = part.value;
    if (part.type === 'minute') minutes = part.value;
    if (part.type === 'dayPeriod') ampm = part.value.toLowerCase(); // lowercase am/pm
    if (part.type === 'timeZoneName') tzAbbrev = part.value;
  }

  // Get ordinal suffix
  function getOrdinal(n) {
    const num = Number(n);
    if (num >= 11 && num <= 13) return num + "th";
    switch (num % 10) {
      case 1: return num + "st";
      case 2: return num + "nd";
      case 3: return num + "rd";
      default: return num + "th";
    }
  }

  return `${monthName} ${getOrdinal(day)}, ${year} at ${hours}:${minutes}${ampm} ${tzAbbrev}`;
}
