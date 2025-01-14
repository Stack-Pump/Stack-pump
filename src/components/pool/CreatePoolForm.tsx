import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { mockTokens } from "@/mocks/dexData";

export const CreatePoolForm = () => {
  const [token0, setToken0] = useState("");
  const [token1, setToken1] = useState("");
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const { toast } = useToast();
  const { walletAddress } = useWallet();

  const handleCreatePool = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to create a pool",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Pool Created",
      description: `Successfully created pool with ${amount0} ${token0} and ${amount1} ${token1}`,
    });
  };

  return (
    <form onSubmit={handleCreatePool} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-white/70">Token 1</label>
          <Select onValueChange={setToken0}>
            <SelectTrigger className="bg-background/5 text-white border-white/10">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {mockTokens.map((token) => (
                <SelectItem key={token.id} value={token.symbol}>
                  {token.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70">Amount</label>
          <Input
            type="number"
            value={amount0}
            onChange={(e) => setAmount0(e.target.value)}
            placeholder="0.0"
            className="bg-background/5 text-white border-white/10"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-white/70">Token 2</label>
          <Select onValueChange={setToken1}>
            <SelectTrigger className="bg-background/5 text-white border-white/10">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {mockTokens.map((token) => (
                <SelectItem key={token.id} value={token.symbol}>
                  {token.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70">Amount</label>
          <Input
            type="number"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            placeholder="0.0"
            className="bg-background/5 text-white border-white/10"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Create Pool
      </Button>
    </form>
  );
};