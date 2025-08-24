import { StatsigProvider as StatsigP, useClientAsyncInit } from "@statsig/react-bindings";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";

interface StatsigProviderProps {
  children: React.ReactNode;
}

export default function StatsigProvider({ children }: StatsigProviderProps) {
  const { client } = useClientAsyncInit(
    import.meta.env.VITE_STATSIG_CLIENT_SDK_KEY,
    { userID: "a-user" },
    {
      plugins: [new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin()],
    }
  );
  return (
    <StatsigP client={client} loadingComponent={<div>Loading...</div>}>
      {children}
    </StatsigP>
  );
}
