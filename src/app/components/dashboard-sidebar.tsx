import { House, Megaphone, CircleAlert, Calendar, Facebook, X } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ activeSection, onSectionChange, isOpen, onClose }: DashboardSidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'facebook', label: 'Facebook Pages', icon: Facebook },
  ];

  const NavContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs">CSC</span>
          </div>
          <div>
            <h3 className="text-sm">Central Student Council</h3>
            <p className="text-xs text-muted-foreground">PUP Santa Tomas Campus</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r z-50 lg:hidden overflow-y-auto">
            <NavContent />
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r h-screen sticky top-0 overflow-y-auto">
        <NavContent />
      </aside>
    </>
  );
}