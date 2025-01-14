import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Users, ArrowUpRight, MessageSquare, Wallet } from "lucide-react";
import { mockToken } from "@/mocks/tokenData";

interface TokenStatsProps {
  tokenId: string;
}

export const TokenStats = ({ tokenId }: TokenStatsProps) => {
  const token = mockToken;
  const TOTAL_SUPPLY = 1000000000; // 1 billion constant

  if (!token) return null;

  const progress = ((TOTAL_SUPPLY - token.remaining_tokens) / TOTAL_SUPPLY) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Remaining Tokens</p>
          <p className="text-2xl font-bold">{token.remaining_tokens.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">of {TOTAL_SUPPLY.toLocaleString()}</p>
        </div>
        <Progress value={progress} className="w-24" />
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Creator</p>
            <p className="text-sm font-mono truncate w-32">{token.token_address}</p>
          </div>
          <Wallet className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Holders</p>
            <p className="text-2xl font-bold">{token.holders?.toLocaleString() || 0}</p>
          </div>
          <Users className="h-8 w-8 text-primary animate-float" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold">{token.transactions?.toLocaleString() || 0}</p>
          </div>
          <ArrowUpRight className="h-8 w-8 text-primary animate-bounce" />
        </div>
      </Card>
    </div>
  );
};