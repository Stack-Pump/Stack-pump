import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10 bg-black/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Stack.pump
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/launchpad" className="text-white font-medium hover:text-primary transition-colors">
                Launchpad
              </Link>
              <Link to="/dex" className="text-white font-medium hover:text-primary transition-colors">
                DEX
              </Link>
              <Link to="/create" className="text-white font-medium hover:text-primary transition-colors">
                Create Token
              </Link>
            </div>
            {walletAddress ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/90">
                  {formatAddress(walletAddress)}
                </span>
                <Button
                  variant="outline"
                  onClick={disconnectWallet}
                  className="border-red-500/20 hover:bg-red-500/10 text-white"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg button-glow text-white font-medium"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-20 container mx-auto px-4">{children}</main>
    </div>
  );
}