import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { User, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { SettingsDialog } from "./SettingsDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useProfile } from "@/contexts/ProfileContext";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { userProfile } = useProfile();

  const handleProfile = () => {
    navigate('/profile');
    setOpen(false);
  };

  const handleSettings = () => {
    setSettingsOpen(true);
    setOpen(false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    setOpen(false);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: "Theme changed",
      description: `Switched to ${newTheme} mode`,
    });
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto rounded-full">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/30 transition-all">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="gradient-primary text-foreground font-semibold">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0 card-soft" side="right" align="start">
          <Card className="border-0 shadow-none">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="gradient-primary text-foreground font-semibold text-sm">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 cursor-pointer" onClick={handleProfile}>
                  <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{userProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start h-9" 
                  onClick={handleProfile}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start h-9" 
                  onClick={handleSettings}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start h-9" 
                  onClick={handleThemeToggle}
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
              </div>
              <Separator className="my-3" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start h-9 text-destructive hover:text-destructive" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
      
      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}