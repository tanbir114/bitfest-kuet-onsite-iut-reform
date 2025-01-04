import { format, parseISO } from 'date-fns';

export function processTimestampWithDateFns(timestamp: any) {
    // Parse the timestamp into a Date object
    const date = parseISO(timestamp);

    // Format the day of the week (e.g., "Friday")
    const day = format(date, 'EEEE'); // Full day name

    // Format the date (e.g., "January 3, 2025")
    const formattedDate = format(date, 'MMMM d, yyyy');

    return { day, formattedDate };
}

// Output: { day: 'Friday', formattedDate: 'January 3, 2025' }
