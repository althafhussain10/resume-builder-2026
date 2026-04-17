import { useEffect, useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Save, FolderOpen, Trash2, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { ResumeData } from "@/types/resume";

const STORAGE_KEY = "resume-builder-saved";

interface SavedResume {
  name: string;
  data: ResumeData;
  template: string;
  savedAt: string;
}

const loadAll = (): Record<string, SavedResume> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const SaveLoadMenu = () => {
  const { data, setData, selectedTemplate, setSelectedTemplate } = useResume();
  const [saved, setSaved] = useState<Record<string, SavedResume>>({});
  const [saveOpen, setSaveOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => { setSaved(loadAll()); }, []);

  const refresh = () => setSaved(loadAll());

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) { toast.error("Please enter a name"); return; }
    const all = loadAll();
    all[trimmed] = { name: trimmed, data, template: selectedTemplate, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    refresh();
    setSaveOpen(false);
    setName("");
    toast.success(`Saved "${trimmed}"`);
  };

  const handleLoad = (key: string) => {
    const item = saved[key];
    if (!item) return;
    setData(item.data);
    setSelectedTemplate(item.template);
    toast.success(`Loaded "${item.name}"`);
  };

  const handleDelete = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const all = loadAll();
    delete all[key];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    refresh();
    toast.success(`Deleted "${key}"`);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify({ data, template: selectedTemplate }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.personalInfo.fullName || "resume"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Resume exported");
  };

  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        if (parsed.data) setData(parsed.data);
        if (parsed.template) setSelectedTemplate(parsed.template);
        toast.success("Resume imported");
      } catch {
        toast.error("Invalid file");
      }
    };
    input.click();
  };

  const entries = Object.values(saved).sort((a, b) => b.savedAt.localeCompare(a.savedAt));

  return (
    <div className="flex items-center gap-1.5">
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 h-8">
            <Save className="h-3.5 w-3.5" /><span className="hidden sm:inline">Save</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Save Resume</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Software Engineer 2025"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            {saved[name.trim()] && (
              <p className="text-xs text-muted-foreground">A resume with this name will be overwritten.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 h-8">
            <FolderOpen className="h-3.5 w-3.5" /><span className="hidden sm:inline">Load</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-popover">
          <DropdownMenuLabel>Saved Resumes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {entries.length === 0 ? (
            <div className="px-2 py-3 text-xs text-muted-foreground text-center">No saved resumes yet</div>
          ) : (
            entries.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => handleLoad(item.name)}
                className="flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-sm">{item.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(item.savedAt).toLocaleDateString()}
                  </span>
                </div>
                <Trash2
                  className="h-3.5 w-3.5 text-destructive shrink-0 hover:opacity-70"
                  onClick={(e) => handleDelete(item.name, e)}
                />
              </DropdownMenuItem>
            ))
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportJson} className="cursor-pointer">
            <Download className="h-3.5 w-3.5 mr-2" />Export as JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleImportJson} className="cursor-pointer">
            <Upload className="h-3.5 w-3.5 mr-2" />Import from JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SaveLoadMenu;