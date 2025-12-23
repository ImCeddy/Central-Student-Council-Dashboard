import { Menu } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-orange-400 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-white text-sm sm:text-base lg:text-lg">CSC</span>
            </div>
            <div>
              <h1 className="text-sm sm:text-base lg:text-lg">Central Student Council</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">PUP Santa Tomas Campus Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}