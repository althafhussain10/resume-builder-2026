import { useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import {
  ClassicTemplate, ModernTemplate, MinimalTemplate, CreativeTemplate,
  ProfessionalTemplate, ElegantTemplate, BoldTemplate, TechTemplate,
  ExecutiveTemplate, CompactTemplate,
} from "@/components/templates/ResumeTemplates";

const templateMap: Record<string, React.FC<{ data: any }>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  elegant: ElegantTemplate,
  bold: BoldTemplate,
  tech: TechTemplate,
  executive: ExecutiveTemplate,
  compact: CompactTemplate,
};

const ResumePreview = () => {
  const { data, selectedTemplate } = useResume();
  const printRef = useRef<HTMLDivElement>(null);

  const Template = templateMap[selectedTemplate] || ClassicTemplate;

  const handleExport = () => {
    if (!printRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>${data.personalInfo.fullName} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { size: A4; margin: 0; }
        body { width: 210mm; min-height: 297mm; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      </style>
      <script src="https://cdn.tailwindcss.com"><\/script>
      </head><body>${printRef.current.innerHTML}</body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="font-heading font-semibold text-sm">Preview</span>
          <span className="text-xs text-muted-foreground capitalize">— {selectedTemplate}</span>
        </div>
        <Button onClick={handleExport} size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />Export PDF
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-muted/50 p-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-sm w-[210mm] min-h-[297mm] overflow-hidden" ref={printRef}>
          <Template data={data} />
        </div>
      </div>
      <div className="px-6 py-2 border-t bg-card text-center">
        <p className="text-[10px] text-muted-foreground">Developed by Mohamed Althaf Hussain</p>
      </div>
    </div>
  );
};

export default ResumePreview;
