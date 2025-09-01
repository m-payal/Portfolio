import React from "react";

export default function IconRenderer({ source, alt = "", ...props }) {
  if (React.isValidElement(source)) return source;          // already JSX
  if (typeof source === "string") return <img src={source} alt={alt} {...props} />;
  if (typeof source === "object" && source?.src) return <img src={source.src} alt={alt} {...props} />;
  const C = source;                                         // assume React component
  return <C aria-hidden="true" focusable="false" />;
}
