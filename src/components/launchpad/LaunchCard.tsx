import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, ArrowUpRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LaunchCardProps {
  launch: {
    id: string;
    name: string;
    description: string;
    image_url: string | null;
    remaining_tokens: number;
    progress: number;
    holders: number;
    transactions: number;
    created_at: string;
  };
  onClick: (id: string) => void;
}

export const LaunchCard = ({ launch, onClick }: LaunchCardProps) => {
  return (
    <Card 
      className="p-6 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={() => onClick(launch.id)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={launch.image_url || undefined} alt={launch.name} />
            <AvatarFallback>{launch.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{launch.name}</h2>
            <p className="text-gray-400 text-sm mb-2">{launch.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(launch.created_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Progress value={launch.progress} className="flex-1" />
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {launch.remaining_tokens.toLocaleString()} left
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">{launch.holders} holders</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-primary" />
              <span className="text-sm">{launch.transactions} transactions</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};