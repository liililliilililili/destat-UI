import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { createModal } from "@rabby-wallet/rabbykit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { hardhat } from "wagmi/chains";
// import Navigation from "./components/ui/navigation";
import "./app.css";

export const config = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http(),
  },
});

export const rabbykit = createModal({
  wagmi: config,
});

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen items-start justify-center px-20 py-20">
      {/* <Navigation /> */}
      <Outlet />
    </div>
  );
}
