import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";

export const WithdrawLiquidityForm = ({ pool }) => {
  const [percentage, setPercentage] = useState("");
  const { toast } = useToast();
  const { walletAddress } = useWallet();

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to withdraw liquidity",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Liquidity Withdrawn",
      description: `Successfully withdrawn ${percentage}% of your liquidity from the pool`,
    });
  };

  return (
    <form onSubmit={handleWithdraw} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-white/70">
          Withdrawal Percentage
        </label>
        <Input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Enter percentage (1-100)"
          min="1"
          max="100"
          className="bg-background/5 text-white border-white/10"
        />
      </div>
      <Button type="submit" variant="destructive" className="w-full">
        Withdraw Liquidity
      </Button>
    </form>
  );
};