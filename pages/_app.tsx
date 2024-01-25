import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import "../public/fonts/style.css";
import useUser from "@libs/client/useUser";
function LoginCheck() {
  useUser();
  return null;
}
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className="">
          <LoginCheck />
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
export default MyApp;
