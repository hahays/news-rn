export const cleanText = (input?: string | null): string => {
  if (!input) {
    return '';
  }
  return input
    .replace(/\[\+\d+\s+chars\]/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};
