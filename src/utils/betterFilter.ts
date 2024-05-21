export const betterFilter = (q: string) => {
  return q.toLowerCase().replace(/['-]/g, "").trim();
};
