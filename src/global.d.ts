interface Window {
  electronAPI?: {
    notifySessionEnd: (payload: { title: string; body: string }) => void;
  };
}
