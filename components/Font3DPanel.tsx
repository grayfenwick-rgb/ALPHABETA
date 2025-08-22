<<<<<<< HEAD
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";

// List your fonts here (add .ttf files to /public/fonts/)
const FONTS = [
  { name: "Roboto", file: "/fonts/Roboto-Bold.ttf" },
  { name: "Lato", file: "/fonts/Lato-Bold.ttf" },
  { name: "Montserrat", file: "/fonts/Montserrat-Bold.ttf" }
  // ...add more as needed
];

export default function Font3DPanel() {
  const [text, setText] = useState("A");
  const [font, setFont] = useState(FONTS[0].file);
  const [fontSize, setFontSize] = useState(2);
  const [bevelEnabled, setBevelEnabled] = useState(true);
  const [bevelSize, setBevelSize] = useState(0.05);
  const [bevelThickness, setBevelThickness] = useState(0.1);
  const [extrude, setExtrude] = useState(0.1);
  const [rotY, setRotY] = useState(0);

  return (
    <div>
      {/* Controls */}
      <div style={{ marginBottom: 14 }}>
        <input value={text} onChange={e => setText(e.target.value)} maxLength={1} style={{ width: 40, marginRight: 12 }} />
        <select value={font} onChange={e => setFont(e.target.value)} style={{ marginRight: 12 }}>
          {FONTS.map(f => <option key={f.file} value={f.file}>{f.name}</option>)}
        </select>
        <label style={{ marginRight: 6 }}>Font Size:</label>
        <input type="range" min="1" max="5" step="0.1" value={fontSize} onChange={e => setFontSize(+e.target.value)} />
        <span>{fontSize}</span>
        <label style={{ marginLeft: 14, marginRight: 6 }}>Bevel:</label>
        <input type="checkbox" checked={bevelEnabled} onChange={e => setBevelEnabled(e.target.checked)} />
        <label style={{ marginLeft: 14, marginRight: 6 }}>Bevel Size:</label>
        <input type="range" min="0" max="0.2" step="0.01" value={bevelSize} onChange={e => setBevelSize(+e.target.value)} />
        <span>{bevelSize}</span>
        <label style={{ marginLeft: 14, marginRight: 6 }}>Bevel Thickness:</label>
        <input type="range" min="0" max="0.3" step="0.01" value={bevelThickness} onChange={e => setBevelThickness(+e.target.value)} />
        <span>{bevelThickness}</span>
        <label style={{ marginLeft: 14, marginRight: 6 }}>Rotation Y:</label>
        <input type="range" min="0" max={Math.PI * 2} step="0.05" value={rotY} onChange={e => setRotY(+e.target.value)} />
        <span>{rotY.toFixed(2)}</span>
      </div>

      {/* 3D Viewer */}
      <div style={{ width: 400, height: 300, background: "#181f2c", borderRadius: 12, marginBottom: 10 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight />
          <directionalLight position={[5, 10, 7]} intensity={1.2} />
          <Text
            position={[0, 0, 0]}
            font={font}
            fontSize={fontSize}
            color="#fafafa"
            bevelEnabled={bevelEnabled}
            bevelSize={bevelSize}
            bevelThickness={bevelThickness}
            depth={extrude}
            rotation={[0, rotY, 0]}
          >
            {text}
          </Text>
          <OrbitControls />
        </Canvas>
      </div>

      {/* Export/Magic Wand */}
      <button style={{ marginRight: 12 }} onClick={() => alert("Export coming soon!")}>Export PNG/GLB/WEBM</button>
      <button onClick={() => alert("Magic wand = send to Stable Horde!")}>✨ Magic Wand</button>
    </div>
  );
}
=======
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";

// List your fonts here (add .ttf files to /public/fonts/)
const FONTS = [
  { name: "Roboto", file: "/fonts/Roboto-Bold.ttf" },
  { name: "Lato", file: "/fonts/Lato-Bold.ttf" },
  { name: "Montserrat", file: "/fonts/Montserrat-Bold.ttf" }
  // ...add more as needed
];

export default function Font3DPanel() {
  const [text, setText] = useState("A");
  const [font, setFont] = useState(FONTS[0].file);
  const [fontSize, setFontSize] = useState(2);
  const [bevelEnabled, setBevelEnabled] = useState(true);
  const [bevelSize, setBevelSize] = useState(0.05);
  const [bevelThickness, setBevelThickness] = useState(0.1);
  const [extrude, setExtrude] = useState(0.1);
  const [rotY, setRotY] = useState(0);

  return (
    <div>
      {/* Controls */}
      <div style={{ marginBottom: 14 }}>
        <input value={text} onChange={e => setText(e.target.value)} maxLength={1} style={{ width: 40, marginRight: 12 }} />
        <select value={font} onChange={e => setFont(e.target.value)} style={{ marginRight: 12 }}>
          {FONTS.map(f => <option key={f.file} value={f.file}>{f.name}</option>)}
        </select>
        <label style={{ marginRight: 6 }}>Font Size:</label>
        <input type="range" min="1" max="5" step="0.1" value={fontSize} onChange={e => setFontSize(+e.target.value)} />
        <span>{fontSize}</span>
        <label style={{ marginLeft: 14, marginRight: 6 }}>Bevel:</label>
        <input type="checkbox" checked={bevelEnabled} onChange={e => setBevelEnabled(e.target.checked)} />
        <label style={{ marginLeft: 14, marginRight: 6 }}>Bevel Size:</label>
        <input type="range" min="0" max="0.2" step="0.01" value={bevelSize} onChange={e => setBevelSize(+e.target.value)} />
        <span>{bevelSize}</span>
        <label style={{ marginLeft: 14, marginRight: 6 }}>Bevel Thickness:</label>
        <input type="range" min="0" max="0.3" step="0.01" value={bevelThickness} onChange={e => setBevelThickness(+e.target.value)} />
        <span>{bevelThickness}</span>
        <label style={{ marginLeft: 14, marginRight: 6 }}>Rotation Y:</label>
        <input type="range" min="0" max={Math.PI * 2} step="0.05" value={rotY} onChange={e => setRotY(+e.target.value)} />
        <span>{rotY.toFixed(2)}</span>
      </div>

      {/* 3D Viewer */}
      <div style={{ width: 400, height: 300, background: "#181f2c", borderRadius: 12, marginBottom: 10 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight />
          <directionalLight position={[5, 10, 7]} intensity={1.2} />
          <Text
            position={[0, 0, 0]}
            font={font}
            fontSize={fontSize}
            color="#fafafa"
            bevelEnabled={bevelEnabled}
            bevelSize={bevelSize}
            bevelThickness={bevelThickness}
            depth={extrude}
            rotation={[0, rotY, 0]}
          >
            {text}
          </Text>
          <OrbitControls />
        </Canvas>
      </div>

      {/* Export/Magic Wand */}
      <button style={{ marginRight: 12 }} onClick={() => alert("Export coming soon!")}>Export PNG/GLB/WEBM</button>
      <button onClick={() => alert("Magic wand = send to Stable Horde!")}>✨ Magic Wand</button>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224
