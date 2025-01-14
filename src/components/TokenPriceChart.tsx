import { useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { TokenTradeForm } from "./TokenTradeForm";
import { mockToken, mockTrades } from "@/mocks/tokenData";

interface TokenPriceChartProps {
  tokenId: string;
}

export const TokenPriceChart = ({ tokenId }: TokenPriceChartProps) => {
  const token = mockToken;
  const trades = mockTrades;

  // Calculate price data from trades
  const priceData = trades?.map((trade) => ({
    timestamp: new Date(trade.created_at).toLocaleTimeString(),
    price: Number(trade.price),
  })) || [];

  const handleTrade = async (tradeType: 'buy' | 'sell', amount: number, price: number, totalCost: number) => {
    if (!token) return;

    toast.success(
      `Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${amount} tokens for ${totalCost.toFixed(8)} STX`
    );
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Bonding Curve</h3>
      <div className="h-[300px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceData}>
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(8)} STX`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.8)",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <TokenTradeForm token={token} onTrade={handleTrade} />
      
      <p className="text-sm text-muted-foreground mt-4">
        Remaining Tokens: {token.remaining_tokens.toLocaleString()}
      </p>
    </Card>
  );
};