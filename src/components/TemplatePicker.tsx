import { useResume } from "@/context/ResumeContext";
import { cn } from "@/lib/utils";

const templates = [
  { id: "classic", name: "Classic", color: "#2d3748" },
  { id: "modern", name: "Modern", color: "#3b82f6" },
  { id: "minimal", name: "Minimal", color: "#718096" },
  { id: "creative", name: "Creative", color: "#e85d3a" },
  { id: "professional", name: "Professional", color: "#1e3a5f" },
  { id: "elegant", name: "Elegant", color: "#6D2E46" },
  { id: "bold", name: "Bold", color: "#0d0d0d" },
  { id: "tech", name: "Tech", color: "#4f46e5" },
  { id: "executive", name: "Executive", color: "#064e3b" },
  { id: "compact", name: "Compact", color: "#5c2018" },
];

const TemplatePicker = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-heading text-sm font-semibold text-sidebar-foreground">Templates</h3>
      <div className="grid grid-cols-2 gap-2">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={cn(
              "relative rounded-lg border-2 p-2 text-xs font-medium transition-all hover:scale-105",
              selectedTemplate === t.id
                ? "border-sidebar-primary bg-sidebar-accent text-sidebar-primary"
                : "border-sidebar-border text-sidebar-foreground hover:border-sidebar-primary/50"
            )}
          >
            <div className="w-full aspect-[3/4] rounded mb-1.5 flex flex-col items-start justify-start p-1.5 gap-0.5" style={{ backgroundColor: t.color + "15", borderLeft: `3px solid ${t.color}` }}>
              <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: t.color }} />
              <div className="h-0.5 rounded-full w-full bg-muted-foreground/20" />
              <div className="h-0.5 rounded-full w-2/3 bg-muted-foreground/20" />
              <div className="h-0.5 rounded-full w-5/6 bg-muted-foreground/20" />
              <div className="h-0.5 rounded-full w-1/2 bg-muted-foreground/20 mt-1" />
              <div className="h-0.5 rounded-full w-3/4 bg-muted-foreground/20" />
            </div>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;
