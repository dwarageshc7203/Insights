import { createContext, useContext } from 'react';

export const CanvasInteractionContext = createContext(null);

export function useCanvasInteraction() {
  const context = useContext(CanvasInteractionContext);
  if (!context) {
    throw new Error('useCanvasInteraction must be used within CanvasInteractionProvider');
  }
  return context;
}

export function CanvasInteractionProvider({ value, children }) {
  return (
    <CanvasInteractionContext.Provider value={value}>
      {children}
    </CanvasInteractionContext.Provider>
  );
}
