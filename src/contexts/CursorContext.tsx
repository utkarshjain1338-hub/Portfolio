import React, { createContext, useContext, useState, useCallback } from 'react';

interface CursorContextType {
  isLink: boolean;
  isNode: boolean;
  setIsLink: (v: boolean) => void;
  setIsNode: (v: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  isLink: false,
  isNode: false,
  setIsLink: () => {},
  setIsNode: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLink, setIsLinkState] = useState(false);
  const [isNode, setIsNodeState] = useState(false);

  const setIsLink = useCallback((v: boolean) => setIsLinkState(v), []);
  const setIsNode = useCallback((v: boolean) => setIsNodeState(v), []);

  return (
    <CursorContext.Provider value={{ isLink, isNode, setIsLink, setIsNode }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
