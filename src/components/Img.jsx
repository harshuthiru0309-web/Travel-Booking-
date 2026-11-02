import { useState } from "react";
// Image with gradient fallback if it fails to load
export default function Img({ src, alt, c1, c2, className }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={className} role="img" aria-label={alt} style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}
