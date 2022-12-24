import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: '1a5bc82b-cca0-497e-9481-036d5821e14e',
      }}
    >
      <DynamicWagmiConnector>
        <Component {...pageProps} />
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
}
