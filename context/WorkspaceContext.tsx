'use client';
import React, { createContext, useContext, useState } from 'react';

type WorkspaceState = {
  activeTool: string;
  setActiveTool: (t: string) => void;
  layers: { id: number; name: string; visible: boolean }[];
  setLayers: React.Dispatch<React.SetStateAction<{ id: number; name: string; visible: boolean }[]>>;
};

const WorkspaceContext = createContext<WorkspaceState | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeTool, setActiveTool] = useState('Brush');
  const [layers, setLayers] = useState([{ id: 1, name: 'Layer 1', visible: true }]);

  return (
    <WorkspaceContext.Provider value={{ activeTool, setActiveTool, layers, setLayers }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
}
