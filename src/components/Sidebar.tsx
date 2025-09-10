import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FolderKanban, Settings, Bell } from "lucide-react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { ProfileDropdown } from "./ProfileDropdown";
import { SettingsDialog } from "./SettingsDialog";
import { useTaskFlow, Project } from "@/hooks/useTaskFlow";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface SidebarProps {
  projects: Project[];
  activeProject: Project;
  onSwitchProject: (projectId: number) => void;
  onCreateProject: (name: string) => void;
}

export function Sidebar({ projects, activeProject, onSwitchProject, onCreateProject }: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 2 overdue tasks and 3 upcoming deadlines",
    });
  };

  const handleSettings = () => {
    setSettingsOpen(true);
  };
  return (
    <div className="w-80 h-screen gradient-warm border-r border-border/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <ProfileDropdown />
          <div>
            <h2 className="font-semibold text-lg">Good morning, Asha</h2>
            <p className="text-muted-foreground text-sm">3 tasks due today</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="flex-1 button-glow"
            onClick={handleNotifications}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="button-glow"
            onClick={handleSettings}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Projects</h3>
        </div>
        
        <div className="space-y-3">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-card border-border/50 ${
                project.active ? 'ring-2 ring-primary/30 shadow-card' : 'hover:shadow-soft'
              }`}
              onClick={() => onSwitchProject(project.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${project.color} shadow-sm`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">{project.tasks} tasks</p>
                </div>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-border/50">
        <CreateProjectDialog onCreateProject={onCreateProject} />
      </div>

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}