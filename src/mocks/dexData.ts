export const mockTokens = [
  {
    id: "1",
    symbol: "STX",
    name: "Stacks",
    balance: 1000,
    decimals: 6,
  },
  {
    id: "2",
    symbol: "USDA",
    name: "USDA",
    balance: 5000,
    decimals: 6,
  },
  {
    id: "3",
    symbol: "BTC",
    name: "Bitcoin",
    balance: 0.5,
    decimals: 8,
  }
];

export const mockPools = [
  {
    id: "1",
    token0: mockTokens[0],
    token1: mockTokens[1],
    reserve0: 100000,
    reserve1: 50000,
    fee: 0.003,
  },
  {
    id: "2",
    token0: mockTokens[1],
    token1: mockTokens[2],
    reserve0: 200000,
    reserve1: 10,
    fee: 0.003,
  }
];

export const calculateSwapAmount = (
  amountIn: number,
  reserveIn: number,
  reserveOut: number
): number => {
  const amountInWithFee = amountIn * 0.997; // 0.3% fee
  return (amountInWithFee * reserveOut) / (reserveIn + amountInWithFee);
};