import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Settings, Navigation } from "lucide-react";
import { useState } from "react";
import { mockTokens, mockPools, calculateSwapAmount } from "@/mocks/dexData";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Dex = () => {
  const { walletAddress } = useWallet();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[1]);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      const pool = mockPools.find(
        p => 
          (p.token0.id === fromToken.id && p.token1.id === toToken.id) ||
          (p.token1.id === fromToken.id && p.token0.id === toToken.id)
      );
      
      if (pool) {
        const isToken0 = pool.token0.id === fromToken.id;
        const amountOut = calculateSwapAmount(
          numValue,
          isToken0 ? pool.reserve0 : pool.reserve1,
          isToken0 ? pool.reserve1 : pool.reserve0
        );
        setToAmount(amountOut.toFixed(6));
      }
    } else {
      setToAmount("");
    }
  };

  const handleSwap = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    const numAmount = parseFloat(fromAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (numAmount > fromToken.balance) {
      toast.error("Insufficient balance");
      return;
    }

    setIsSwapping(true);
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Swap successful!");
      setFromAmount("");
      setToAmount("");
    } catch (error) {
      toast.error("Swap failed. Please try again.");
    } finally {
      setIsSwapping(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Link to="/dex" className="text-white font-medium hover:text-primary transition-colors">
              Swap
            </Link>
            <Link to="/pool" className="text-white/80 hover:text-primary transition-colors">
              Pool
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Card className="glass-card p-6 bg-black/40">
          <div className="space-y-4">
            <div className="glass-card p-4 bg-white/5">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-white/90 font-medium">From</span>
                <span className="text-sm text-white/90">
                  Balance: {fromToken.balance} {fromToken.symbol}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="bg-transparent border-none text-2xl text-white placeholder:text-white/50"
                />
                <Button className="min-w-[120px] bg-white/10 hover:bg-white/20 text-white">
                  {fromToken.symbol}
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-white/80 hover:text-white hover:bg-white/10"
                onClick={switchTokens}
              >
                <ArrowDownUp className="h-5 w-5" />
              </Button>
            </div>

            <div className="glass-card p-4 bg-white/5">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-white/90 font-medium">To</span>
                <span className="text-sm text-white/90">
                  Balance: {toToken.balance} {toToken.symbol}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  readOnly
                  className="bg-transparent border-none text-2xl text-white placeholder:text-white/50"
                />
                <Button className="min-w-[120px] bg-white/10 hover:bg-white/20 text-white">
                  {toToken.symbol}
                </Button>
              </div>
            </div>

            <Button 
              className="w-full button-glow bg-primary hover:bg-primary/90" 
              size="lg"
              onClick={handleSwap}
              disabled={isSwapping || !walletAddress}
            >
              {isSwapping ? "Swapping..." : walletAddress ? "Swap" : "Connect Wallet to Swap"}
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dex;