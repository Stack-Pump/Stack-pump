import { Card } from "./ui/card";
import { mockToken } from "@/mocks/tokenData";

export const DexInfo = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">DEX Information</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Liquidity</p>
          <p className="text-2xl font-bold">${mockToken.liquidity.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <p className="text-2xl font-bold">${mockToken.volume_24h.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Pairs</p>
          <p className="text-2xl font-bold">{mockToken.total_pairs}</p>
        </div>
      </div>
    </Card>
  );
};