import { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState(() => {
    // Check localStorage for saved profile data
    const savedProfile = localStorage.getItem('taskflow-profile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    
    // Default profile data
    return {
      name: "Asha Patel",
      email: "asha@taskflow.com",
      role: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      phone: "+1 (555) 123-4567",
      joinDate: "2022-03-15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b84e2b19?w=120&h=120&fit=crop&crop=face",
      bio: "Passionate product manager with 5+ years of experience in building user-centric products. I love working with cross-functional teams to deliver exceptional user experiences.",
      skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Team Leadership"]
    };
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('taskflow-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const value = {
    userProfile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
