export const normolizeImagePath = (path: string): string =>
  path.replace(/tcd\//, "tcd-pic/").split("?")[0];

export const isYearInRange = (year: number, range: string) => {
    const [from, to] = range.split(" - ");

    const fromYear = from
      ? Number(from.split(".")[0])
      : -Infinity;

    const toYear = to
      ? Number(to.split(".")[0])
      : Infinity;

    return year >= fromYear && year <= toYear;
  };