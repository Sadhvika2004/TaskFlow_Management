
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const initialProjects = [
  { id: 1, name: "Mobile App Redesign", color: "bg-primary", tasks: 12, active: true },
  { id: 2, name: "Website Launch", color: "bg-secondary", tasks: 8, active: false },
  { id: 3, name: "Brand Guidelines", color: "bg-accent", tasks: 5, active: false },
  { id: 4, name: "Marketing Campaign", color: "bg-destructive", tasks: 15, active: false },
];

const initialTasks = [
  {
    id: 1,
    title: "Design system documentation",
    description: "Create comprehensive design tokens and component library docs",
    priority: "high",
    dueDate: "Today",
    tags: ["Design", "Documentation"],
    status: "todo",
    type: "story",
    storyPoints: 8,
    sprintId: 1,
    reporter: "Product Manager",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-03",
    comments: [],
    assignees: [
      { name: "Alex", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
      { name: "Sam", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 2,
    title: "User research interviews",
    description: "Conduct 5 user interviews for mobile app feedback",
    priority: "medium",
    dueDate: "Tomorrow",
    tags: ["Research", "UX"],
    status: "todo",
    type: "task",
    storyPoints: 5,
    sprintId: 1,
    reporter: "UX Lead",
    createdAt: "2024-12-02",
    updatedAt: "2024-12-02",
    comments: [
      {
        id: 1,
        author: "Jordan",
        content: "I'll coordinate with the research team to schedule these interviews.",
        createdAt: "2024-12-02"
      }
    ],
    assignees: [
      { name: "Jordan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 3,
    title: "Marketing content calendar",
    description: "Plan Q4 content strategy and social media posts",
    priority: "low",
    dueDate: "Dec 15",
    tags: ["Marketing"],
    status: "todo",
    type: "epic",
    storyPoints: 13,
    reporter: "Marketing Director",
    createdAt: "2024-11-28",
    updatedAt: "2024-12-01",
    comments: [],
    assignees: []
  },
  {
    id: 4,
    title: "Mobile app prototype",
    description: "High-fidelity prototype for user testing",
    priority: "highest",
    dueDate: "Dec 8",
    tags: ["Design", "Prototype"],
    status: "progress",
    type: "story",
    storyPoints: 13,
    sprintId: 1,
    reporter: "Product Manager",
    createdAt: "2024-11-30",
    updatedAt: "2024-12-03",
    comments: [
      {
        id: 2,
        author: "Taylor",
        content: "Working on the navigation flows, should be ready for review by EOD.",
        createdAt: "2024-12-03"
      }
    ],
    assignees: [
      { name: "Taylor", avatar: "https://images.unsplash.com/photo-1494790108755-2616b84e2b19?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 5,
    title: "Landing page copy",
    description: "Review and finalize homepage messaging",
    priority: "medium",
    dueDate: "Dec 10",
    tags: ["Copy", "Website"],
    status: "review",
    type: "task",
    storyPoints: 3,
    sprintId: 1,
    reporter: "Content Lead",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-03",
    comments: [],
    assignees: [
      { name: "Chris", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 6,
    title: "Logo variations",
    description: "Create logo variations for different use cases",
    priority: "low",
    dueDate: "Completed",
    tags: ["Design", "Branding"],
    status: "done",
    type: "task",
    storyPoints: 2,
    sprintId: 1,
    reporter: "Brand Manager",
    createdAt: "2024-11-25",
    updatedAt: "2024-11-28",
    comments: [],
    assignees: [
      { name: "Morgan", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face" }
    ]
  },
  {
    id: 7,
    title: "Login page bug fix",
    description: "Fix authentication redirect issue on login page",
    priority: "highest",
    dueDate: "Today",
    tags: ["Bug", "Authentication"],
    status: "todo",
    type: "bug",
    storyPoints: 2,
    sprintId: 1,
    reporter: "QA Engineer",
    createdAt: "2024-12-03",
    updatedAt: "2024-12-03",
    comments: [
      {
        id: 3,
        author: "QA Engineer",
        content: "Users are being redirected to 404 after successful login. Critical issue.",
        createdAt: "2024-12-03"
      }
    ],
    assignees: []
  }
];

const initialSprints = [
  {
    id: 1,
    name: "Sprint 1 - Foundation",
    goal: "Establish core features and user experience foundation",
    startDate: "2024-12-01",
    endDate: "2024-12-14",
    status: "active",
    tasks: [1, 2, 4, 5, 6, 7]
  },
  {
    id: 2,
    name: "Sprint 2 - Enhancement",
    goal: "Enhance user interface and add advanced features",
    startDate: "2024-12-15",
    endDate: "2024-12-28",
    status: "planning",
    tasks: []
  }
];

export function useTaskFlow() {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [sprints, setSprints] = useState(initialSprints);
  const [activeProject, setActiveProject] = useState(initialProjects[0]);
  const [activeSprint, setActiveSprint] = useState(initialSprints[0]);

  const switchProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjects(prev => prev.map(p => ({ ...p, active: p.id === projectId })));
      setActiveProject(project);
      toast({
        title: "Project switched",
        description: `Now viewing ${project.name}`,
      });
    }
  };

  const createProject = (name) => {
    const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-destructive"];
  const newProject = {
      id: Date.now(),
      name,
      color: colors[Math.floor(Math.random() * colors.length)],
      tasks: 0,
      active: false
    };
    setProjects(prev => [...prev, newProject]);
    toast({
      title: "Project created",
      description: `${name} has been added to your projects`,
    });
  };

  const createTask = (columnId, title, description, type = 'task') => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority: "medium",
      dueDate: "No due date",
      tags: [],
      assignees: [],
  status: columnId,
      type,
      storyPoints: type === 'epic' ? 21 : type === 'story' ? 8 : 3,
      sprintId: activeSprint.id,
      reporter: "Current User",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      comments: []
    };
    setTasks(prev => [...prev, newTask]);
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} created`,
      description: `${title} has been added to ${columnId}`,
    });
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast({
      title: "Task moved",
      description: `Task moved to ${newStatus}`,
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed",
    });
  };

  const updateTaskPriority = (taskId, priority) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, priority } : task
    ));
    toast({
      title: "Priority updated",
      description: `Task priority set to ${priority}`,
    });
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    toast({
      title: "Task updated",
      description: "Task has been successfully updated",
    });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const startFocusSession = () => {
    toast({
      title: "Focus session started! 🎯",
      description: "25 minutes of focused work begins now. You've got this!",
    });
  };

  const createSprint = (name, goal, startDate, endDate) => {
    const newSprint = {
      id: Date.now(),
      name,
      goal,
      startDate,
      endDate,
      status: 'planning',
      tasks: []
    };
    setSprints(prev => [...prev, newSprint]);
    toast({
      title: "Sprint created",
      description: `${name} has been created`,
    });
  };

  const getTasksByType = (type) => {
    return tasks.filter(task => task.type === type);
  };

  const getTasksBySprint = (sprintId) => {
    return tasks.filter(task => task.sprintId === sprintId);
  };

  const getBacklogTasks = () => {
    return tasks.filter(task => !task.sprintId);
  };

  const addTaskToSprint = (taskId, sprintId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, sprintId } : task
    ));
  };

  const removeTaskFromSprint = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, sprintId: undefined } : task
    ));
  };

  return {
    projects,
    tasks,
    sprints,
    activeProject,
    activeSprint,
    switchProject,
    createProject,
    createTask,
    createSprint,
    moveTask,
    deleteTask,
    updateTaskPriority,
    updateTask,
    getTasksByStatus,
    getTasksByType,
    getTasksBySprint,
    getBacklogTasks,
    addTaskToSprint,
    removeTaskFromSprint,
    startFocusSession
  };
}