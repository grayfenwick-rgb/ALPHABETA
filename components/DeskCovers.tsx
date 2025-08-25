'use client';
import React, { useEffect, useState } from 'react';
import FloatingPanel from './FloatingPanel';
import DeskObject from './DeskObject';

const LS_KEY = 'abc-desk-covers';

type CoversState = {
  showTools: boolean;
  showViewer: boolean;
};

const defaultState: CoversState = { showTools: false, showViewer: false };

export default function DeskCovers() {
  const [state, setState] = useState<CoversState>(defaultState);

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CoversState;
        setState({ ...defaultState, ...parsed });
      }
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <>
      {!state.showTools && (
        <DeskObject
          imageSrc="/desk/cup.png"
          alt="Coffee Mug"
          onActivate={() => setState(s => ({ ...s, showTools: true }))}
          style={{ bottom: 80, left: 100, zIndex: 5 }}
        />
      )}
      {!state.showViewer && (
        <DeskObject
          imageSrc="/desk/postit.png"
          alt="Post-it Note"
          onActivate={() => setState(s => ({ ...s, showViewer: true }))}
          style={{ bottom: 110, left: 230, zIndex: 5 }}
        />
      )}
</>
  );
}
