import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Dex from "./pages/Dex";
import Pool from "./pages/Pool";
import Launchpad from "./pages/Launchpad";
import CreateToken from "./pages/CreateToken";
import TokenDetail from "./pages/TokenDetail";
import { WalletProvider } from "./contexts/WalletContext";

function App() {
  return (
    <WalletProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dex" element={<Dex />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/create" element={<CreateToken />} />
          <Route path="/token/:id" element={<TokenDetail />} />
        </Routes>
      </Layout>
    </WalletProvider>
  );
}

export default App;