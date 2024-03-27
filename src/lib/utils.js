export function titleCase(a) {
  return a.replace(a[0], a[0].toUpperCase());
}
export function NoU(obj) {
  //isUndefined
  return typeof obj !== "undefined" ? true : false;
}
