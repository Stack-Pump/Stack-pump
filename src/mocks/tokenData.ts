export const mockToken = {
  id: "1",
  name: "Mock Token",
  description: "A mock token for testing",
  remaining_tokens: 750000000,
  total_supply: 1000000000,
  holders: 150,
  transactions: 300,
  token_address: "SP000000000000000000002Q6VF78",
  current_bonding_price: 0.00001,
  liquidity: 500000,
  volume_24h: 250000,
  total_pairs: 25
};

export const mockTrades = [
  {
    id: 1,
    token_id: "1",
    trade_type: "buy",
    amount: 100,
    price: 0.00001,
    total_cost: 0.001,
    created_at: new Date().toISOString(),
    wallet_address: "SP000000000000000000002Q6VF78"
  }
];