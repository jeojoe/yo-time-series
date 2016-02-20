export const stringToUTF16Series = (string) => {
  return string
    .split('')
    .map((c) => c.charCodeAt(0))
};


