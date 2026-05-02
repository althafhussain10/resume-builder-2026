import { useRef, useState, useMemo } from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Download, Eye, ArrowDownUp } from "lucide-react";
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
  const [sortCertsDesc, setSortCertsDesc] = useState(false);

  const Template = templateMap[selectedTemplate] || ClassicTemplate;

  const displayData = useMemo(() => {
    if (!sortCertsDesc || !data.certifications?.length) return data;
    const parse = (s: string) => {
      const t = Date.parse(s);
      if (!isNaN(t)) return t;
      const m = s?.match(/(\d{4})/);
      return m ? parseInt(m[1]) : 0;
    };
    const sorted = [...data.certifications].sort((a, b) => parse(b.date) - parse(a.date));
    return { ...data, certifications: sorted };
  }, [data, sortCertsDesc]);

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
      <div className="flex items-center justify-between px-6 py-3 border-b bg-card gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="font-heading font-semibold text-sm">Preview</span>
          <span className="text-xs text-muted-foreground capitalize truncate">— {selectedTemplate}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={() => setSortCertsDesc(v => !v)}
            size="sm"
            variant={sortCertsDesc ? "secondary" : "outline"}
            className="gap-1.5"
            title="Sort certifications by date (newest first)"
          >
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span>{sortCertsDesc ? "Sorted: Newest" : "Sort Certs"}</span>
          </Button>
          <Button onClick={handleExport} size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />Export PDF
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-muted/50 p-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-sm w-[210mm] min-h-[297mm] overflow-hidden" ref={printRef}>
          <Template data={displayData} />
        </div>
      </div>
      <div className="px-6 py-2 border-t bg-card text-center">
        <p className="text-[10px] text-muted-foreground">Developed by Mohamed Althaf Hussain</p>
      </div>
    </div>
  );
};

export default ResumePreview;