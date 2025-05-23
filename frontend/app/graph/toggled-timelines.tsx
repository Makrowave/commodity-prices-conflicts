import React, {createContext, useContext, useState, type ReactNode} from "react";
import type {Conflict} from "~/const/models";

type ToggledConflictsContextType = {
  hiddenConflicts: Conflict[];
  toggleConflict: (conflict: Conflict) => void;
};


const ToggleConflictsContext = createContext<ToggledConflictsContextType | undefined>(undefined);

export const ToggledConflictsProvider = ({children}: { children: ReactNode }) => {
  const [hiddenConflicts, setHiddenConflicts] = useState<Conflict[]>([]);

  const toggleConflict = (conflict: Conflict) => {
    if (isHidden(conflict)) {
      setHiddenConflicts((prev) => (prev.filter((c) => c.id !== conflict.id)));
    } else {
      setHiddenConflicts((prev) => [...prev, conflict]);
    }
  }

  const isHidden = (conflict: Conflict) => {
    return hiddenConflicts.some((c) => c.id === conflict.id);
  }

  return (
    <ToggleConflictsContext.Provider value={{hiddenConflicts, toggleConflict}}>
      {children}
    </ToggleConflictsContext.Provider>
  );
};

export const useToggledConflicts = () => {
  const context = useContext(ToggleConflictsContext);
  if (!context) {
    throw new Error("useTheme must be used within a AuthProvider");
  }
  return context;
};
