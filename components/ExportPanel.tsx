<<<<<<< HEAD
'use client';
import React from 'react';

export default function ExportPanel({
  onExportImage,
  onExportModel
}:{
  onExportImage: ()=>void,
  onExportModel: ()=>void
}) {
  return (
    <div style={{display:'flex',gap:16,alignItems:'center'}}>
      <button className="select" onClick={onExportImage}>🖼 Export Image</button>
      <button className="select" onClick={onExportModel}>📦 Export Model</button>
    </div>
  );
}
=======
'use client';
import React from 'react';

export default function ExportPanel({
  onExportImage,
  onExportModel
}:{
  onExportImage: ()=>void,
  onExportModel: ()=>void
}) {
  return (
    <div style={{display:'flex',gap:16,alignItems:'center'}}>
      <button className="select" onClick={onExportImage}>🖼 Export Image</button>
      <button className="select" onClick={onExportModel}>📦 Export Model</button>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224
