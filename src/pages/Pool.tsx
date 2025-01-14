import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { mockPools } from "@/mocks/dexData";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddLiquidityForm } from "@/components/pool/AddLiquidityForm";
import { WithdrawLiquidityForm } from "@/components/pool/WithdrawLiquidityForm";
import { CreatePoolForm } from "@/components/pool/CreatePoolForm";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

const Pool = () => {
  const [selectedPool, setSelectedPool] = useState(null);
  const { walletAddress } = useWallet();
  const { toast } = useToast();

  const handlePoolClick = (pool) => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to interact with pools",
        variant: "destructive",
      });
      return;
    }
    setSelectedPool(pool);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Link to="/dex" className="text-white/70 hover:text-primary">
              Swap
            </Link>
            <Link to="/pool" className="text-white hover:text-primary/80">
              Pool
            </Link>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="button-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Pool
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card text-white">
              <DialogHeader>
                <DialogTitle>Create New Liquidity Pool</DialogTitle>
              </DialogHeader>
              <CreatePoolForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {mockPools.map((pool) => (
            <Dialog key={pool.id}>
              <DialogTrigger asChild>
                <Card 
                  className="glass-card p-6 cursor-pointer hover:bg-card/80 transition-colors"
                  onClick={() => handlePoolClick(pool)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {pool.token0.symbol}/{pool.token1.symbol}
                      </h3>
                      <p className="text-sm text-white/70">
                        Fee: {pool.fee * 100}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70">Liquidity</p>
                      <p className="font-medium text-white">
                        {pool.reserve0.toLocaleString()} {pool.token0.symbol}
                      </p>
                      <p className="font-medium text-white">
                        {pool.reserve1.toLocaleString()} {pool.token1.symbol}
                      </p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-card text-white">
                <DialogHeader>
                  <DialogTitle>Manage Liquidity</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <AddLiquidityForm pool={pool} />
                  <WithdrawLiquidityForm pool={pool} />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Pool;