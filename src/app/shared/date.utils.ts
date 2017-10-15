
export function formatDiffDate (d1: Date, d2: Date): string {
  if (!d1 || !d2) {
    return '';
  }
  const msDiff = d1.getTime() - d2.getTime();
  return `${Math.floor(msDiff / 1000)}s ${msDiff % 1000}`
};

export function formatDiffDateShort (d1: Date, d2: Date): string {
  if (!d1 || !d2) {
    return '';
  }
  const msDiff = d1.getTime() - d2.getTime();
  return `${Math.floor(msDiff / 1000)}s ${Math.floor((msDiff % 1000) / 100)}`
};
