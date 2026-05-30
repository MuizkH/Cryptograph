// Format wallet addresses for display
export const shortenAddress = (address: string): string => {
  if (!address || address.length < 10) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Calculate verification percentage
export const calculateVerificationRate = (
  verified: number,
  total: number
): number => {
  if (total === 0) return 0;

  return Math.round((verified / total) * 100);
};