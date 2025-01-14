interface StacksProvider {
  request: (params: { method: string }) => Promise<string[]>;
}

interface Window {
  StacksProvider?: StacksProvider;
}