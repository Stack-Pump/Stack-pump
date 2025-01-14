import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LaunchCard } from "@/components/launchpad/LaunchCard";
import { LaunchpadHeader } from "@/components/launchpad/LaunchpadHeader";
import { mockLaunches } from "@/mocks/launchpadData";

const Launchpad = () => {
  const navigate = useNavigate();

  const handleTokenClick = (tokenId: string) => {
    navigate(`/token/${tokenId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <LaunchpadHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLaunches.map((launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              onClick={handleTokenClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Launchpad;