export const customQuantity = (wantedServings, originalServings, quantity) => {
  return ((wantedServings / originalServings) * quantity)
    .toFixed(2)
    .replace(/\.00$/, "");
};

