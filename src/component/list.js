import { useState, useEffect } from "react";
export default function List({ property, value }) {
  const [prop, setProp] = useState(property || "");
  const [val, setVal] = useState(value || "");
  useEffect(() => {
    setProp((p) =>
      p
        .split("_")
        .map((a) => a.replace(a[0], a[0].toUpperCase()))
        .join(" "),
    );
  }, []);
  return (
    <li key={prop} className="flex flex-row items-center justify-between">
      <span className="font-medium text-gray-600">{prop}</span>
      <span className="text-gray-800">{val}</span>
    </li>
  );
}
