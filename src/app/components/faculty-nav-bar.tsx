import { Building2, GraduationCap, Users, UserCircle } from 'lucide-react';
import { Card } from './ui/card';

interface FacultyNavBarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function FacultyNavBar({ activeSection, onNavigate }: FacultyNavBarProps) {
  const facultyPages = [
    {
      id: 'academic',
      name: 'Academic Head',
      icon: GraduationCap,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 'student-affairs',
      name: 'Student Affairs',
      icon: Users,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      id: 'home',
      name: 'General',
      icon: UserCircle,
      color: 'bg-gradient-to-br from-primary to-orange-400',
      isDefault: true,
    },
    {
      id: 'admission',
      name: 'Admission',
      icon: Building2,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      id: 'csc-page',
      name: 'CSC',
      icon: UserCircle,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="bg-white border-t border-b shadow-sm sticky bottom-0 z-40">
      <div className="container max-w-7xl mx-auto px-2 lg:px-4 py-2">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {facultyPages.map((page) => {
            const Icon = page.icon;
            const isActive = activeSection === page.id;

            return (
              <Card
                key={page.id}
                className={`flex-1 max-w-[100px] sm:max-w-[120px] p-1.5 sm:p-2 cursor-pointer transition-all hover:shadow-md ${
                  isActive ? 'ring-2 ring-primary shadow-md' : ''
                }`}
                onClick={() => onNavigate(page.id)}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${page.color} shadow-sm transition-transform ${
                      isActive ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className={`text-[9px] sm:text-[10px] leading-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {page.name}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}