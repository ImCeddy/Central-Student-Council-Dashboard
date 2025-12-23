import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  borderColor?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  borderColor = 'border-l-primary',
  onClick,
}: StatsCardProps) {
  return (
    <Card 
      className={`p-3 sm:p-4 lg:p-6 border-l-4 ${borderColor} hover:shadow-lg transition-all ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3>{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className={`text-sm flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}