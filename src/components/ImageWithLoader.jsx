import { useState } from "react";

export const  ImageWithLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-full" />
      )}

      <img
        src={error ? "/placeholder.png" : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setError(true);
        }}
        className={`
          absolute
          max-h-full
          max-w-full
          object-contain
          transition-opacity
          duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </>
  );
}
