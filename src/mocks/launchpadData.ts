export const mockLaunches = [
  {
    id: "1",
    name: "Mock Token 1",
    token_address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    description: "First mock token for testing",
    total_supply: 1000000,
    remaining_tokens: 750000,
    holders: 25,
    transactions: 150,
    progress: 25,
    status: "active",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    image_url: null
  },
  {
    id: "2",
    name: "Mock Token 2",
    token_address: "ST2PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    description: "Second mock token for testing",
    total_supply: 500000,
    remaining_tokens: 200000,
    holders: 45,
    transactions: 280,
    progress: 60,
    status: "active",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    image_url: null
  },
  {
    id: "3",
    name: "Mock Token 3",
    token_address: "ST3PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    description: "Third mock token for testing",
    total_supply: 750000,
    remaining_tokens: 100000,
    holders: 85,
    transactions: 420,
    progress: 87,
    status: "active",
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    image_url: null
  }
];