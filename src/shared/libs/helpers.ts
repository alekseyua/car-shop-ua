export const normalizeImagePath = (path: string): string =>
  path.replace(/tcd\//, "tcd-pic/").split("?")[0];

export const isYearInRange = (year: number, range: string) => {
  console.log({year, range})
    const [from, to] = range.split(" - ");

    const fromYear = from
      ? Number(from.split(".")[0])
      : -Infinity;

    const toYear = to
      ? Number(to.split(".")[0])
      : Infinity;

    return year >= fromYear && year <= toYear;
  };

  export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  export const getOldPrice = (price: number): number => price + (price - price * 0.95);

  export const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
