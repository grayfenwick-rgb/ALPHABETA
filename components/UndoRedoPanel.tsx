<<<<<<< HEAD
'use client';
import React from 'react';

export default function UndoRedoPanel({
  undo,
  redo,
  canUndo,
  canRedo
}: {
  undo: () => void,
  redo: () => void,
  canUndo: boolean,
  canRedo: boolean
}) {
  return (
    <div style={{display:'flex', gap:12, alignItems:'center'}}>
      <button className="select" disabled={!canUndo} onClick={undo}>⎌ Undo</button>
      <button className="select" disabled={!canRedo} onClick={redo}>⎌ Redo</button>
    </div>
  );
}
=======
'use client';
import React from 'react';

export default function UndoRedoPanel({
  undo,
  redo,
  canUndo,
  canRedo
}: {
  undo: () => void,
  redo: () => void,
  canUndo: boolean,
  canRedo: boolean
}) {
  return (
    <div style={{display:'flex', gap:12, alignItems:'center'}}>
      <button className="select" disabled={!canUndo} onClick={undo}>⎌ Undo</button>
      <button className="select" disabled={!canRedo} onClick={redo}>⎌ Redo</button>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224
