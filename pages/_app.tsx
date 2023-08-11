import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../public/fonts/style.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
export default MyApp;
