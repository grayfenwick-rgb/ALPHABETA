// components/ARModelViewer.tsx
import React, { useEffect } from "react";

const ARModelViewer = ({
  src = "/models/A.glb",
  iosSrc = "/models/A.usdz",
  alt = "3D Model in AR",
  style = {},
}) => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.querySelector('script[src*="model-viewer"]')
    ) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <model-viewer
      src={src}
      ar
      ar-modes="scene-viewer quick-look webxr"
      camera-controls
      auto-rotate
      style={{
        width: "100%",
        height: "400px",
        background: "#222",
        borderRadius: "1.2em",
        ...style,
      }}
      ios-src={iosSrc}
      alt={alt}
      shadow-intensity="1"
      interaction-prompt="auto"
      disable-zoom="false"
    >
      <button
        slot="ar-button"
        style={{
          padding: "1em 2em",
          borderRadius: "0.5em",
          background: "#444",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
        }}
      >
        👓 View in AR
      </button>
    </model-viewer>
  );
};

export default ARModelViewer;
