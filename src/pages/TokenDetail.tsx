import { useParams } from "react-router-dom";
import { TokenStats } from "@/components/TokenStats";
import { TokenPriceChart } from "@/components/TokenPriceChart";
import { TokenChat } from "@/components/TokenChat";
import { mockToken } from "@/mocks/tokenData";

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{mockToken.name}</h1>
        <p className="text-gray-400">{mockToken.description}</p>
      </div>

      <div className="grid gap-8">
        <TokenStats tokenId={id} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TokenPriceChart tokenId={id} />
          <TokenChat tokenId={id} />
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;