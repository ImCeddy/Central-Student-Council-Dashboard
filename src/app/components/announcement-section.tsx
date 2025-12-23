import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, CircleAlert, Megaphone } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  source: string;
  type: 'announcement' | 'urgent' | 'event';
}

interface AnnouncementSectionProps {
  announcements: Announcement[];
  type: 'announcement' | 'urgent' | 'event';
}

export function AnnouncementSection({ announcements, type }: AnnouncementSectionProps) {
  const getIcon = () => {
    switch (type) {
      case 'urgent':
        return <CircleAlert className="h-5 w-5" />;
      case 'event':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Megaphone className="h-5 w-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'urgent':
        return 'Urgent';
      case 'event':
        return 'Events';
      default:
        return 'Announcements';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'event':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
        {getIcon()}
        <h2>{getTypeLabel()}</h2>
      </div>
      
      {announcements.length === 0 ? (
        <Card className="p-4 sm:p-6 lg:p-8 text-center">
          <p className="text-muted-foreground">
            No {getTypeLabel().toLowerCase()} at the moment.
          </p>
        </Card>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="flex-1">{announcement.title}</h4>
                  <Badge variant="secondary" className={getTypeColor()}>
                    {announcement.source}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{announcement.content}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}