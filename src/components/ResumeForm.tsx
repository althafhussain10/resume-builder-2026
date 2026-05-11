import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableItem";

const ResumeForm = () => {
  const { data, setData } = useResume();

  const updatePersonal = (field: string, value: string) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), institution: "", degree: "", field: "", startDate: "", endDate: "" }],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const updateSkills = (value: string) => {
    setData(prev => ({ ...prev, skills: value.split(",").map(s => s.trim()).filter(Boolean) }));
  };

  const updateLanguages = (value: string) => {
    setData(prev => ({ ...prev, languages: value.split(",").map(s => s.trim()).filter(Boolean) }));
  };

  const addCertification = () => {
    setData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), { id: Date.now().toString(), name: "", issuer: "", date: "" }],
    }));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).map(c => c.id === id ? { ...c, [field]: value } : c),
    }));
  };

  const removeCertification = (id: string) => {
    setData(prev => ({ ...prev, certifications: (prev.certifications || []).filter(c => c.id !== id) }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const reorder = <T extends { id: string }>(list: T[], activeId: string, overId: string) => {
    const oldIndex = list.findIndex(i => i.id === activeId);
    const newIndex = list.findIndex(i => i.id === overId);
    if (oldIndex < 0 || newIndex < 0) return list;
    return arrayMove(list, oldIndex, newIndex);
  };

  const onDragEndExperience = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    setData(prev => ({ ...prev, experience: reorder(prev.experience, String(e.active.id), String(e.over!.id)) }));
  };
  const onDragEndEducation = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    setData(prev => ({ ...prev, education: reorder(prev.education, String(e.active.id), String(e.over!.id)) }));
  };
  const onDragEndCertifications = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    setData(prev => ({ ...prev, certifications: reorder(prev.certifications || [], String(e.active.id), String(e.over!.id)) }));
  };

  return (
    <div className="space-y-4 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="font-heading text-xl font-bold text-foreground">Resume Details</h2>

      <Accordion type="multiple" defaultValue={["personal", "experience", "education", "skills", "certifications"]} className="space-y-2">
        <AccordionItem value="personal" className="border rounded-lg bg-card px-4">
          <AccordionTrigger className="font-heading font-semibold text-sm">Personal Information</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Full Name</Label><Input value={data.personalInfo.fullName} onChange={e => updatePersonal("fullName", e.target.value)} /></div>
              <div><Label className="text-xs">Job Title</Label><Input value={data.personalInfo.title} onChange={e => updatePersonal("title", e.target.value)} /></div>
              <div><Label className="text-xs">Email</Label><Input value={data.personalInfo.email} onChange={e => updatePersonal("email", e.target.value)} /></div>
              <div><Label className="text-xs">Phone</Label><Input value={data.personalInfo.phone} onChange={e => updatePersonal("phone", e.target.value)} /></div>
              <div><Label className="text-xs">Location</Label><Input value={data.personalInfo.location} onChange={e => updatePersonal("location", e.target.value)} /></div>
              <div><Label className="text-xs">LinkedIn</Label><Input value={data.personalInfo.linkedin || ""} onChange={e => updatePersonal("linkedin", e.target.value)} /></div>
            </div>
            <div><Label className="text-xs">Website</Label><Input value={data.personalInfo.website || ""} onChange={e => updatePersonal("website", e.target.value)} /></div>
            <div>
              <Label className="text-xs">Professional Summary</Label>
              <Textarea value={data.personalInfo.summary} onChange={e => updatePersonal("summary", e.target.value)} rows={4} placeholder="Write a paragraph, or start lines with '-' to render as bullet points." />
              <p className="text-[10px] text-muted-foreground mt-1">Tip: Start each line with "-" to display as a bullet list.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border rounded-lg bg-card px-4">
          <AccordionTrigger className="font-heading font-semibold text-sm">Experience</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEndExperience}>
              <SortableContext items={data.experience.map(e => e.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                {data.experience.map(exp => (
                  <SortableItem key={exp.id} id={exp.id}>
                    <Card className="relative">
                      <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-8 w-8 z-10 text-destructive" onClick={() => removeExperience(exp.id)}><Trash2 className="h-4 w-4" /></Button>
                      <CardContent className="pt-4 pl-12 pr-10 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div><Label className="text-xs">Company</Label><Input value={exp.company} onChange={e => updateExperience(exp.id, "company", e.target.value)} /></div>
                          <div><Label className="text-xs">Position</Label><Input value={exp.position} onChange={e => updateExperience(exp.id, "position", e.target.value)} /></div>
                          <div><Label className="text-xs">Start Date</Label><Input value={exp.startDate} onChange={e => updateExperience(exp.id, "startDate", e.target.value)} /></div>
                          <div><Label className="text-xs">End Date</Label><Input value={exp.endDate} onChange={e => updateExperience(exp.id, "endDate", e.target.value)} /></div>
                        </div>
                        <div>
                          <Label className="text-xs">Description</Label>
                          <Textarea value={exp.description} onChange={e => updateExperience(exp.id, "description", e.target.value)} rows={3} placeholder="Write a paragraph, or start lines with '-' to render as bullet points." />
                          <p className="text-[10px] text-muted-foreground mt-1">Tip: Start each line with "-" to display as a bullet list.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </SortableItem>
                ))}
                </div>
              </SortableContext>
            </DndContext>
            <Button variant="outline" size="sm" onClick={addExperience} className="w-full"><Plus className="h-3 w-3 mr-1" />Add Experience</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border rounded-lg bg-card px-4">
          <AccordionTrigger className="font-heading font-semibold text-sm">Education</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEndEducation}>
              <SortableContext items={data.education.map(e => e.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                {data.education.map(edu => (
                  <SortableItem key={edu.id} id={edu.id}>
                    <Card className="relative">
                      <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-8 w-8 z-10 text-destructive" onClick={() => removeEducation(edu.id)}><Trash2 className="h-4 w-4" /></Button>
                      <CardContent className="pt-4 pl-12 pr-10 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div><Label className="text-xs">Institution</Label><Input value={edu.institution} onChange={e => updateEducation(edu.id, "institution", e.target.value)} /></div>
                          <div><Label className="text-xs">Degree</Label><Input value={edu.degree} onChange={e => updateEducation(edu.id, "degree", e.target.value)} /></div>
                          <div><Label className="text-xs">Field</Label><Input value={edu.field} onChange={e => updateEducation(edu.id, "field", e.target.value)} /></div>
                          <div className="grid grid-cols-2 gap-2">
                            <div><Label className="text-xs">Start</Label><Input value={edu.startDate} onChange={e => updateEducation(edu.id, "startDate", e.target.value)} /></div>
                            <div><Label className="text-xs">End</Label><Input value={edu.endDate} onChange={e => updateEducation(edu.id, "endDate", e.target.value)} /></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SortableItem>
                ))}
                </div>
              </SortableContext>
            </DndContext>
            <Button variant="outline" size="sm" onClick={addEducation} className="w-full"><Plus className="h-3 w-3 mr-1" />Add Education</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border rounded-lg bg-card px-4">
          <AccordionTrigger className="font-heading font-semibold text-sm">Skills & Languages</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <div><Label className="text-xs">Skills (comma-separated)</Label><Textarea value={data.skills.join(", ")} onChange={e => updateSkills(e.target.value)} rows={2} /></div>
            <div><Label className="text-xs">Languages (comma-separated)</Label><Input value={(data.languages || []).join(", ")} onChange={e => updateLanguages(e.target.value)} /></div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications" className="border rounded-lg bg-card px-4">
          <AccordionTrigger className="font-heading font-semibold text-sm">Certifications</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEndCertifications}>
              <SortableContext items={(data.certifications || []).map(c => c.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                {(data.certifications || []).map(cert => (
                  <SortableItem key={cert.id} id={cert.id}>
                    <Card className="relative">
                      <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-8 w-8 z-10 text-destructive" onClick={() => removeCertification(cert.id)}><Trash2 className="h-4 w-4" /></Button>
                      <CardContent className="pt-4 pl-12 pr-10 space-y-2">
                        <div><Label className="text-xs">Certification Name</Label><Input value={cert.name} onChange={e => updateCertification(cert.id, "name", e.target.value)} /></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div><Label className="text-xs">Issuer</Label><Input value={cert.issuer} onChange={e => updateCertification(cert.id, "issuer", e.target.value)} /></div>
                          <div><Label className="text-xs">Date</Label><Input value={cert.date} onChange={e => updateCertification(cert.id, "date", e.target.value)} /></div>
                        </div>
                      </CardContent>
                    </Card>
                  </SortableItem>
                ))}
                </div>
              </SortableContext>
            </DndContext>
            <Button variant="outline" size="sm" onClick={addCertification} className="w-full"><Plus className="h-3 w-3 mr-1" />Add Certification</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeForm;