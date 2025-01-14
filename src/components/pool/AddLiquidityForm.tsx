import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";

export const AddLiquidityForm = ({ pool }) => {
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const { toast } = useToast();
  const { walletAddress } = useWallet();

  const handleAddLiquidity = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to add liquidity",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Liquidity Added",
      description: `Successfully added ${amount0} ${pool.token0.symbol} and ${amount1} ${pool.token1.symbol} to the pool`,
    });
  };

  return (
    <form onSubmit={handleAddLiquidity} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-white/70">
          {pool.token0.symbol} Amount
        </label>
        <Input
          type="number"
          value={amount0}
          onChange={(e) => setAmount0(e.target.value)}
          placeholder="0.0"
          className="bg-background/5 text-white border-white/10"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/70">
          {pool.token1.symbol} Amount
        </label>
        <Input
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
          placeholder="0.0"
          className="bg-background/5 text-white border-white/10"
        />
      </div>
      <Button type="submit" className="w-full">
        Add Liquidity
      </Button>
    </form>
  );
};