// Convert Unix timestamp to readable date
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Check if a record is older than a given number of days
export const isRecordExpired = (
  timestamp: number,
  maxAgeDays: number
): boolean => {
  const now = Date.now();
  const ageInMs = now - timestamp;

  return ageInMs > maxAgeDays * 24 * 60 * 60 * 1000;
};