import { createContext, useContext, useState, ReactNode } from "react";

interface ToolData {
  sourceToolName: string;
  data: string;
}

interface ToolDataContextType {
  toolData: ToolData | null;
  setToolData: (data: ToolData | null) => void;
  clearToolData: () => void;
}

const ToolDataContext = createContext<ToolDataContextType | undefined>(undefined);

export const ToolDataProvider = ({ children }: { children: ReactNode }) => {
  const [toolData, setToolData] = useState<ToolData | null>(null);

  const clearToolData = () => setToolData(null);

  return (
    <ToolDataContext.Provider value={{ toolData, setToolData, clearToolData }}>
      {children}
    </ToolDataContext.Provider>
  );
};

export const useToolData = () => {
  const context = useContext(ToolDataContext);
  if (!context) {
    throw new Error("useToolData must be used within ToolDataProvider");
  }
  return context;
};
