import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
export default MyApp;
