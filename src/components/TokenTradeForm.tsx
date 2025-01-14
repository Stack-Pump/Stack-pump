import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface TokenTradeFormProps {
  token: {
    id: string;
    remaining_tokens: number;
    total_supply: number;
  };
  onTrade: (type: 'buy' | 'sell', amount: number, price: number, totalCost: number) => void;
}

export const TokenTradeForm = ({ token, onTrade }: TokenTradeFormProps) => {
  const [stxAmount, setStxAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [activeInput, setActiveInput] = useState<"stx" | "token">("stx");

  // Calculate price based on bonding curve formula
  const calculatePrice = (supply: number, amount: number = 1) => {
    const soldTokens = (token.total_supply || 0) - supply;
    const basePrice = 0.00001; // Starting at 0.00001 STX
    return basePrice * Math.exp(0.0000000023 * (soldTokens + amount));
  };

  // Calculate token amount from STX input
  const calculateTokensFromSTX = (stxAmount: number) => {
    if (!token || stxAmount <= 0) return 0;
    let tokens = 0;
    let currentSupply = token.remaining_tokens;
    let remainingSTX = stxAmount;
    let iterations = 0;
    const maxIterations = 100; // Prevent infinite loops

    while (remainingSTX > 0 && iterations < maxIterations) {
      const currentPrice = calculatePrice(currentSupply);
      if (currentPrice <= remainingSTX) {
        tokens += 1;
        remainingSTX -= currentPrice;
        currentSupply -= 1;
      } else {
        break;
      }
      iterations++;
    }
    return tokens;
  };

  // Calculate STX return from token amount
  const calculateSTXFromTokens = (tokenAmount: number) => {
    if (!token || tokenAmount <= 0) return 0;
    let totalSTX = 0;
    let currentSupply = token.remaining_tokens;

    for (let i = 0; i < tokenAmount; i++) {
      const price = calculatePrice(currentSupply + i);
      totalSTX += price;
    }
    return totalSTX;
  };

  // Handle input changes
  useEffect(() => {
    if (activeInput === "stx" && stxAmount) {
      const numStx = Number(stxAmount);
      if (!isNaN(numStx) && numStx > 0) {
        const calculatedTokens = calculateTokensFromSTX(numStx);
        setTokenAmount(calculatedTokens.toString());
      }
    } else if (activeInput === "token" && tokenAmount) {
      const numTokens = Number(tokenAmount);
      if (!isNaN(numTokens) && numTokens > 0) {
        const stx = calculateSTXFromTokens(numTokens);
        setStxAmount(stx.toFixed(8));
      }
    }
  }, [stxAmount, tokenAmount, activeInput, token]);

  const handleTrade = async (tradeType: 'buy' | 'sell') => {
    if (!token) return;
    
    const numAmount = tradeType === 'buy' ? Number(stxAmount) : Number(tokenAmount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const calculatedTokenAmount = tradeType === 'buy' ? 
      calculateTokensFromSTX(Number(stxAmount)) : 
      Number(tokenAmount);

    if (tradeType === 'buy' && calculatedTokenAmount > token.remaining_tokens) {
      toast.error("Not enough tokens available");
      return;
    }

    const currentPrice = calculatePrice(token.remaining_tokens, calculatedTokenAmount);
    const totalCost = tradeType === 'buy' ? 
      Number(stxAmount) : 
      calculateSTXFromTokens(Number(tokenAmount));

    onTrade(tradeType, calculatedTokenAmount, currentPrice, totalCost);
    setStxAmount("");
    setTokenAmount("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">STX Amount</label>
          <Input
            type="number"
            placeholder="Amount of STX"
            value={stxAmount}
            onChange={(e) => {
              setStxAmount(e.target.value);
              setActiveInput("stx");
            }}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Token Amount</label>
          <Input
            type="number"
            placeholder="Amount of tokens"
            value={tokenAmount}
            onChange={(e) => {
              setTokenAmount(e.target.value);
              setActiveInput("token");
            }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => handleTrade('buy')} className="flex-1">
          Buy
        </Button>
        <Button onClick={() => handleTrade('sell')} variant="secondary" className="flex-1">
          Sell
        </Button>
      </div>
    </div>
  );
};