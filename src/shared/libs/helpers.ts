export const normolizeImagePath = (path: string): string =>
  path.replace(/tcd\//, "tcd-pic/").split("?")[0];

