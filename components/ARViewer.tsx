'use client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
/** Only include fonts that exist in /public/fonts */
const FONTS = [
  { label: 'Helvetiker', url: '/fonts/helvetiker_regular.typeface.json' },
];

type ar_viewer_props = {
  /** accept either prop style to avoid breaking callers */
  dark_mode?: boolean;
  darkMode?: boolean;
};

function text_mesh({
  text_value,
  font_url,
  extrude_height,
  bevel_size,
  mesh_color,
  scale_xyz,
  position_xyz,
  rotation_xyz,
  flip_xy
}: {
  text_value: string;
  font_url: string;
  extrude_height: number;
  bevel_size: number;
  mesh_color: string;
  scale_xyz: [number, number, number];
  position_xyz: [number, number, number];
  rotation_xyz: [number, number, number];
  flip_xy: [number, number];
}) {
  // load font (no try/catch around hooks)
    // clamp geometry values
  const safe_extrude = Math.max(0.01, extrude_height);
  const safe_bevel   = Math.max(0, bevel_size);
  const safe_scale   = [
    Math.max(0.001, scale_xyz[0]) * flip_xy[0],
    Math.max(0.001, scale_xyz[1]) * flip_xy[1],
    Math.max(0.001, scale_xyz[2]),
  ] as [number, number, number];

  return (
    <Text3D
      font={font_url}
      size={1}
      height={safe_extrude}
      bevelEnabled
      bevelSize={safe_bevel}
      bevelThickness={safe_bevel}
      position={position_xyz}
      scale={safe_scale}
      rotation={rotation_xyz}
      letterSpacing={0.04}
      lineHeight={1}
      castShadow
      receiveShadow
    >
      {text_value}
      <meshStandardMaterial
        color={mesh_color}
        metalness={0.18}
        roughness={0.45}
        opacity={1}
        transparent={false}
      />
    </Text3D>
  );
}

export default function ar_viewer(props: ar_viewer_props) {
  const is_dark = props.dark_mode ?? props.darkMode ?? true;

  const [text_value, set_text_value] = use_state('Hello 3D!\nType here');
  const [font_url, set_font_url]     = use_state(FONTS[0].url);

  const [extrude_height, set_extrude_height] = use_state(0.34);
  const [bevel_size, set_bevel_size]         = use_state(0.04);
  const [mesh_color, set_mesh_color]         = use_state('#49fff8');

  const [scale_xyz, set_scale_xyz]       = use_state<[number, number, number]>([1, 1, 1]);
  const [position_xyz, set_position_xyz] = use_state<[number, number, number]>([0, 0, 0]);
  const [rotation_xyz, set_rotation_xyz] = use_state<[number, number, number]>([0, 0, 0]);
  const [flip_xy, set_flip_xy]           = use_state<[number, number]>([1, 1]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: is_dark ? '#181a24' : '#ffffff',
        color: is_dark ? '#49fff8' : '#333',
        padding: 12,
        boxSizing: 'border-box',
        fontFamily: 'inherit',
      }}
    >
      {/* controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 5 }}>
        <input
          value={text_value}
          onChange={(e) => set_text_value(e.target.value)}
          placeholder="Type here..."
          style={{
            fontSize: 18,
            padding: '7px 10px',
            borderRadius: 8,
            border: is_dark ? '1.5px solid #49fff8cc' : '1.5px solid #bbb',
            background: is_dark ? '#10141c' : '#f7f7fc',
            color: is_dark ? '#49fff8' : '#225',
            outline: 'none',
            width: 160,
          }}
        />
        <select
          value={font_url}
          onChange={(e) => set_font_url(e.target.value)}
          style={{
            fontSize: 16,
            borderRadius: 8,
            padding: '7px 9px',
            border: is_dark ? '1.5px solid #49fff8cc' : '1.5px solid #bbb',
            background: is_dark ? '#10141c' : '#ffffff',
            color: is_dark ? '#49fff8' : '#225',
          }}
        >
          {FONTS.map((f) => (
            <option key={f.url} value={f.url}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* canvas */}
      <div
        style={{
          flex: 1,
          minHeight: 330,
          borderRadius: 10,
          background: is_dark ? '#10141c' : '#f7f7fc',
        }}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[8, 12, 12]} intensity={1.4} />

          {text_mesh({
            text_value,
            font_url,
            extrude_height,
            bevel_size,
            mesh_color,
            scale_xyz,
            position_xyz,
            rotation_xyz,
            flip_xy,
          })}

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

// local alias to keep snake_case in code without shadowing React import
function use_state<T>(initial: T) {
  return useState<T>(initial);
}
