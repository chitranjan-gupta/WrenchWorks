export const navigation = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Blog", href: "/blog" },
  { id: 3, name: "Car", href: "/car" },
  { id: 4, name: "Features", href: "#features" },
  { id: 5, name: "Marketplace", href: "#" },
];

export function NoU(obj) {
  //isUndefined
  return typeof obj !== "undefined" ? true : false;
}