import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  FolderKanban, 
  Users, 
  Target, 
  Clock, 
  CheckCircle, 
  Circle,
  TrendingUp,
  Calendar,
  Star,
  List,
  PlayCircle,
  BarChart3
} from "lucide-react";
import { useTaskFlow } from "@/hooks/useTaskFlow";
import { useProfile } from "@/contexts/ProfileContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { projects, tasks, createProject } = useTaskFlow();
  const { userProfile } = useProfile();
  const navigate = useNavigate();

  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const recentTasks = tasks.slice(0, 5);
  const activeProjects = projects.filter(project => project.active);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleCreateProject = () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
      createProject(projectName);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userProfile.name.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground text-lg">Here's what's happening with your projects today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 card-soft">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{totalTasks}</div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 card-soft">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{completedTasks}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 card-soft">
            <div className="flex items-center gap-3">
              <Circle className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{totalTasks - completedTasks}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 card-soft">
            <div className="flex items-center gap-3">
              <FolderKanban className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 card-soft mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Overall Progress</h2>
            <Badge variant="outline">{completionRate}% Complete</Badge>
          </div>
          <Progress value={completionRate} className="h-3 mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedTasks} completed</span>
            <span>{totalTasks - completedTasks} remaining</span>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Your Projects</h2>
              <Button onClick={handleCreateProject} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
            
            <div className="space-y-4">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="p-4 cursor-pointer transition-all duration-200 hover:shadow-card border-border/50 hover:shadow-soft"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.color} shadow-sm`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.tasks} tasks</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.active && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
              
              {projects.length === 0 && (
                <Card className="p-8 text-center card-soft">
                  <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No projects yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create your first project to get started</p>
                  <Button onClick={handleCreateProject}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </Card>
              )}
            </div>
          </div>

          {/* Recent Tasks Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Tasks</h2>
            
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <Card key={task.id} className="p-4 card-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'highest' ? 'bg-red-500' :
                        task.priority === 'high' ? 'bg-orange-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <div className="font-medium text-sm text-foreground">{task.title}</div>
                        <div className="text-xs text-muted-foreground">{task.dueDate}</div>
                      </div>
                    </div>
                    <Badge variant={task.status === 'done' ? 'default' : 'secondary'}>
                      {task.status}
                    </Badge>
                  </div>
                </Card>
              ))}
              
              {recentTasks.length === 0 && (
                <Card className="p-8 text-center card-soft">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No tasks yet</h3>
                  <p className="text-sm text-muted-foreground">Tasks will appear here as you create them</p>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 card-soft mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/backlog')}>
              <List className="h-6 w-6" />
              <span>View Backlog</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/sprint')}>
              <PlayCircle className="h-6 w-6" />
              <span>Active Sprint</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/reports')}>
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
