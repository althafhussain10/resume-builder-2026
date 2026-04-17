import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ResumeProvider } from "@/context/ResumeContext";
import AppSidebar from "@/components/AppSidebar";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Eye, Layout } from "lucide-react";
import SaveLoadMenu from "@/components/SaveLoadMenu";

const MobileLayout = () => (
  <div className="min-h-screen flex flex-col">
    <header className="h-12 flex items-center border-b bg-card px-4">
      <h1 className="font-heading font-bold text-lg">Resume Builder</h1>
      <SaveLoadMenu />
    </header>
    <Tabs defaultValue="form" className="flex-1 flex flex-col">
      <TabsList className="w-full rounded-none border-b bg-card h-10 shrink-0">
        <TabsTrigger value="form" className="flex-1 gap-1.5 text-xs">
          <FileText className="h-3.5 w-3.5" />Edit
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex-1 gap-1.5 text-xs">
          <Layout className="h-3.5 w-3.5" />Templates
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex-1 gap-1.5 text-xs">
          <Eye className="h-3.5 w-3.5" />Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="form" className="flex-1 overflow-auto mt-0">
        <ResumeForm />
      </TabsContent>
      <TabsContent value="templates" className="flex-1 overflow-auto mt-0 p-2">
        <AppSidebarContent />
      </TabsContent>
      <TabsContent value="preview" className="flex-1 overflow-auto mt-0">
        <ResumePreview />
      </TabsContent>
    </Tabs>
    <div className="px-4 py-2 border-t bg-card text-center">
      <p className="text-[10px] text-muted-foreground">Developed by Mohamed Althaf Hussain</p>
    </div>
  </div>
);

const DesktopLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center border-b bg-card px-4 gap-2">
          <SidebarTrigger />
          <h1 className="font-heading font-bold text-lg">Resume Builder</h1>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[420px] border-r bg-card overflow-hidden flex-shrink-0">
            <ResumeForm />
          </div>
          <div className="flex-1 overflow-hidden">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  </SidebarProvider>
);

// Extract sidebar content for mobile reuse
import TemplatePicker from "@/components/TemplatePicker";
const AppSidebarContent = () => <TemplatePicker />;

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <ResumeProvider>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </ResumeProvider>
  );
};

export default Index;
