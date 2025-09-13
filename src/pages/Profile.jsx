import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, MapPin, Phone, Edit, Award, Clock, Target } from "lucide-react";
import { useTaskFlow } from "@/hooks/useTaskFlow";

const Profile = () => {
  const { tasks, activeProject } = useTaskFlow();

  // Mock user data - in a real app, this would come from the backend
  const userProfile = {
    name: "Asha Patel",
    email: "asha@taskflow.com",
    role: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    joinDate: "2022-03-15",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b84e2b19?w=120&h=120&fit=crop&crop=face",
    bio: "Passionate product manager with 5+ years of experience in building user-centric products. I love working with cross-functional teams to deliver exceptional user experiences.",
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Team Leadership"],
    stats: {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.status === 'done').length,
      activeProjects: 1,
      averageCompletionTime: "2.3 days"
    }
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <Layout showAnalytics={false}>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 card-soft">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="gradient-primary text-foreground font-semibold text-2xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-foreground mb-1">{userProfile.name}</h2>
                <p className="text-muted-foreground mb-2">{userProfile.role}</p>
                <Badge variant="secondary" className="mb-4">{userProfile.department}</Badge>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Joined {new Date(userProfile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card className="p-6 card-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
              <p className="text-muted-foreground leading-relaxed">{userProfile.bio}</p>
            </Card>

            {/* Skills */}
            <Card className="p-6 card-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6 card-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Activity Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{userProfile.stats.totalTasks}</div>
                  <div className="text-sm text-muted-foreground">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{userProfile.stats.completedTasks}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{userProfile.stats.activeProjects}</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{userProfile.stats.averageCompletionTime}</div>
                  <div className="text-sm text-muted-foreground">Avg. Completion</div>
                </div>
              </div>
            </Card>

            {/* Recent Tasks */}
            <Card className="p-6 card-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Tasks</h3>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'highest' ? 'bg-red-500' :
                        task.priority === 'high' ? 'bg-orange-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <div className="font-medium text-sm text-foreground">{task.title}</div>
                        <div className="text-xs text-muted-foreground">{task.status}</div>
                      </div>
                    </div>
                    <Badge variant={task.status === 'done' ? 'default' : 'secondary'}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
