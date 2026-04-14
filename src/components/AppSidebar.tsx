import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";
import TemplatePicker from "@/components/TemplatePicker";
import { FileText } from "lucide-react";

const AppSidebar = () => {
  return (
    <Sidebar className="border-r-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-sidebar-primary font-heading text-base font-bold px-4 py-3">
            <FileText className="h-5 w-5" />
            Resume Builder
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TemplatePicker />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-foreground/50 text-center">
          Developed by Mohamed Althaf Hussain
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
