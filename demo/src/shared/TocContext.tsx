import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface TocContextValue {
  items: TocItem[];
  setItems: (items: TocItem[]) => void;
}

const TocContext = createContext<TocContextValue | null>(null);

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([]);

  return (
    <TocContext.Provider value={{ items, setItems }}>
      {children}
    </TocContext.Provider>
  );
}

export function useToc(): TocContextValue {
  const ctx = useContext(TocContext);
  if (!ctx) {
    throw new Error('useToc must be used within a TocProvider');
  }
  return ctx;
}

export function useRegisterToc(items: TocItem[]): void {
  const { setItems } = useToc();

  useEffect(() => {
    setItems(items);
    return () => {
      setItems([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
