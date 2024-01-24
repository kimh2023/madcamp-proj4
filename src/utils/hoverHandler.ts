export const hoverEnter = () => {
  if (document.querySelector("body") !== null) {
    (document.querySelector("body") as HTMLBodyElement).style.cursor =
      "var(--cursor-pointer) 8 2, pointer";
  }
};

export const hoverLeave = () => {
  if (document.querySelector("body") !== null) {
    (document.querySelector("body") as HTMLBodyElement).style.cursor =
      "var(--cursor-auto) 8 2, auto";
  }
};
