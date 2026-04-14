import React, { createContext, useContext, useState } from "react";
import { ResumeData, defaultResumeData } from "@/types/resume";

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: string;
  setSelectedTemplate: (t: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  return (
    <ResumeContext.Provider value={{ data, setData, selectedTemplate, setSelectedTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be inside ResumeProvider");
  return ctx;
};
