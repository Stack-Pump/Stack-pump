import { Layout } from "../components/Layout";
import { ArrowRight, Rocket, Coins, Lock } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center">
        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl px-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-4">
              Launch Your Meme Token on
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Stack Network
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              The premier launchpad for meme tokens with built-in DEX functionality.
              Create, launch, and trade tokens with ease on Stack Network.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <button className="px-8 py-4 bg-primary rounded-lg button-glow text-white font-medium text-lg flex items-center justify-center gap-2 group">
              Launch Token
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white font-medium text-lg transition-colors flex items-center justify-center gap-2">
              Connect Wallet
              <Lock className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-6xl px-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="glass-card p-8 animate-float">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Total Launches</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">152</p>
          </div>
          <div className="glass-card p-8 animate-float" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center mb-4">
              <Coins className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Total Volume</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">$2.5M</p>
          </div>
          <div className="glass-card p-8 animate-float" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Active Users</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">12.5K</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-6xl px-4 mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Stack.pump</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const features = [
  {
    title: "Easy Token Creation",
    description: "Launch your meme token in minutes with our intuitive interface",
    icon: Rocket,
  },
  {
    title: "Built-in DEX",
    description: "Trade tokens instantly with our integrated decentralized exchange",
    icon: Coins,
  },
  {
    title: "Secure Platform",
    description: "Built on Stack Network with industry-standard security measures",
    icon: Lock,
  },
];

export default Index;