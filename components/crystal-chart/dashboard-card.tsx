import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: {
    text: string;
    href: string;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  link,
}) => {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <div className="flex items-center mb-2">
          {icon && <div className="mr-2 text-2xl">{icon}</div>}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
      {link && (
        <CardFooter>
          <a href={link.href} className="text-blue-500 text-sm hover:underline">
            {link.text}
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
